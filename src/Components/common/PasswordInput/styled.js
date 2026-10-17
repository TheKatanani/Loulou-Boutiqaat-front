import styled from "styled-components";

export const StyledPasswordInput = styled.div` 
  position: relative;
  direction: rtl;
  margin-bottom: 12px;

  .passwordHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    label {
      font-weight: 700;
      font-size: 0.88rem;
      color: ${(props) => props.theme.palette.font};
      margin: 0;
    }

    .forgotPassword {
      font-size: 0.82rem;
      font-weight: 600;
      color: ${(props) => props.theme.palette.ColorApp.primary};
      text-decoration: none;
      transition: all 0.2s ease;
      &:hover {
        color: #d4af37;
        text-decoration: underline;
      }
    }
  }

  .inputWrapper {
    position: relative;

    input {
      margin-bottom: 0;
      padding-left: 45px;
    }

    .toggleVisibility {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.palette.font_secondary};
      transition: transform 0.2s ease;
      font-size: 1.15rem;
      user-select: none;

      &:hover {
        transform: translateY(-50%) scale(1.15);
      }
    }
  }
`;