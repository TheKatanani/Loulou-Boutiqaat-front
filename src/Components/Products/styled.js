import styled from 'styled-components'
export const ProductsStyled = styled.div`
    .content2{
        height:calc(100% - 40px);
        margin: 20px 0 30px;
        ${props=>!props.full&&`
            display: grid;
            grid-template-columns:repeat(auto-fill,minmax(250px,auto));
            justify-content:space-between;
            gap:10px;
        `}
         ${({theme:{media}})=>media.xs} {
            /* grid-template-columns:repeat(1,auto); */
            justify-content:center;
    }
    }
`