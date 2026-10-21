import styled from "styled-components";

export const MyCartStyled = styled.div`
  width: 100%;

  .cartHeaderBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;

    h3 {
      font-size: 1.35rem;
      font-weight: 800;
      color: ${({ theme }) => theme.palette.font};
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;

      span.countPill {
        background: ${({ theme }) => theme.palette.ColorApp.primary_soft || '#f5f3ff'};
        color: ${({ theme }) => theme.palette.ColorApp.primary};
        font-size: 0.85rem;
        font-weight: 800;
        padding: 3px 12px;
        border-radius: 20px;
        border: 1px solid ${({ theme }) => theme.palette.ColorApp.primary_light || '#a78bfa'};
      }
    }
  }

  .cartCard {
    padding: 24px;
    background-color: ${({ theme }) => theme.palette.main};
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    border-radius: 20px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);

    @media (max-width: 576px) {
      padding: 16px 12px;
      border-radius: 16px;
    }

    .items {
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      min-height: 120px;

      .emptyBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        text-align: center;

        .emptyEmoji {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }

        h4 {
          font-size: 1.3rem;
          font-weight: 700;
          color: ${({ theme }) => theme.palette.font};
          margin: 0 0 8px;
        }

        p {
          color: ${({ theme }) => theme.palette.ColorApp.gray_500};
          font-size: 0.95rem;
          margin-bottom: 24px;
        }
      }
    }

    .cartFooterActions {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;

      .backBtn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: ${({ theme }) => theme.palette.ColorApp.primary_soft || '#f5f3ff'};
        color: ${({ theme }) => theme.palette.ColorApp.primary};
        border: 1.5px solid ${({ theme }) => theme.palette.ColorApp.primary_light || '#a78bfa'};
        padding: 10px 22px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: ${({ theme }) => theme.palette.ColorApp.primary};
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(109, 40, 217, 0.25);
        }
      }

      .clearBtn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        color: #ef4444;
        border: 1.5px solid rgba(239, 68, 68, 0.3);
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.92rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(239, 68, 68, 0.25);
        }
      }
    }
  }
`;
