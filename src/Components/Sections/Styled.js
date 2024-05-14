import styled from 'styled-components'
export const SectionsStyle = styled.div`
    display: flex;
    gap:23px;
    .icon{
          padding:10px 0; 
          text-align:center;
        cursor: pointer;
        font-size:${(props) => props.theme.fontSizes.body2}rem;
        color:${(props) =>  props.theme.palette.ColorApp.gray_500};
    }
    a:last-child {
      position:relative;
      ::before{
        ${props=>props.productLength>0&&`content:'${props.productLength}';`}
        position:absolute;
        top:0;
        right: 0;
        padding: 2px 5px;
        color:${(props) =>  props.theme.palette.ColorApp.white};
        background-color:${(props) =>  props.theme.palette.ColorApp.primary};
        border-radius: 50%;
      }
    }
    ${({theme:{media}})=>media.xs}{
        display: none;
    }
    ${({theme:{media}})=>media.xl}{
  order:3
}
`