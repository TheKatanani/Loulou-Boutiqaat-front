import styled from "styled-components";

export const StyleSearch = styled.form` 
  display: flex;
  align-items: center;
  height: 44px;
  direction: rtl;
  flex: 1;
  max-width: 500px;
  min-width: 180px;
  position: relative;

  * {
    height: 100%;
    &:focus {
      outline: none;
    }
  }

  .results {
    z-index: 22;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: auto;
    background-color: ${props => props.theme.palette.card};
    border: 1px solid ${props => props.theme.palette.border};
    border-radius: 14px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    li {
      padding: 12px 18px;
      color: ${props => props.theme.palette.font};
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-weight: 500;
      font-size: 0.92rem;
      &:hover {
        background-color: ${props => props.theme.palette.ColorApp.primary_soft};
        color: ${props => props.theme.palette.ColorApp.primary};
      }
    }
  }

  input[type="text"] {
    flex: 1;
    min-width: 0;
    width: 100%;
    padding: 0 16px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border: 1.5px solid ${props => props.theme.palette.border};
    border-left: none;
    color: ${props => props.theme.palette.font};
    background-color: ${props => props.theme.palette.main};
    transition: all 0.25s ease;
    font-size: 0.92rem;
    font-family: 'Cairo', 'Tajawal', sans-serif;
    &:focus {
      border-color: ${props => props.theme.palette.ColorApp.primary};
    }
    &::placeholder {
      color: ${props => props.theme.palette.font_secondary};
      opacity: 0.75;
      font-size: 0.86rem;
    }
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: auto;
    min-width: 125px;
    max-width: 155px;
    padding: 0 14px 0 32px;
    border: 1.5px solid ${props => props.theme.palette.border};
    color: ${props => props.theme.palette.font};
    background-color: ${props => props.theme.palette.main};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236d28d9' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: left 12px center;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: 'Cairo', 'Tajawal', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: right;
    direction: rtl;
    &:focus {
      border-color: ${props => props.theme.palette.ColorApp.primary};
    }
    option {
      background-color: ${props => props.theme.palette.main};
      color: ${props => props.theme.palette.font};
      padding: 10px;
      font-weight: normal;
    }
  }

  button {
    display: none;
  }

  ${({theme})=>theme.media.xs} {
    max-width: 100%;
    input[type="text"] {
      border-radius: 25px;
      border-left: 1.5px solid ${props => props.theme.palette.border};
    }
    select {
      display: none;
    }
  }

  .d-none {
    display: none;
  }
`;