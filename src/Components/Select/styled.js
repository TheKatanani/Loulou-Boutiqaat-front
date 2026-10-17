import styled from "styled-components";

export const SelsctStyled = styled.select`
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: 1.5px solid ${(props) => props.theme.palette.border};
  background-color: ${(props) => props.theme.palette.card};
  color: ${(props) => props.theme.palette.font};
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Cairo', 'Tajawal', sans-serif;
  padding: 0 14px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  direction: rtl;

  &:focus {
    border-color: ${(props) => props.theme.palette.ColorApp.primary};
    box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.12);
  }

  option {
    background-color: ${(props) => props.theme.palette.main};
    color: ${(props) => props.theme.palette.font};
    padding: 10px;
  }
`;