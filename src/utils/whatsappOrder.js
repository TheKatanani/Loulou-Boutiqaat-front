import axios from '../api/axios';
import toast from 'react-hot-toast';

/**
 * Builds the WhatsApp order summary text message
 */
export const generateWhatsAppOrderMessage = ({
  orderCode = '',
  cart = [],
  products = [],
  customerName = '',
  location = '',
  phone = '',
  total = 0,
}) => {
  let message = `🌸 *طلب جديد من متجر لولو بوتيكات* 🌸\n\n`;
  if (orderCode) {
    message += `📦 *رقم الطلب المعتمد:* ${orderCode}\n`;
  }
  if (customerName) message += `👤 *اسم العميل:* ${customerName.trim()}\n`;
  if (phone) message += `📞 *رقم الهاتف:* ${phone.trim()}\n`;
  if (location) message += `📍 *عنوان التوصيل:* ${location.trim()}\n`;

  message += `⏳ *حالة الحجز:* تم حجز الكمية لمدة 60 دقيقة في المخزون\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛍️ *المنتجات المطلوبة:* \n`;

  cart.forEach((item, index) => {
    const pId = item.productId || item.id;
    const prod = products.find((p) => String(p.id) === String(pId));
    const name = prod?.name || item.name || `منتج #${pId}`;
    const price = prod?.price || item.price || 0;
    const qty = item.quantity || 1;
    message += `\n${index + 1}) *${name}*\n`;
    message += `   ▫️ الكمية: ${qty}\n`;
    message += `   ▫️ السعر: ${price} ₪\n`;
    message += `   ▫️ الإجمالي: ${price * qty} ₪\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *المجموع النهائي المطلوب:* *${total} ₪*\n\n`;
  message += `🚚 التوصيل متاح لكافة مناطق قطاع غزة.\n`;
  message += `يرجى تأكيد موعد الاستلام المناسب لكم. شكراً لتسوقكم من لولو بوتيكات! ✨`;

  return message;
};

export const getWhatsAppNumber = (social = []) => {
  const rawWa = Array.isArray(social)
    ? social.find((el) => el?.name?.toLowerCase() === 'whatsapp')?.value
    : '972567124698';
  return (rawWa || '972567124698').replace(/[^0-9]/g, '');
};

/**
 * Computes deterministic signature for cart items, phone, and user
 * Used to detect exact retries vs changed payloads
 */
const computePayloadSignature = (items, phone, userId) => {
  const sortedItems = [...items]
    .sort((a, b) => a.productId - b.productId)
    .map((i) => `${i.productId}:${i.quantity}`)
    .join('|');
  const cleanPhone = (phone || '').toString().replace(/\D/g, '');
  return `${userId || 'guest'}::${cleanPhone}::${sortedItems}`;
};

/**
 * Cancels active reservation and releases reserved stock on server.
 * Only removes local reservation if the server confirms release (or returns 404).
 */
export const cancelActiveReservation = async () => {
  const raw = localStorage.getItem('lb_active_reservation');
  if (!raw) return { success: true };

  let reservation;
  try {
    reservation = JSON.parse(raw);
  } catch (e) {
    localStorage.removeItem('lb_active_reservation');
    return { success: true };
  }

  if (!reservation?.id || !reservation?.secretToken) {
    localStorage.removeItem('lb_active_reservation');
    return { success: true };
  }

  try {
    await axios.delete(`/order/whatsapp-draft/${reservation.id}?token=${reservation.secretToken}`);
    localStorage.removeItem('lb_active_reservation');
    sessionStorage.removeItem('lb_pending_wa_attempt');
    return { success: true };
  } catch (err) {
    if (err.response?.status === 404) {
      localStorage.removeItem('lb_active_reservation');
      sessionStorage.removeItem('lb_pending_wa_attempt');
      return { success: true };
    }
    console.error('Error releasing active reservation on server:', err);
    return {
      success: false,
      error: err.response?.data?.message || 'تعذر إلغاء الحجز على الخادم، يرجى المحاولة مجدداً',
    };
  }
};

/**
 * Fetches real-time draft status from server to sync state
 */
export const fetchServerDraftStatus = async (id, secretToken) => {
  if (!id || !secretToken) return null;
  try {
    const res = await axios.get(`/order/whatsapp-draft/${id}?token=${secretToken}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return { orderStatus: 'expired' };
    }
    return null;
  }
};

/**
 * Single Source of Truth WhatsApp Checkout:
 * 1. Validates inputs
 * 2. Checks active unexpired reservation or reuses idempotencyKey on retries
 * 3. Calls backend POST /order/whatsapp-draft to reserve stock for 60 minutes
 * 4. Saves reservation state locally with signature
 * 5. Opens WhatsApp with the official reserved invoice
 */
export const openWhatsAppOrder = async ({
  cart = [],
  products = [],
  customerName = '',
  location = '',
  phone = '',
  total = 0,
  social = [],
  userId = null,
  authToken = null,
}) => {
  if (!cart || cart.length === 0) {
    toast.error('سلة المشتريات فارغة!');
    return { success: false, reason: 'empty_cart' };
  }

  if (!customerName || customerName.trim().length < 2) {
    toast.error('يرجى كتابة الاسم الكريم (حرفان على الأقل)');
    return { success: false, reason: 'missing_name' };
  }

  const cleanPhone = (phone || '').toString().trim().replace(/[^0-9+]/g, '');
  const digitsOnly = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone || digitsOnly.length < 9 || digitsOnly.length > 15) {
    toast.error('يرجى إدخال رقم هاتف صالح للتواصل والتوصيل (9 أرقام على الأقل)');
    return { success: false, reason: 'missing_phone' };
  }

  if (!location || location.trim().length < 5) {
    toast.error('يرجى كتابة عنوان التوصيل بالتفصيل (5 أحرف على الأقل)');
    return { success: false, reason: 'missing_location' };
  }

  // Clean and group items
  const itemMap = new Map();
  cart.forEach((i) => {
    const pId = Number(i.productId || i.id);
    const qty = Math.max(1, Math.floor(Number(i.quantity) || 1));
    if (pId > 0) {
      itemMap.set(pId, (itemMap.get(pId) || 0) + qty);
    }
  });

  const items = Array.from(itemMap.entries()).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  const signature = computePayloadSignature(items, cleanPhone, userId);

  // Check if an unexpired reservation already exists for this exact payload: resume it!
  const rawActive = localStorage.getItem('lb_active_reservation');
  if (rawActive) {
    try {
      const active = JSON.parse(rawActive);
      const isNotExpired = active.expiresAt && new Date(active.expiresAt) > new Date();
      if (isNotExpired && active.signature === signature && active.orderCode) {
        if (active.waUrl) {
          window.open(active.waUrl, '_blank', 'noopener,noreferrer');
        }
        return {
          success: true,
          resumed: true,
          orderCode: active.orderCode,
          expiresAt: active.expiresAt,
          secretToken: active.secretToken,
          waUrl: active.waUrl,
        };
      }
    } catch (e) {}
  }

  // Reuse idempotency key on network retries for the same payload signature
  let idempotencyKey;
  try {
    const rawPending = sessionStorage.getItem('lb_pending_wa_attempt');
    if (rawPending) {
      const pending = JSON.parse(rawPending);
      if (pending.signature === signature && Date.now() - pending.timestamp < 15 * 60 * 1000) {
        idempotencyKey = pending.key;
      }
    }
  } catch (e) {}

  if (!idempotencyKey) {
    idempotencyKey = `wa-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(
      'lb_pending_wa_attempt',
      JSON.stringify({
        key: idempotencyKey,
        signature,
        timestamp: Date.now(),
      })
    );
  }

  try {
    const headers = { 'x-idempotency-key': idempotencyKey };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await axios.post(
      '/order/whatsapp-draft',
      {
        items,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        location: location.trim(),
        userId,
        idempotencyKey,
      },
      { headers }
    );

    const data = response.data;
    if (data && data.orderCode) {
      sessionStorage.removeItem('lb_pending_wa_attempt');

      const waUrl =
        data.waUrl ||
        `https://wa.me/${getWhatsAppNumber(social)}?text=${encodeURIComponent(
          generateWhatsAppOrderMessage({
            orderCode: data.orderCode,
            cart,
            products,
            customerName: customerName.trim(),
            location: location.trim(),
            phone: cleanPhone,
            total: data.totalCost || total,
          })
        )}`;

      localStorage.setItem(
        'lb_active_reservation',
        JSON.stringify({
          id: data.id,
          orderCode: data.orderCode,
          expiresAt: data.expiresAt,
          secretToken: data.secretToken,
          totalCost: data.totalCost,
          waUrl,
          customerName: customerName.trim(),
          customerPhone: cleanPhone,
          location: location.trim(),
          signature,
          createdAt: new Date().toISOString(),
        })
      );

      const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
      const popupBlocked = !win || win.closed || typeof win.closed === 'undefined';

      return {
        success: true,
        orderCode: data.orderCode,
        expiresAt: data.expiresAt,
        secretToken: data.secretToken,
        waUrl,
        popupBlocked,
      };
    }

    throw new Error('لم يتم استلام رقم الطلب من الخادم');
  } catch (err) {
    console.error('Backend stock reservation error:', err);

    if (err.response?.status === 409) {
      const msg = err.response.data?.message || 'عذراً، بعض المنتجات المطلوبة نفدت من المخزون أو الكمية غير كافية!';
      toast.error(msg, { duration: 6000 });
      return {
        success: false,
        reason: 'out_of_stock',
        message: msg,
        details: err.response.data?.details || [],
      };
    }

    if (err.response?.status === 429) {
      const msg = err.response.data?.message || 'تم تجاوز الحد الأقصى لمحاولات الحجز، يرجى المحاولة بعد قليل';
      toast.error(msg, { duration: 6000 });
      return { success: false, reason: 'rate_limited', message: msg };
    }

    const errorMsg =
      err.response?.data?.message ||
      'تعذر حجز المخزون وتأكيد الطلب على الخادم حالياً. يرجى التحقق من اتصالك وإعادة المحاولة.';
    toast.error(errorMsg, { duration: 6000 });

    return {
      success: false,
      reason: 'server_error',
      message: errorMsg,
    };
  }
};
