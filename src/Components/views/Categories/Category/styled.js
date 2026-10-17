import styled from "styled-components";

export const Styledcategory = styled.section`
  padding: 50px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};

  .categoryHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;
    direction: rtl;
    flex-wrap: wrap;
    gap: 16px;
  }

  .categoryTitleBox {
    .categoryBadge {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.ColorApp.primary};
      background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 8px;
      border: 1px solid ${({ theme }) => theme.palette.ColorApp.primary_light}33;
    }

    .categoryTitle {
      font-size: 2rem;
      font-weight: 800;
      color: ${({ theme }) => theme.palette.font};
      letter-spacing: -0.5px;
      margin: 0;

      @media (max-width: 576px) {
        font-size: 1.6rem;
      }
    }
  }

  .categoryHeaderControls {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .viewAllLink {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.ColorApp.primary};
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover {
      transform: translateX(-4px);
      color: ${({ theme }) => theme.palette.ColorApp.primary_light};
    }
  }

  .sliderButtons {
    display: flex;
    gap: 8px;
    direction: ltr;

    .sliderBtn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${({ theme }) => theme.palette.main};
      border: 1.5px solid ${({ theme }) => theme.palette.ColorApp.gray_300};
      color: ${({ theme }) => theme.palette.font};
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.25s ease;

      &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.palette.ColorApp.primary};
        color: ${({ theme }) => theme.palette.ColorApp.primary};
        box-shadow: 0 4px 12px rgba(109, 40, 217, 0.15);
        transform: translateY(-2px);
      }

      &.disabled, &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        border-color: ${({ theme }) => theme.palette.ColorApp.gray_200};
      }
    }
  }

  .data {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    direction: rtl;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    @media (max-width: 868px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }
  }

  .noData {
    text-align: center;
    color: ${({ theme }) => theme.palette.ColorApp.gray_500};
    font-size: 1.2rem;
    font-weight: 600;
    padding: 60px 0;
  }
`;

export const StyeldCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.main};
  border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(109, 40, 217, 0.12);
    border-color: ${({ theme }) => theme.palette.ColorApp.primary_light};
  }

  .discountBadge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: linear-gradient(135deg, #e53e3e, #f97316);
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;
    z-index: 5;
    box-shadow: 0 3px 10px rgba(229, 62, 62, 0.35);
    letter-spacing: 0.3px;
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    direction: rtl;

    .icons {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      gap: 6px;
      z-index: 4;

      svg {
        padding: 6px;
        width: 34px;
        height: 34px;
        border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_300};
        border-radius: 10px;
        background: ${({ theme }) => theme.palette.page};
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          transform: scale(1.1);
          border-color: ${({ theme }) => theme.palette.ColorApp.primary};
        }
      }
    }

    .price {
      font-size: 1.4rem;
      font-weight: 800;
      color: ${({ theme }) => theme.palette.ColorApp.primary};
      margin-bottom: 6px;

      .prevCost {
        color: ${({ theme }) => theme.palette.ColorApp.gray_400};
        font-size: 0.95rem;
        font-weight: normal;
        text-decoration: line-through;
        margin-right: 8px;
        opacity: 0.85;
      }
    }

    .title {
      font-size: 1.05rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.font};
      line-height: 1.45;
      margin: 6px 0 10px 0;
      min-height: 48px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .description {
      font-size: 0.88rem;
      color: ${({ theme }) => theme.palette.ColorApp.gray_500};
      line-height: 1.5;
      margin-bottom: 16px;
      min-height: 42px;

      span {
        color: ${({ theme }) => theme.palette.ColorApp.primary};
        font-weight: 700;
        cursor: pointer;
        margin-right: 4px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;