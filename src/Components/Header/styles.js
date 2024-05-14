import styled from "styled-components";

export const Header = styled.header`
    padding:11px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
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
`

