import styled from "styled-components";

export const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 0.88rem;
  color: ${(props) => props.theme.palette.font};
  margin-bottom: 6px;
  font-family: 'Cairo', 'Tajawal', sans-serif;
  text-align: right;
  direction: rtl;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  border: 1.5px solid ${(props) => props.theme.palette.border};
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.92rem;
  font-family: 'Cairo', 'Tajawal', sans-serif;
  color: ${(props) => props.theme.palette.font};
  background-color: ${(props) => props.theme.palette.card};
  padding: 0 16px;
  margin-bottom: 12px;
  outline: none;
  transition: all 0.2s ease;
  direction: rtl;

  &:focus {
    border-color: ${(props) => props.theme.palette.ColorApp.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.12);
  }

  &::placeholder {
    color: ${(props) => props.theme.palette.font_secondary};
    opacity: 0.65;
    font-size: 0.86rem;
  }
`;