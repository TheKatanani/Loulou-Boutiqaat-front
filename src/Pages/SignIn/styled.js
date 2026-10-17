import styled from "styled-components";

export const LoginStyle = styled.div` 
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 60px 16px;
  min-height: calc(100vh - 85px);
  background-color: ${(props) => props.theme.palette.page};

  main {
    width: min(450px, 100%);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.05);
    background-color: ${(props) => props.theme.palette.card};
    border: 1px solid ${(props) => props.theme.palette.border};
    border-radius: 24px;
    padding: 38px 32px;
    margin: 0 auto;
    text-align: right;

    @media (max-width: 576px) {
      padding: 28px 20px;
    }

    .brandHeader {
      text-align: center;
      margin-bottom: 26px;

      .brandIcon {
        font-size: 2.4rem;
        display: block;
        margin-bottom: 8px;
      }

      h1 {
        font-size: 1.6rem;
        font-weight: 800;
        color: ${(props) => props.theme.palette.font};
        margin-bottom: 6px;
      }

      p {
        font-size: 0.9rem;
        color: ${(props) => props.theme.palette.font_secondary};
      }
    }

    .phoneGroup {
      margin-bottom: 14px;

      label {
        display: block;
        font-weight: 700;
        font-size: 0.88rem;
        color: ${(props) => props.theme.palette.font};
        margin-bottom: 6px;
      }

      .phoneInputs {
        display: flex;
        align-items: center;
        direction: rtl;

        select {
          width: 145px;
          min-width: 145px;
          height: 46px;
          border-radius: 0 12px 12px 0;
          border: 1.5px solid ${(props) => props.theme.palette.border};
          border-left: none;
          background-color: ${(props) => props.theme.palette.main};
          color: ${(props) => props.theme.palette.font};
          font-weight: 600;
          font-size: 0.88rem;
          padding: 0 12px;
          outline: none;
          &:focus {
            border-color: ${(props) => props.theme.palette.ColorApp.primary};
          }
        }

        input {
          flex: 1;
          height: 46px;
          border-radius: 12px 0 0 12px;
          border: 1.5px solid ${(props) => props.theme.palette.border};
          background-color: ${(props) => props.theme.palette.main};
          color: ${(props) => props.theme.palette.font};
          padding: 0 16px;
          margin: 0;
          direction: ltr;
          text-align: left;
          font-family: monospace;
          font-size: 0.95rem;
          outline: none;
          &:focus {
            border-color: ${(props) => props.theme.palette.ColorApp.primary};
          }
        }
      }
    }

    .authFooterLinks {
      margin-top: 24px;
      text-align: center;
      font-size: 0.92rem;
      color: ${(props) => props.theme.palette.font_secondary};

      a {
        color: ${(props) => props.theme.palette.ColorApp.primary};
        font-weight: 700;
        text-decoration: none;
        margin-right: 4px;
        transition: color 0.2s ease;
        &:hover {
          color: #d4af37;
          text-decoration: underline;
        }
      }
    }
  }

  .backHomeLink {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
    text-align: center;
    color: ${(props) => props.theme.palette.font_secondary};
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.palette.ColorApp.primary};
    }
  }
`;