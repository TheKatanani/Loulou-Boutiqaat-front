import styled from "styled-components";

export const CategoryStyled = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  width: 100%;

  ul {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    a {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.92rem;
      color: ${props => props.theme.palette.ColorApp.gray_600};
      transition: all 0.2s ease;

      &:hover {
        color: ${props => props.theme.palette.ColorApp.primary};
        background: ${props => props.theme.palette.ColorApp.primary_soft};
      }

      &.active {
        color: #ffffff;
        background: ${props => props.theme.palette.ColorApp.primary};
        box-shadow: 0 2px 8px rgba(109, 40, 217, 0.25);
      }
    }
  }

  ${({ theme: { media } }) => media.xs} {
    width: 100%;
    padding: 0;
    margin: 0;

    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    li {
      width: 100%;
      min-height: 52px;
      border-radius: 12px;
      text-align: center;
      background-color: ${props => props.theme.theme === 'dark' ? props.theme.palette.card : props.theme.palette.ColorApp.gray_100};
      border: 1px solid ${props => props.theme.palette.border};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: transform 0.15s ease, background-color 0.2s ease, border-color 0.2s ease;

      &:active {
        transform: scale(0.96);
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 8px 6px;
        color: ${props => props.theme.palette.font};
        font-size: 0.82rem;
        font-weight: 700;
        line-height: 1.25;
        text-align: center;
        border-radius: 12px;
        transition: all 0.2s ease;

        &.active {
          background: ${props => props.theme.palette.ColorApp.primary};
          color: #ffffff;
          box-shadow: 0 3px 10px rgba(109, 40, 217, 0.35);
        }
      }
    }
  }

  ${({ theme: { media } }) => media.s} {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;