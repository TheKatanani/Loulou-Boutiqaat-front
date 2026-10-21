import axios from '../api/axios';
import toast from 'react-hot-toast';

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
    message += `📦 *رقم الطلب:* ${orderCode}\n`;
  }
  if (customerName && customerName.trim()) {
    message += `👤 *اسم العميل:* ${customerName.trim()}\n`;
  }
  if (phone && phone.trim()) {
    message += `📞 *رقم الهاتف:* ${phone.trim()}\n`;
  }
  if (location && location.trim()) {
    message += `📍 *عنوان التوصيل:* ${location.trim()}\n`;
  }

  if (orderCode) {
    message += `⏳ *حالة الحجز:* تم حجز الكمية لمدة 60 دقيقة في المخزون\n`;
  } else {
    message += `💬 *نوع الطلب:* استفسار وطلب يدوي مباشر\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛍️ *تفاصيل الفاتورة:* \n`;

  cart.forEach((item, index) => {
    const prod = products.find((p) => String(p.id) === String(item.productId));
    const title = prod?.name || `منتج رقم #${item.productId}`;
    const price = prod?.price || 0;
    const subtotal = price * (item.quantity || 1);

    message += `\n${index + 1}) *${title}*\n`;
    message += `   ▫️ الكمية: ${item.quantity || 1}\n`;
    message += `   ▫️ السعر: ${subtotal} ₪\n`;
    if (prod?.id) {
      message += `   🔗 https://loulou-boutiqaat.vercel.app/home/products/${prod.id}\n`;
    }
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *المجموع النهائي:* ${total} ₪\n`;
  message += `🚚 *طريقة الدفع:* الدفع عند الاستلام\n\n`;
  message += `يرجى تأكيد استلام الطلب وتحديد موعد التوصيل، شكراً لكم! ✨`;

  return message;
};

export const getWhatsAppNumber = (social) => {
  const rawWa = Array.isArray(social)
    ? social.find((el) => el?.name?.toLowerCase() === 'whatsapp')?.value
    : '972597229340';
  return (rawWa || '972597229340').replace(/[^0-9]/g, '');
};

/**
 * Cancels active reservation and releases reserved stock on server
 */
export const cancelActiveReservation = async () => {
  try {
    const raw = localStorage.getItem('lb_active_reservation');
    if (!raw) return null;
    const reservation = JSON.parse(raw);
    if (reservation?.id && reservation?.secretToken) {
      await axios.delete(`/order/whatsapp-draft/${reservation.id}?token=${reservation.secretToken}`);
    }
  } catch (err) {
    console.warn('Error releasing active reservation:', err.message);
  } finally {
    localStorage.removeItem('lb_active_reservation');
  }
};

/**
 * Single Source of Truth WhatsApp Checkout:
 * 1. Calls backend POST /order/whatsapp-draft to reserve stock for 60 minutes
 * 2. Receives unique #LB-<id>, waUrl, expiresAt, secretToken
 * 3. Saves reservation state locally
 * 4. Opens WhatsApp with the official reserved invoice
 * 5. Strictly fails if server encounters error (NEVER fakes reservation on failure)
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
}) => {
  if (!cart || cart.length === 0) {
    toast.error('سلة المشتريات فارغة!');
    return { success: false, reason: 'empty_cart' };
  }

  // Enforce customer info requirements
  if (!customerName || customerName.trim().length < 2) {
    toast.error('يرجى كتابة الاسم الكريم (حرفان على الأقل)');
    return { success: false, reason: 'missing_name' };
  }

  if (!phone || phone.trim().length < 9) {
    toast.error('يرجى إدخال رقم هاتف صالح للتواصل (9 أرقام على الأقل)');
    return { success: false, reason: 'missing_phone' };
  }

  if (!location || location.trim().length < 5) {
    toast.error('يرجى كتابة عنوان التوصيل بالتفصيل (5 أحرف على الأقل)');
    return { success: false, reason: 'missing_location' };
  }

  // Clean items array
  const items = cart.map((i) => ({
    productId: Number(i.productId || i.id),
    quantity: Math.max(1, Number(i.quantity) || 1),
  }));

  // Unique idempotency key per checkout attempt
  const idempotencyKey = `wa-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  try {
    // 1. Reserve stock with backend
    const response = await axios.post('/order/whatsapp-draft', {
      items,
      customerName: customerName.trim(),
      customerPhone: phone.trim(),
      location: location.trim(),
      userId,
      idempotencyKey,
    });

    const data = response.data;
    if (data && data.orderCode) {
      // Store draft reservation info locally with waUrl so user can resume anytime
      const waUrl = data.waUrl || `https://wa.me/${getWhatsAppNumber(social)}?text=${encodeURIComponent(
        generateWhatsAppOrderMessage({
          orderCode: data.orderCode,
          cart,
          products,
          customerName: customerName.trim(),
          location: location.trim(),
          phone: phone.trim(),
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
          customerPhone: phone.trim(),
          location: location.trim(),
          createdAt: new Date().toISOString(),
        })
      );

      // Attempt to open WhatsApp in new tab
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

    // If 409 Insufficient Stock: inform user clearly
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

    // Server or network error: DO NOT fake success. Keep cart intact and inform user.
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
