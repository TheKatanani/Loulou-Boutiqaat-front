import styled from "styled-components";

export const StyledAddCart = styled.button` 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-family: inherit;

  svg {
    padding: 6px;
    width: 34px;
    height: 34px;
    border: 1.5px solid ${props => props.isInCart ? props.theme.palette.ColorApp.primary : props.theme.palette.ColorApp.gray_300} !important;
    border-radius: 8px;
    background-color: ${props => props.isInCart ? props.theme.palette.ColorApp.primary : props.theme.palette.main} !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    box-shadow: ${props => props.isInCart ? '0 4px 12px rgba(109, 40, 217, 0.35)' : '0 2px 6px rgba(0, 0, 0, 0.04)'};

    path {
      fill: ${props => props.isInCart ? '#ffffff' : props.theme.palette.ColorApp.primary} !important;
      transition: fill 0.2s ease;
    }

    &:hover {
      transform: scale(1.08);
      border-color: ${props => props.theme.palette.ColorApp.primary} !important;
    }
  }
`;
