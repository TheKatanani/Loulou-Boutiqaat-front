import styled from "styled-components";

export const SummaryStyled = styled.div`
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.main};
  border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);
  color: ${({ theme }) => theme.palette.font};
  direction: rtl;

  .summaryTitle {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0 0 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    color: ${({ theme }) => theme.palette.font};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .info {
    list-style: none;
    padding: 0;
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.95rem;

      p:first-child {
        color: ${({ theme }) => theme.palette.ColorApp.gray_600};
        margin: 0;
      }

      p:last-child {
        font-weight: 700;
        margin: 0;
        color: ${({ theme }) => theme.palette.font};
      }

      .freeDelivery {
        color: ${({ theme }) => theme.palette.ColorApp.green || '#10b981'};
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
    }
  }

  .totalRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-top: 2px dashed ${({ theme }) => theme.palette.ColorApp.gray_200};
    border-bottom: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    margin-bottom: 20px;

    .totalLabel {
      font-size: 1.1rem;
      font-weight: 800;
      color: ${({ theme }) => theme.palette.font};
      margin: 0;
    }

    .totalAmount {
      font-size: 1.6rem;
      font-weight: 900;
      color: ${({ theme }) => theme.palette.ColorApp.primary};
      margin: 0;
    }
  }

  .actionsBox {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .mainCheckoutBtn {
      width: 100%;
      height: 48px;
      border-radius: 14px;
      background: ${({ theme }) => theme.palette.ColorApp.primary_gradient || theme.palette.ColorApp.primary};
      color: #ffffff;
      font-weight: 800;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 16px rgba(109, 40, 217, 0.35);
      transition: all 0.25s ease;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 22px rgba(109, 40, 217, 0.45);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .quickWaSummaryBtn {
      width: 100%;
      height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%) !important;
      color: #ffffff !important;
      font-weight: 800;
      font-size: 0.98rem;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
      transition: all 0.25s ease;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 22px rgba(37, 211, 102, 0.4);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  .trustPerks {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    display: flex;
    flex-direction: column;
    gap: 8px;

    .perkItem {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: ${({ theme }) => theme.palette.ColorApp.gray_600};
      font-weight: 600;

      span.perkIcon {
        font-size: 1rem;
      }
    }
  }
`;
