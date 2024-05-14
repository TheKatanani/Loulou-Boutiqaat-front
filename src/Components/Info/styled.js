import styled from "styled-components";

export const StyledInfo = styled.div `
    max-width:430px;
    padding:20px 10px;
    h6{
        font-size:${(props) => props.theme.fontSizes.h6}rem;
        color:${(props) => props.theme.palette.font};
    }
    hr{
        border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
    }
    p{
        color:${(props) => props.theme.palette.ColorApp.gray_500};
    }
    .stock{
        color:${(props) => props.theme.palette.ColorApp.green};
    }
    .trade{
        background: #FFF0DF;
        display: grid;
        grid-template-columns:repeat(3,auto);
        padding:16px;
        div{
            padding-left:5px;
        }
        >*:not(:last-child){
            border-right:3px solid ${(props) => props.theme.palette.ColorApp.gray_300};
        }
        .red{
            color:#FA3434;
        }
    }
    .reviews svg{
        transform:translateY(3px);
    }
    tr{
        display: flex;
        margin:16px 0;
        p{
            color:${(props) => props.theme.palette.ColorApp.gray_500};
        }
        td{
            flex:1;
            color:${(props) => props.theme.palette.ColorApp.gray_600};
        }
    }
`