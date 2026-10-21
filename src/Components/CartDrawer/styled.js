import styled from 'styled-components';

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  z-index: 99999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DrawerContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) => theme.palette.main};
  color: ${({ theme }) => theme.palette.font};
  box-shadow: 10px 0 35px rgba(0, 0, 0, 0.25);
  z-index: 100000;
  display: flex;
  flex-direction: column;
  direction: rtl;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 576px) {
    max-width: 100%;
  }

  .drawerHeader {
    padding: 18px 22px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.palette.main};

    .headerTitle {
      display: flex;
      align-items: center;
      gap: 10px;

      h3 {
        font-size: 1.2rem;
        font-weight: 800;
        margin: 0;
        color: ${({ theme }) => theme.palette.font};
      }

      .badge {
        background: ${({ theme }) => theme.palette.ColorApp.primary};
        color: #fff;
        font-size: 0.78rem;
        font-weight: 700;
        padding: 2px 10px;
        border-radius: 20px;
      }
    }

    .closeBtn {
      background: transparent;
      border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_300};
      color: ${({ theme }) => theme.palette.font};
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.1rem;
      transition: all 0.2s ease;

      &:hover {
        background: ${({ theme }) => theme.palette.ColorApp.primary};
        color: #fff;
        border-color: ${({ theme }) => theme.palette.ColorApp.primary};
        transform: rotate(90deg);
      }
    }
  }

  .drawerBody {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;

    /* Custom smooth scrollbar */
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.ColorApp.gray_300};
      border-radius: 10px;
    }

    .emptyState {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;

      .emptyIcon {
        font-size: 3.5rem;
        margin-bottom: 16px;
        animation: floatAnim 3s ease-in-out infinite;
      }

      h4 {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 8px;
        color: ${({ theme }) => theme.palette.font};
      }

      p {
        color: ${({ theme }) => theme.palette.ColorApp.gray_500};
        font-size: 0.92rem;
        margin-bottom: 24px;
        max-width: 260px;
        line-height: 1.5;
      }

      .shopBtn {
        background: ${({ theme }) => theme.palette.ColorApp.primary};
        color: #fff;
        border: none;
        padding: 12px 28px;
        border-radius: 25px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 14px rgba(109, 40, 217, 0.35);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(109, 40, 217, 0.45);
        }
      }
    }

    .itemsList {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  }

  .drawerItem {
    display: flex;
    gap: 14px;
    padding: 12px;
    border-radius: 14px;
    background: ${({ theme }) => (theme.theme === 'dark' ? '#1e293b' : '#f8fafc')};
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    transition: all 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.ColorApp.primary_light};
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
    }

    .itemImg {
      width: 75px;
      height: 75px;
      border-radius: 10px;
      overflow: hidden;
      flex-shrink: 0;
      background: #fff;
      border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .itemInfo {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .itemTop {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 8px;

        .itemTitle {
          font-size: 0.92rem;
          font-weight: 700;
          color: ${({ theme }) => theme.palette.font};
          line-height: 1.35;
          margin: 0;
        }

        .deleteItemBtn {
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 1rem;
          padding: 2px 6px;
          border-radius: 6px;
          transition: background 0.2s;

          &:hover {
            background: rgba(239, 68, 68, 0.12);
          }
        }
      }

      .itemBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;

        .itemPrice {
          font-size: 1rem;
          font-weight: 800;
          color: ${({ theme }) => theme.palette.ColorApp.primary};
        }

        .qtyPill {
          display: flex;
          align-items: center;
          background: ${({ theme }) => theme.palette.main};
          border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_300};
          border-radius: 20px;
          padding: 2px 8px;
          gap: 8px;

          button {
            background: transparent;
            border: none;
            color: ${({ theme }) => theme.palette.font};
            font-size: 1.1rem;
            cursor: pointer;
            padding: 0 4px;
            font-weight: 700;
            transition: color 0.2s;

            &:hover {
              color: ${({ theme }) => theme.palette.ColorApp.primary};
            }
          }

          span {
            font-size: 0.88rem;
            font-weight: 700;
            min-width: 18px;
            text-align: center;
          }
        }
      }
    }
  }

  .drawerFooter {
    padding: 18px 22px;
    border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    background: ${({ theme }) => theme.palette.main};
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.03);

    .deliveryNote {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      color: ${({ theme }) => theme.palette.ColorApp.green || '#10b981'};
      font-weight: 700;
      margin-bottom: 12px;
    }

    .subtotalRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      span {
        font-size: 1rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_600};
      }

      .totalPrice {
        font-size: 1.4rem;
        font-weight: 900;
        color: ${({ theme }) => theme.palette.ColorApp.primary};
      }
    }

    .footerActions {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .waQuickBtn {
        background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        color: #fff;
        border: none;
        padding: 13px;
        border-radius: 12px;
        font-size: 0.98rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
        transition: transform 0.2s, box-shadow 0.2s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
        }
      }

      .fullCheckoutBtn {
        background: ${({ theme }) => theme.palette.ColorApp.primary_gradient || theme.palette.ColorApp.primary};
        color: #fff;
        border: none;
        padding: 13px;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        transition: transform 0.2s, opacity 0.2s;

        &:hover {
          opacity: 0.93;
          transform: translateY(-1px);
        }
      }
    }
  }

  @keyframes floatAnim {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
`;
