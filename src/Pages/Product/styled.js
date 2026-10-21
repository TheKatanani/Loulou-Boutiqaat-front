import styled from "styled-components";

export const StyledProductPage = styled.div`
  padding: 10px 0 60px;
  margin: 0;
  direction: rtl;

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.ColorApp.gray_500};
    margin-bottom: 24px;

    a {
      color: ${({ theme }) => theme.palette.ColorApp.gray_600};
      &:hover {
        color: ${({ theme }) => theme.palette.ColorApp.primary};
      }
    }

    .activeItem {
      color: ${({ theme }) => theme.palette.ColorApp.primary};
      font-weight: 700;
    }
  }

  .card {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.palette.main};
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    border-radius: 24px;
    padding: 36px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);

    @media (max-width: 868px) {
      flex-direction: column;
      padding: 20px;
      gap: 24px;
    }
  }

  .img {
    flex: 1;
    position: relative;
    max-width: 480px;
    width: 100%;
    border-radius: 18px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.palette.page};
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    padding: 20px;

    .discountTag {
      position: absolute;
      top: 16px;
      right: 16px;
      background: linear-gradient(135deg, #e53e3e, #f97316);
      color: #ffffff;
      font-size: 0.85rem;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 20px;
      z-index: 5;
      box-shadow: 0 3px 10px rgba(229, 62, 62, 0.35);
    }

    @media (max-width: 868px) {
      max-width: 100%;
    }
  }

  .content {
    flex: 1.2;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 2.2rem;
      font-weight: 800;
      color: ${({ theme }) => theme.palette.font};
      line-height: 1.35;
      margin-bottom: 14px;
    }

    .ratingSection {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;

      .ratingText {
        font-size: 0.85rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_500};
        font-weight: 600;
      }
    }

    .priceContainer {
      display: flex;
      align-items: baseline;
      gap: 14px;
      padding: 16px 20px;
      border-radius: 14px;
      background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
      margin-bottom: 24px;
      flex-wrap: wrap;

      .mainPrice {
        font-size: 2.2rem;
        font-weight: 900;
        color: ${({ theme }) => theme.palette.ColorApp.primary};
      }

      .prevCost {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_400};
        text-decoration: line-through;
      }

      .savingText {
        font-size: 0.88rem;
        font-weight: 700;
        color: #16a34a;
        background: #dcfce7;
        padding: 4px 10px;
        border-radius: 20px;
      }
    }

    .descriptionBox {
      margin-bottom: 30px;

      h4 {
        font-size: 1.05rem;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.font};
        margin-bottom: 8px;
      }

      .description {
        font-size: 1rem;
        line-height: 1.8;
        color: ${({ theme }) => theme.palette.ColorApp.gray_600};
      }
    }

    .actionsRow {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;

      .cartBtnWrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 24px;
        border-radius: 30px;
        background: ${({ theme }) => theme.palette.ColorApp.primary_gradient};
        color: #ffffff;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(109, 40, 217, 0.3);
        transition: all 0.25s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(109, 40, 217, 0.45);
        }

        .btnLabel {
          font-weight: 700;
          font-size: 1rem;
        }

        .cart {
          border: none;
          background: transparent;
          svg {
            border: none;
            width: 24px;
            height: 24px;
            path {
              fill: #ffffff;
            }
          }
        }
      }

      .saveBtnWrapper {
        .saved {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid ${({ theme }) => theme.palette.ColorApp.gray_300};
          background: ${({ theme }) => theme.palette.main};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            border-color: ${({ theme }) => theme.palette.ColorApp.primary};
            transform: scale(1.08);
          }
        }
      }
    }

    .trustPerks {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding-top: 24px;
      border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};

      .perk {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_500};
        font-weight: 600;

        span {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;