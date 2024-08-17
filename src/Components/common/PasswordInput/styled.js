import styled from "styled-components";

export const StyledPasswordInput = styled.div` 
        position:relative;
        direction:rtl;
        top:2px;
        left:0;  
        span{
          position:absolute;
        img{
            width:22px;
        }
        top:50%;
        transform:translateY(-14%);
        left: 12px;
        cursor: pointer;
    } 
    &.text span::before{
        content: "";
        width: 3px;
        height: 22px;
        font-size: 30px;
        font-weight: bold;
        background-color: #8692a6;
        position: absolute;
        border-radius: 8px;
        top: -2px;
        left: 50%;
        transform: translateX(-50%) rotate(30deg);
        opacity: 0.8;
    }
    .forgotPassword{
        position:absolute;
        top:2px;
        left:0;
        font-size: 0.8rem;
    }
`