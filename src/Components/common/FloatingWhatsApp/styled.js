import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
  }
  70% {
    box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

export const StyledFloatingWhatsApp = styled.div`
  position: fixed;
  bottom: 28px;
  left: 28px;
  z-index: 9999;
  display: flex;
  align-items: center;
  direction: ltr;

  .whatsAppBtn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #25D366;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: ${pulseAnimation} 2.5s infinite;

    &:hover {
      transform: scale(1.12);
      box-shadow: 0 12px 32px rgba(37, 211, 102, 0.6);
      background: #20ba5a;
    }
  }

  .whatsAppTooltip {
    direction: rtl;
    background: ${({theme}) => theme.palette.card};
    color: ${({theme}) => theme.palette.font};
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.86rem;
    font-weight: 700;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    border: 1px solid ${({theme}) => theme.palette.border};
    margin-left: 12px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    opacity: 0.95;

    .onlineDot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #25D366;
      box-shadow: 0 0 6px #25D366;
      animation: ${keyframes`
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      `} 1.8s infinite;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 576px) {
    bottom: 20px;
    left: 20px;
    .whatsAppBtn {
      width: 52px;
      height: 52px;
      svg {
        width: 28px;
        height: 28px;
      }
    }
  }
`;
