import styled from "styled-components";

export const StyledCheckOut = styled.div`
  margin: 0;
  direction: rtl;
  padding: 26px 22px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.main};
  border: 1px solid ${({ theme }) => theme.palette.border};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: min(94vw, 500px);
  max-height: 88vh;
  overflow-y: auto;
  box-sizing: border-box;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.ColorApp.gray_300};
    border-radius: 4px;
  }

  .modalHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.border};

    .titleBox {
      h3 {
        font-size: 1.25rem;
        font-weight: 800;
        color: ${({ theme }) => theme.palette.font};
        margin: 0;
      }
      p {
        font-size: 0.82rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_500};
        margin-top: 3px;
      }
    }

    .closeBtn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.palette.border};
      background: ${({ theme }) => theme.palette.page};
      color: ${({ theme }) => theme.palette.font};
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;

      &:hover {
        background: #ef4444;
        color: #ffffff;
        border-color: #ef4444;
        transform: rotate(90deg);
      }
    }
  }

  .orderSummaryPill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.primary_light}40;
    border-radius: 12px;
    margin-bottom: 18px;

    .summaryCount {
      font-size: 0.84rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.ColorApp.primary};
    }

    .summaryTotal {
      font-size: 1.05rem;
      font-weight: 800;
      color: ${({ theme }) => theme.palette.ColorApp.primary};
    }
  }

  .checkoutOptionCard {
    background: ${({ theme }) => theme.palette.page};
    border: 1px solid ${({ theme }) => theme.palette.border};
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 14px;
    transition: all 0.2s ease;

    &.featured {
      border-color: #10b98188;
      background: ${({ theme }) =>
        theme.theme === 'dark' ? 'rgba(6, 78, 59, 0.2)' : '#f0fdf4'};
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.08);
    }

    .cardHeader {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;

      .badgeIcon {
        font-size: 1.3rem;
      }

      .cardTitle {
        font-size: 0.98rem;
        font-weight: 800;
        color: ${({ theme }) => theme.palette.font};
      }

      .recommendTag {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 2px 8px;
        background: #10b981;
        color: #ffffff;
        border-radius: 10px;
        margin-right: auto;
      }
    }

    .cardDesc {
      font-size: 0.82rem;
      color: ${({ theme }) => theme.palette.ColorApp.gray_500};
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .inputsGroup {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 14px;

      input {
        width: 100%;
        height: 42px;
        border-radius: 10px;
        padding: 0 14px;
        font-size: 0.88rem;
        border: 1.5px solid ${({ theme }) => theme.palette.border};
        background: ${({ theme }) => theme.palette.main};
        color: ${({ theme }) => theme.palette.font};
        transition: border-color 0.2s ease;
        outline: none;

        &:focus {
          border-color: #10b981;
        }

        &::placeholder {
          color: ${({ theme }) => theme.palette.ColorApp.gray_400};
        }
      }
    }
  }

  .whatsappSubmitBtn {
    width: 100%;
    height: 46px;
    border-radius: 12px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 800;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .orDivider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 14px 0;
    position: relative;
    text-align: center;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 1px;
      background: ${({ theme }) => theme.palette.border};
      z-index: 1;
    }

    span {
      position: relative;
      z-index: 2;
      background: ${({ theme }) => theme.palette.main};
      padding: 0 12px;
      font-size: 0.78rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.ColorApp.gray_400};
    }
  }

  .loginRedirectBtn {
    width: 100%;
    height: 42px;
    border-radius: 12px;
    background: transparent;
    border: 1.5px solid ${({ theme }) => theme.palette.ColorApp.primary};
    color: ${({ theme }) => theme.palette.ColorApp.primary};
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s ease;

    &:hover {
      background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
      transform: translateY(-1px);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .userBadge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.ColorApp.primary};
    margin-bottom: 14px;
  }
`;