export const generateWhatsAppOrderMessage = ({
  cart = [],
  products = [],
  customerName = '',
  location = '',
  phone = '',
  total = 0
}) => {
  let message = `🌸 *طلب جديد من متجر لولو بوتيكات* 🌸\n\n`;

  if (customerName && customerName.trim()) {
    message += `👤 *اسم العميل:* ${customerName.trim()}\n`;
  }
  if (phone && phone.trim()) {
    message += `📞 *رقم الهاتف:* ${phone.trim()}\n`;
  }
  if (location && location.trim()) {
    message += `📍 *عنوان التوصيل:* ${location.trim()}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛍️ *تفاصيل المنتجات المطلوبة:* \n`;

  cart.forEach((item, index) => {
    const prod = products.find(p => String(p.id) === String(item.productId));
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
    ? social.find(el => el?.name?.toLowerCase() === 'whatsapp')?.value
    : '972597229340';
  return (rawWa || '972597229340').replace(/[^0-9]/g, '');
};

export const openWhatsAppOrder = ({
  cart,
  products,
  customerName,
  location,
  phone,
  total,
  social
}) => {
  const message = generateWhatsAppOrderMessage({
    cart,
    products,
    customerName,
    location,
    phone,
    total
  });

  const waNumber = getWhatsAppNumber(social);
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  window.open(waUrl, '_blank', 'noopener,noreferrer');
};
