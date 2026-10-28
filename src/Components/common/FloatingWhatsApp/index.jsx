import React from 'react'
import { useSelector } from 'react-redux'
import { selectSocial } from '../../../redux/reducers/social'
import { StyledFloatingWhatsApp } from './styled'

const WhatsAppIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M20.5 3.5C18.2 1.2 15.2 0 12 0C5.4 0 0 5.4 0 12C0 14.1 0.6 16.2 1.6 18L0.5 24L6.7 22.4C8.4 23.3 10.2 23.8 12 23.8C18.6 23.8 24 18.4 24 12C24 8.8 22.8 5.8 20.5 3.5ZM12 21.8C10.4 21.8 8.8 21.4 7.4 20.5L7.1 20.3L3.4 21.3L4.4 17.7L4.1 17.3C3.2 15.8 2.6 13.9 2.6 12C2.6 6.8 6.8 2.6 12 2.6C14.5 2.6 16.9 3.6 18.6 5.4C20.4 7.1 21.4 9.5 21.4 12C21.4 17.2 17.2 21.8 12 21.8ZM17.1 14.5C16.8 14.4 15.3 13.6 15 13.5C14.7 13.4 14.5 13.3 14.3 13.7C14.1 14 13.5 14.7 13.3 14.9C13.1 15.1 12.9 15.1 12.6 15C12.3 14.8 11.3 14.5 10.1 13.5C9.2 12.7 8.6 11.7 8.4 11.4C8.2 11.1 8.4 10.9 8.6 10.8C8.7 10.6 8.9 10.4 9.1 10.2C9.3 10 9.4 9.8 9.5 9.6C9.6 9.4 9.5 9.2 9.5 9.1C9.4 9 8.7 7.5 8.5 6.9C8.2 6.3 8 6.3 7.8 6.3C7.6 6.3 7.4 6.3 7.2 6.3C7 6.3 6.6 6.4 6.3 6.7C6 7 5.2 7.7 5.2 9.2C5.2 10.7 6.3 12.1 6.5 12.3C6.7 12.5 8.7 15.5 11.6 16.8C12.3 17.1 12.9 17.3 13.3 17.4C14 17.6 14.7 17.6 15.2 17.5C15.8 17.4 17 16.8 17.3 16.1C17.5 15.4 17.5 14.8 17.4 14.7C17.3 14.6 17.3 14.6 17.1 14.5Z" fill="#ffffff"/>
  </svg>
);

const FloatingWhatsApp = () => {
  const social = useSelector(selectSocial);

  const rawPhone = Array.isArray(social) 
    ? social.find(el => el?.name?.toLowerCase() === 'whatsapp')?.value || '972592263808'
    : '972592263808';

  const cleanPhone = rawPhone.replace(/[^0-9]/g, '') || '972592263808';
  const defaultMessage = encodeURIComponent("مرحباً لولو بوتيكات 🌸، أود الاستفسار عن المنتجات وتوفر التوصيل...");
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <StyledFloatingWhatsApp>
      <a 
        href={waUrl}
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsAppBtn"
        title="تحدثي معنا مباشرة عبر واتساب"
      >
        <WhatsAppIcon />
      </a>

      <div className="whatsAppTooltip">
        <span className="onlineDot" />
        <span>تحدثي معنا واتساب (0597229340)</span>
      </div>
    </StyledFloatingWhatsApp>
  );
};

export default FloatingWhatsApp;
