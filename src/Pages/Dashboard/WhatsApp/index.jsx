import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../../../Hook/useAxiosPrivet';

const statusLabels = { sending: 'جارٍ الإرسال', sent: 'أُرسلت ✓', delivered: 'وصلت ✓✓', read: 'قُرئت ✓✓',
  failed: 'تعذر الإرسال', unknown: 'الإرسال غير مؤكد — راجع المحادثة قبل التكرار' };
const errorText = error => error?.response?.data?.message || 'تعذر الاتصال. يرجى إعادة المحاولة.';
const date = value => value ? new Date(value).toLocaleString('ar-PS', { dateStyle: 'short', timeStyle: 'short' }) : '';
const requestKey = () => `manual-${Date.now()}-${window.crypto.randomUUID()}`;

export default function WhatsAppInbox() {
  const api = useAxiosPrivate();
  const [config, setConfig] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [hasOlder, setHasOlder] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [media, setMedia] = useState({});
  const attempts = useRef({});
  const messagesRef = useRef([]);
  const urls = useRef([]);
  const activeRef = useRef(activeId);
  activeRef.current = activeId;
  const fileInput = useRef(null);
  const scrollArea = useRef(null);
  const lastVisibleId = useRef(0);
  const draft = drafts[activeId] || '';

  const loadConfig = useCallback(async () => {
    setLoading(true); setError('');
    try { setConfig((await api.get('/whatsapp/config')).data); }
    catch (err) { setError(errorText(err)); }
    finally { setLoading(false); }
  }, [api]);
  useEffect(() => { loadConfig(); }, [loadConfig]);
  useEffect(() => () => urls.current.forEach(url => URL.revokeObjectURL(url)), []);

  useEffect(() => {
    if (!config?.ready) return;
    let stopped = false;
    const controller = new AbortController();
    const load = async () => {
      try {
        const result = await api.get('/whatsapp/conversations', { params: { search }, signal: controller.signal });
        if (!stopped) setConversations(result.data);
      } catch (err) { if (!stopped) setError(errorText(err)); }
    };
    const timer = setTimeout(load, 250);
    const poll = setInterval(load, 8000);
    return () => { stopped = true; controller.abort(); clearTimeout(timer); clearInterval(poll); };
  }, [api, config, search]);

  const merge = useCallback((rows, updates = []) => {
    setMessages(previous => {
      const items = new Map(previous.map(item => [item.id, item]));
      rows.forEach(item => items.set(item.id, item));
      updates.forEach(item => { if (items.has(item.id)) items.set(item.id, { ...items.get(item.id), ...item }); });
      const next = [...items.values()].sort((a, b) => a.id - b.id);
      messagesRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!activeId || !config?.ready) return;
    let stopped = false, busy = false, highest = 0, first = true;
    const controller = new AbortController();
    setMessages([]); messagesRef.current = []; setConversation(null); setError(''); setHistoryLoading(true);
    lastVisibleId.current = 0;
    const load = async () => {
      if (busy) return;
      busy = true;
      try {
        let more = false, pages = 0;
        do {
          const initial = first;
          const result = await api.get(`/whatsapp/conversations/${activeId}/messages`, {
            params: highest ? { after: highest } : {}, signal: controller.signal,
          });
          if (stopped) return;
          const data = result.data;
          setConversation(data.conversation);
          merge(data.messages, data.updates);
          if (first) { setHasOlder(data.hasMore); first = false; }
          highest = Math.max(highest, ...data.messages.map(item => item.id), 0);
          more = !initial && data.hasMore && data.messages.length > 0;
          // First response is the latest page; subsequent responses page forward from the last seen ID.
          pages++;
        } while (more && pages < 10);
      } catch (err) { if (!stopped) setError(errorText(err)); }
      finally { if (!stopped) setHistoryLoading(false); busy = false; }
    };
    load(); const poll = setInterval(load, 6000);
    return () => { stopped = true; controller.abort(); clearInterval(poll); };
  }, [activeId, api, config, merge]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || !activeId || !document.hasFocus()) return;
    if (last.id !== lastVisibleId.current) {
      lastVisibleId.current = last.id;
      if (scrollArea.current) scrollArea.current.scrollTop = scrollArea.current.scrollHeight;
      api.post(`/whatsapp/conversations/${activeId}/read`, { throughId: last.id }).then(() => {
        setConversations(rows => rows.map(item => item.id === activeId ? { ...item, unreadCount: 0 } : item));
      }).catch(() => {});
    }
  }, [messages, activeId, api]);

  const older = async () => {
    if (!messages.length) return;
    const id = activeId;
    try {
      const { data } = await api.get(`/whatsapp/conversations/${id}/messages`, { params: { before: messages[0].id } });
      if (activeRef.current !== id) return;
      merge(data.messages, data.updates); setHasOlder(data.hasMore);
    } catch (err) { setError(errorText(err)); }
  };
  const pause = async () => {
    try {
      const { data } = await api.patch(`/whatsapp/conversations/${activeId}`, { automationPaused: !conversation.automationPaused });
      setConversation(data);
    } catch (err) { setError(errorText(err)); }
  };
  const send = async event => {
    event.preventDefault();
    if (!draft.trim() || sending || !conversation?.canReply) return;
    const id = activeId, text = draft.trim();
    const attempt = attempts.current[id];
    const key = attempt?.text === text ? attempt.key : requestKey();
    attempts.current[id] = { text, key };
    setSending(true); setError('');
    try {
      const { data } = await api.post(`/whatsapp/conversations/${id}/messages`, { text, clientRequestId: key });
      if (activeRef.current === id) { merge([data]); setConversation(item => ({ ...item, automationPaused: true })); }
      if (data.status === 'failed') { delete attempts.current[id]; setError(data.error || 'رفض واتساب إرسال الرسالة'); }
      else if (data.status === 'unknown' || data.status === 'sending') setError(statusLabels.unknown);
      else { setDrafts(items => ({ ...items, [id]: '' })); delete attempts.current[id]; }
    } catch (err) { setError(errorText(err)); }
    finally { setSending(false); }
  };
  const upload = async event => {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('الحد الأقصى للملف 5 ميغابايت'); return; }
    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) { setError('اختر صورة PNG أو JPEG أو ملف PDF'); return; }
    const id = activeId, signature = `${file.name}:${file.size}:${file.lastModified}`;
    const attempt = attempts.current[`file:${id}`];
    const key = attempt?.signature === signature ? attempt.key : requestKey();
    attempts.current[`file:${id}`] = { signature, key };
    setSending(true); setError('');
    try {
      const { data } = await api.post(`/whatsapp/conversations/${id}/attachments`, file, { headers: {
        'Content-Type': file.type, 'X-Filename': encodeURIComponent(file.name), 'X-Client-Request-Id': key,
      } });
      if (activeRef.current === id) { merge([data]); setConversation(item => ({ ...item, automationPaused: true })); }
      if (data.status === 'failed') { delete attempts.current[`file:${id}`]; setError(data.error); }
      else if (data.status === 'unknown' || data.status === 'sending') setError(statusLabels.unknown);
      else delete attempts.current[`file:${id}`];
    } catch (err) { setError(errorText(err)); }
    finally { setSending(false); }
  };
  const openMedia = async message => {
    try {
      const response = await api.get(`/whatsapp/messages/${message.id}/media`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data); urls.current.push(url);
      const type = response.data.type;
      if (/^(image\/(png|jpeg|webp)|audio\/(ogg|mpeg|mp4|aac)|video\/mp4)$/.test(type)) {
        setMedia(previous => ({ ...previous, [message.id]: { url, type } }));
      } else {
        const a = document.createElement('a'); a.href = url; a.download = message.filename || `whatsapp-${message.id}`;
        a.click();
      }
    } catch (err) { setError(errorText(err)); }
  };

  if (loading) return <p role="status">جارٍ تحميل المحادثات…</p>;
  if (!config?.ready) return <Box><h2>تجهيز محادثات واتساب</h2>
    <p>يجب إكمال إعداد الرقم على الخادم لبدء استقبال الرسائل والرد عليها.</p>
    {config?.missing?.length > 0 && <p dir="ltr">{config.missing.join(', ')}</p>}
    {error && <p role="alert">{error}</p>}<button onClick={loadConfig}>إعادة التحقق</button></Box>;

  return <Box>
    {error && <p role="alert" className="error">{error}</p>}
    <div className={`inbox ${activeId ? 'selected' : ''}`}>
      <div className="conversationList">
        <label htmlFor="wa-search">بحث في المحادثات</label>
        <input id="wa-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="اسم العميل أو رقم الهاتف" />
        <div className="list">
          {!conversations.length && <p className="empty">لا توجد محادثات بعد. تظهر هنا رسائل العملاء الجديدة على الرقم المتصل.</p>}
          {conversations.map(item => <button className={`customer ${activeId === item.id ? 'active' : ''}`} key={item.id} onClick={() => setActiveId(item.id)}>
            <strong>{item.customerName || item.customerPhone}</strong>
            <span dir="ltr">+{item.customerPhone}</span>
            <span className="snippet">{item.lastMessagePreview}</span>
            <small>{date(item.lastMessageAt)} {item.unreadCount > 0 && <b className="unread">{item.unreadCount}</b>}</small>
          </button>)}
        </div>
      </div>
      <section className="thread" aria-label="المحادثة الحالية">
        {!activeId ? <p className="empty">اختر محادثة لقراءة الرسائل والرد على العميل.</p> : <>
          <header className="threadHeader">
            <button className="back" onClick={() => setActiveId(null)}>المحادثات ←</button>
            <div><strong>{conversation?.customerName || 'جارٍ التحميل…'}</strong><span dir="ltr">{conversation?.customerPhone && `+${conversation.customerPhone}`}</span></div>
            {conversation && <button onClick={pause}>{conversation.automationPaused ? 'تفعيل الردود الآلية' : 'إيقاف الردود الآلية'}</button>}
          </header>
          <div className="messages" ref={scrollArea} aria-live="polite" aria-relevant="additions text">
            {historyLoading && <p role="status">جارٍ تحميل الرسائل…</p>}
            {hasOlder && <button className="older" onClick={older}>تحميل رسائل أقدم</button>}
            {messages.map(message => <article className={`bubble ${message.direction}`} key={message.id}>
              <div className="messageText">{message.text}</div>
              {message.mediaId && !media[message.id] && <button onClick={() => openMedia(message)}>{message.filename || 'عرض الملف أو تنزيله'}</button>}
              {media[message.id]?.type.startsWith('image/') && <img src={media[message.id].url} alt={message.filename || 'صورة من المحادثة'} />}
              {media[message.id]?.type.startsWith('audio/') && <audio src={media[message.id].url} controls />}
              {media[message.id]?.type.startsWith('video/') && <video src={media[message.id].url} controls />}
              <small>{date(message.occurredAt)} {message.direction === 'outbound' && <span className={message.status}>{statusLabels[message.status] || message.status}</span>}</small>
              {message.direction === 'outbound' && message.error && <small className="error">{message.error}</small>}
            </article>)}
          </div>
          {conversation && !conversation.canReply && <p className="notice">انتهت نافذة الرد العادي. يلزم أن يراسلك العميل مجدداً أو إرسال قالب معتمد من نظام القوالب.</p>}
          {conversation?.automationPaused && <p className="notice">المتابعة اليدوية مفعّلة؛ الردود الآلية متوقفة لهذه المحادثة.</p>}
          <form onSubmit={send} className="composer">
            <label className="sr-only" htmlFor="wa-reply">رسالتك للعميل</label>
            <textarea id="wa-reply" value={draft} maxLength={4096} rows={3} placeholder="اكتب رسالتك للعميل…"
              disabled={sending || !conversation?.canReply} onChange={event => setDrafts(items => ({ ...items, [activeId]: event.target.value }))} />
            <div><button type="submit" disabled={sending || !draft.trim() || !conversation?.canReply}>{sending ? 'جارٍ الإرسال…' : 'إرسال الرسالة'}</button>
              <button type="button" disabled={sending || !conversation?.canReply} onClick={() => fileInput.current.click()}>إرفاق صورة أو PDF</button>
              <input ref={fileInput} className="sr-only" type="file" accept="image/png,image/jpeg,application/pdf" onChange={upload} aria-label="إرفاق ملف" />
            </div>
          </form>
        </>}
      </section>
    </div>
  </Box>;
}

