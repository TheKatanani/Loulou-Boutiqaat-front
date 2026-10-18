import styled from "styled-components";

export const ToggleStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${({ theme, isDark }) => 
    isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.9)'};
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 30px;
  padding: 6px 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.25s ease;
  user-select: none;
  font-family: inherit;

  &:hover {
    border-color: ${({ theme }) => theme.palette.ColorApp.primary};
    background: ${({ theme, isDark }) => 
      isDark ? 'rgba(51, 65, 85, 0.9)' : '#e2e8f0'};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }

  .switchTrack {
    width: 42px;
    height: 24px;
    background: ${({ isDark, theme }) => 
      isDark ? theme.palette.ColorApp.primary : '#cbd5e1'};
    border-radius: 12px;
    position: relative;
    transition: background 0.25s ease;
    display: flex;
    align-items: center;
  }

  .switchThumb {
    width: 18px;
    height: 18px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: ${({ isDark }) => (isDark ? '21px' : '3px')};
    transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    span {
      font-size: 10px;
      line-height: 1;
    }
  }

  .switchLabel {
    font-size: 0.85rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.font};
    direction: rtl;
  }
`;