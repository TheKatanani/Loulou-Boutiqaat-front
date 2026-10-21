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

  message += `⏳ *حالة الحجز:* تم حجز الكمية لمدة 60 دقيقة في المخزون\n`;
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
 * Single Source of Truth WhatsApp Checkout:
 * 1. Calls backend POST /order/whatsapp-draft to reserve stock for 60 minutes
 * 2. Receives unique #LB-<id>, waUrl, expiresAt, secretToken
 * 3. Saves reservation state locally
 * 4. Opens WhatsApp with the official reserved invoice
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

  const items = cart.map((i) => ({
    productId: i.productId,
    quantity: i.quantity || 1,
  }));

  try {
    // 1. Reserve stock with backend
    const response = await axios.post('/order/whatsapp-draft', {
      items,
      customerName,
      customerPhone: phone,
      location,
      userId,
    });

    const data = response.data;
    if (data && data.orderCode) {
      // Store draft reservation info locally
      localStorage.setItem(
        'lb_active_reservation',
        JSON.stringify({
          id: data.id,
          orderCode: data.orderCode,
          expiresAt: data.expiresAt,
          secretToken: data.secretToken,
          totalCost: data.totalCost,
          createdAt: new Date().toISOString(),
        })
      );

      // Open server-generated invoice URL or build with confirmed order code
      const waUrl = data.waUrl || `https://wa.me/${getWhatsAppNumber(social)}?text=${encodeURIComponent(
        generateWhatsAppOrderMessage({
          orderCode: data.orderCode,
          cart,
          products,
          customerName,
          location,
          phone,
          total: data.totalCost || total,
        })
      )}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');
      return {
        success: true,
        orderCode: data.orderCode,
        expiresAt: data.expiresAt,
        secretToken: data.secretToken,
      };
    }
  } catch (err) {
    console.warn('Backend stock reservation notice:', err);

    // If 409 Insufficient Stock: halt and inform user
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

    // Graceful Fallback if server is asleep / network error:
    // Open client WhatsApp anyway so user order is never dropped
    const fallbackMessage = generateWhatsAppOrderMessage({
      cart,
      products,
      customerName,
      location,
      phone,
      total,
    });
    const waNumber = getWhatsAppNumber(social);
    const fallbackUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(fallbackMessage)}`;
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');

    return {
      success: true,
      fallback: true,
    };
  }
};
