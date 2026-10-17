import styled from "styled-components";

export const FooterStyled = styled.footer`
  background-color: ${({ theme }) => theme.palette.main};
  color: ${({ theme }) => theme.palette.font};
  border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
  padding-top: 40px;
  direction: rtl;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    padding-bottom: 40px;

    @media (max-width: 992px) {
      flex-direction: column;
      gap: 32px;
    }
  }

  .logoBox {
    flex: 1.2;
    max-width: 340px;

    .brandDesc {
      margin: 14px 0 20px 0;
      color: ${({ theme }) => theme.palette.ColorApp.gray_600};
      font-size: 0.92rem;
      line-height: 1.7;
    }

    .icons {
      display: flex;
      align-items: center;
      gap: 10px;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.palette.page};
        border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
        transition: all 0.25s ease;

        svg {
          width: 18px;
          height: 18px;
        }

        &:hover {
          background-color: ${({ theme }) => theme.palette.ColorApp.primary};
          border-color: ${({ theme }) => theme.palette.ColorApp.primary};
          transform: translateY(-3px);
          svg path, svg {
            fill: #ffffff;
          }
        }
      }
    }
  }

  .uls {
    flex: 1.5;
    display: flex;
    justify-content: space-around;
    gap: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  .contactColumn {
    flex: 1;
    max-width: 300px;

    h4 {
      font-size: 1.15rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.font};
      margin-bottom: 10px;
    }

    .contactText {
      font-size: 0.88rem;
      color: ${({ theme }) => theme.palette.ColorApp.gray_500};
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .whatsAppButton {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 30px;
      background: #25d366;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 0.92rem;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
      transition: all 0.25s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(37, 211, 102, 0.45);
      }
    }
  }
`;