const Box = styled.div`
  direction: rtl;
  color: ${({ theme }) => theme.palette.font};
  button, input, textarea { font: inherit; }
  button { cursor: pointer; border: 1px solid #d1d5db; border-radius: 8px; padding: 8px 12px; background: ${({ theme }) => theme.palette.card}; color: inherit; }
  button:disabled { opacity: .5; cursor: default; }
  input, textarea { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; background: ${({ theme }) => theme.palette.card}; color: inherit; }
  .inbox { display: grid; grid-template-columns: 280px minmax(0,1fr); height: 73vh; min-height: 510px; border: 1px solid #cbd5e1; border-radius: 14px; overflow: hidden; background: ${({ theme }) => theme.palette.card}; }
  .conversationList { padding: 12px; border-left: 1px solid #cbd5e1; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
  .list { overflow-y: auto; }
  .customer { display: flex; flex-direction: column; gap: 4px; width: 100%; text-align: right; margin-bottom: 8px; }
  .customer span[dir=ltr] { align-self: flex-start; }
  .customer.active { border-color: #16a34a; box-shadow: inset -4px 0 #16a34a; }
  .snippet { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; opacity: .75; }
  .unread { background: #16a34a; color: white; border-radius: 20px; padding: 1px 7px; margin-right: 5px; }
  .thread { min-height: 0; min-width: 0; display: flex; flex-direction: column; }
  .threadHeader { display: flex; gap: 10px; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #cbd5e1; }
  .threadHeader div { display: flex; flex-direction: column; gap: 4px; }
  .messages { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding: 18px; background: rgba(148,163,184,.08); }
  .bubble { border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px 12px; max-width: 85%; overflow-wrap: anywhere; }
  .inbound { align-self: flex-start; }
  .outbound { align-self: flex-end; background: rgba(34,197,94,.12); border-color: #86b993; }
  .messageText { white-space: pre-wrap; line-height: 1.8; }
  .bubble small { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; font-size: .72rem; opacity: .8; }
  .bubble img, .bubble video { max-width: 100%; max-height: 280px; display: block; border-radius: 8px; }
  .bubble audio { max-width: 100%; }
  .read { color: #0284c7; } .failed, .unknown, .error { color: #b91c1c; }
  .error, .notice { padding: 9px 12px; font-size: .85rem; }
  .notice { background: rgba(234,179,8,.12); margin: 0; }
  .composer { padding: 12px; border-top: 1px solid #cbd5e1; }
  .composer div { display: flex; gap: 8px; margin-top: 8px; }
  .composer button[type=submit] { background: #15803d; color: white; border-color: #15803d; }
  .empty { margin: auto; padding: 24px; text-align: center; line-height: 1.9; opacity: .75; }
  .back { display: none; }
  .older { align-self: center; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
  @media(max-width: 1050px) { .inbox { grid-template-columns: 220px minmax(0,1fr); } }
  @media(max-width: 760px) {
    .inbox { display: block; height: 75vh; }
    .conversationList, .thread { height: 100%; }
    .thread { display: none; }
    .selected .conversationList { display: none; }
    .selected .thread { display: flex; }
    .back { display: block; }
    .threadHeader { flex-wrap: wrap; }
    .bubble { max-width: 93%; }
  }
`;
