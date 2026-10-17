import styled from "styled-components";

export const StyledPhoneContainer = styled.div`
  margin-bottom: 14px;
  direction: rtl;
  text-align: right;

  .labelRow {
    display: block;
    font-weight: 700;
    font-size: 0.88rem;
    color: ${(props) => props.theme.palette.font};
    margin-bottom: 6px;
    font-family: 'Cairo', 'Tajawal', sans-serif;
  }

  .phoneBox {
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 12px;
    border: 1.5px solid ${(props) => props.theme.palette.border};
    background-color: ${(props) => props.theme.palette.card};
    overflow: hidden;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${(props) => props.theme.palette.ColorApp.primary_soft || '#c4b5fd'};
    }

    &:focus-within {
      border-color: ${(props) => props.theme.palette.ColorApp.primary};
      box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.12);
    }

    .countrySelect {
      width: 140px;
      min-width: 130px;
      height: 100%;
      border: none;
      border-left: 1.5px solid ${(props) => props.theme.palette.border};
      background-color: transparent;
      color: ${(props) => props.theme.palette.font};
      font-size: 0.88rem;
      font-weight: 600;
      font-family: 'Cairo', 'Tajawal', sans-serif;
      padding: 0 10px 0 28px;
      outline: none;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236d28d9' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: left 8px center;
      background-size: 14px;

      option {
        background-color: ${(props) => props.theme.palette.card};
        color: ${(props) => props.theme.palette.font};
        padding: 8px;
      }
    }

    .numberInput {
      flex: 1;
      height: 100%;
      border: none;
      background-color: transparent;
      color: ${(props) => props.theme.palette.font};
      padding: 0 14px;
      font-size: 0.96rem;
      font-weight: 600;
      font-family: monospace, 'Cairo', sans-serif;
      direction: ltr;
      text-align: left;
      outline: none;
      letter-spacing: 0.5px;

      &::placeholder {
        color: ${(props) => props.theme.palette.font_secondary};
        opacity: 0.6;
        font-family: 'Cairo', sans-serif;
        font-size: 0.88rem;
        direction: rtl;
        text-align: right;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover, 
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px ${(props) => props.theme.palette.card} inset !important;
        -webkit-text-fill-color: ${(props) => props.theme.palette.font} !important;
      }
    }
  }
`;
