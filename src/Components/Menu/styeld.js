import styled from "styled-components";

export const MenuStyled = styled.div`
    position:fixed;
    z-index:999999;
    background-color: ${props=>props.theme.palette.main};
    top:0;
    left:${props=>props.show?`0`:`-350px`};
    height:100vh;
    width:37vh;
    transition:0.3s;
    box-shadow: 5px 5px 25px ${props=>props.theme.palette.ColorApp.gray_300};
    color:${props=>props.theme.palette.font};
    header{
        background-color:${props=>props.theme.palette.ColorApp.gray_200};
        padding:20px;
        p{
            margin-top: 8px;
        }
    }
    ul{
        padding:20px;
        li{ 
            a{
                color:${props=>props.theme.palette.ColorApp.gray_600};
                display: flex;
                align-items:center;
            }
                padding:15px 25px;
            .iconArea{
                width:50px;
            }
        }
        li:nth-child(4)
        ,li:nth-child(7){
            border-bottom: 1px solid ${props=>props.theme.palette.ColorApp.gray_300};
        }
        li:last-child{
            padding:15px 5px;
            >div{
                position:unset;
                background-color:${(props) => props.theme.palette.ColorApp.gray_200}; 
                display: flex;
                width:100%;
                justify-content:space-between;
                align-items: center;
                gap:10px;
                button{
                    border: 1px solid ${props=>props.theme.palette.ColorApp.gray_500};
                }
            }
        }
    }
    display: none;
    @media (max-width: 576px) {
        display: block;
    }
`