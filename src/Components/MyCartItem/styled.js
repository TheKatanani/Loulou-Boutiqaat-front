import styled from "styled-components";

export const MyCartItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => (theme.theme === 'dark' ? '#1e293b' : '#f8fafc')};
  border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
  gap: 16px;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.ColorApp.primary_light || '#a78bfa'};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }

  .mainInfo {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;

    .imgBox {
      width: 90px;
      height: 90px;
      min-width: 90px;
      border-radius: 12px;
      overflow: hidden;
      background: #ffffff;
      border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .textBox {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .itemTitle {
        font-size: 1.05rem;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.font};
        margin: 0;
        line-height: 1.4;
        text-decoration: none;

        &:hover {
          color: ${({ theme }) => theme.palette.ColorApp.primary};
        }
      }

      .unitPrice {
        font-size: 0.9rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_500};
        font-weight: 600;
      }

      .actionButtons {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;

        button {
          background: transparent;
          border: none;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .deleteBtn {
          color: #ef4444;
          &:hover {
            background: rgba(239, 68, 68, 0.1);
          }
        }

        .saveBtn {
          color: ${({ theme }) => theme.palette.ColorApp.primary};
          &:hover {
            background: ${({ theme }) => theme.palette.ColorApp.primary_soft || 'rgba(109, 40, 217, 0.1)'};
          }
        }
      }
    }
  }

  .pricingAndQuantity {
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
      justify-content: space-between;
      border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
      padding-top: 12px;
    }

    .qtyPill {
      display: flex;
      align-items: center;
      background: ${({ theme }) => theme.palette.main};
      border: 1.5px solid ${({ theme }) => theme.palette.ColorApp.gray_300};
      border-radius: 25px;
      padding: 3px 10px;
      gap: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

      button {
        background: transparent;
        border: none;
        color: ${({ theme }) => theme.palette.font};
        font-size: 1.25rem;
        font-weight: 700;
        cursor: pointer;
        padding: 0 4px;
        transition: color 0.15s;

        &:hover {
          color: ${({ theme }) => theme.palette.ColorApp.primary};
        }
      }

      .quantityValue {
        font-size: 0.95rem;
        font-weight: 800;
        color: ${({ theme }) => theme.palette.font};
        min-width: 20px;
        text-align: center;
      }
    }

    .subtotalBox {
      text-align: left;
      min-width: 90px;

      .subtotalPrice {
        font-size: 1.25rem;
        font-weight: 900;
        color: ${({ theme }) => theme.palette.ColorApp.primary};
        display: block;
      }

      .calcDetail {
        font-size: 0.78rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_500};
      }
    }
  }
`;
