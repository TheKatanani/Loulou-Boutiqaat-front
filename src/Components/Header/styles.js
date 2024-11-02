import styled from "styled-components";

export const StyledHeader = styled.header `
    padding:11px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    box-shadow: 5px 5px 10px ${props=>props.theme.palette.ColorApp.gray_100};
    .logoBox > svg{
        display: none;
    }
    .menu{
        display: none;
    }
    background-color:${(props)=>props.theme.palette.main};
    >div>div{
        display: flex;
        gap:20px;
        justify-content:space-between;
        align-items:center;
    }
    /*x Small */
    ${({theme})=>theme.media.xs}{
        >div>div{
            .menu{
                display: block;
            }
        flex-wrap: wrap;
        justify-content:flex-start;
        }
        .logoBox{
            display: flex;
            justify-content:center;
            align-items:center;
            gap:10px;
            svg{
                display: block;
                cursor: pointer;
            }
        }
        .layout{
            position:fixed;
            top:0;
            width:100vw;
            height:100vh;
            background-color:#00000052;
            z-index:9999;
            transition: 0.3s;
        }
    }
    ${({theme})=>theme.media.s}{
        >div>div{
        flex-wrap: wrap;
        justify-content: space-evenly;
    } 
}
.categoriesPart{ 
    display:flex;
    justify-content:spce-evenly;
.auth{
    flex:.31;
    /* display:inline-block; */
    /* margin-left: auto; */
    /* position:absolute;
    top:0;
    right:0; */
    display:flex;   
    @media (width < 990px) { 
        flex:.8;
        margin-top: 10px;
    }
    ${({theme})=>theme.media.xs}{
        display:none;
    }
    a{
        margin:0 5px; 
    }
    button{
        width:95px;
        border:2px solid ${(props)=>props.theme.palette.ColorApp.primary};
        background-color:${(props)=>props.theme.palette.ColorApp.gray_100};
        color:${(props)=>props.theme.palette.font};
    }
}
}
`