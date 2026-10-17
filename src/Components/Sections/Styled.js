import styled from 'styled-components'
export const SectionsStyle = styled.div`
    display: flex;
    gap:23px;
    .icon{
        padding: 10px 0; 
        text-align: center;
        cursor: pointer;
        font-size: ${(props) => props.theme.fontSizes.body2}rem;
        color: ${(props) =>  props.theme.palette.ColorApp.gray_500};
        transition: color 0.2s ease;
        &:hover {
            color: ${(props) => props.theme.palette.ColorApp.primary};
        }
    }
    .themeToggle {
        background: transparent;
        border: none;
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .themeEmoji {
            font-size: 1.25rem;
            line-height: 1;
            margin-bottom: 2px;
            transition: transform 0.2s ease;
        }
        &:hover .themeEmoji {
            transform: scale(1.15) rotate(12deg);
        }
    }
    .cartLink, .savedLink {
      position: relative;
    }
    .cartLink::before {
      ${props => props.productLength > 0 && `content: '${props.productLength}';`}
      position: absolute;
      top: 0;
      right: 0;
      min-width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      color: ${(props) =>  props.theme.palette.ColorApp.white};
      background-color: ${(props) =>  props.theme.palette.ColorApp.primary};
      border-radius: 9px;
      padding: 0 4px;
    }
    .savedLink::before {
      ${props => props.savedLength > 0 && `content: '${props.savedLength}';`}
      position: absolute;
      top: 0;
      right: 0;
      min-width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      color: ${(props) =>  props.theme.palette.ColorApp.white};
      background-color: #e53e3e;
      border-radius: 9px;
      padding: 0 4px;
    }
    ${({theme:{media}})=>media.xs}{
        display: none;
    }
    ${({theme:{media}})=>media.xl}{
  order:3
}
`