import styled from "styled-components";
import { StyledForm } from "../../../Pages/Dashboard/sytled";

export const StyledRigisterForm = styled(StyledForm)`
border-bottom: 1px solid ${props=> props.theme.palette.ColorApp.gray_300};
    padding:0;
    margin:0;
    .name{
        display: flex;
        align-items:center;
    }
    select{
        width: 100%;
    }
    .d-flex{
        display:flex;
        align-items: center;
    }
    .phone{
    label{
        color:${props=> props.theme.palette.font};      
    }
    .cansel{
        margin: 10px 0;
    }
    >div{
        display: flex;
        align-items:center;
        >*{
            flex: 1;
        }
    }
   }
   .gender{
     margin: 10px 0;
     display: flex;
    gap: 20px;
    align-items: center;
    label{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:${({theme})=>theme.palette.font};
        input{
            margin-inline-end: 5px;
        }    
    }
   } 
`