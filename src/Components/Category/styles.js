import styled from "styled-components";

export const CategoryStyled = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;

  ul {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 10px;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 6px 16px;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;

    &::-webkit-scrollbar {
      display: none;
    }

    &:active {
      cursor: grabbing;
    }

    li {
      flex-shrink: 0;
      white-space: nowrap;
      border-radius: 20px;
      transition: transform 0.2s ease;

      &:active {
        transform: scale(0.96);
      }

      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 18px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.88rem;
        white-space: nowrap;
        color: ${props => props.theme.palette.ColorApp.gray_600};
        background-color: ${props => props.theme.theme === 'dark' ? props.theme.palette.card : props.theme.palette.ColorApp.gray_100};
        border: 1px solid ${props => props.theme.palette.border};
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        transition: all 0.2s ease;

        &:hover {
          color: ${props => props.theme.palette.ColorApp.primary};
          background: ${props => props.theme.palette.ColorApp.primary_soft};
          border-color: ${props => props.theme.palette.ColorApp.primary_light};
        }

        &.active {
          color: #ffffff;
          background: ${props => props.theme.palette.ColorApp.primary};
          border-color: ${props => props.theme.palette.ColorApp.primary};
          box-shadow: 0 2px 8px rgba(109, 40, 217, 0.3);
        }
      }
    }
  }

  @media (min-width: 992px) {
    ul {
      justify-content: center;
      flex-wrap: wrap;
    }
  }
`;