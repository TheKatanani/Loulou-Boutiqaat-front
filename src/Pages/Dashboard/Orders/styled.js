import styled from "styled-components";

export const StyledBill = styled.div ` 
    padding: 20px;
    border-radius:8px;
    background-color:${({theme})=>theme.palette.main}; 
    color:${({theme})=>theme.palette.font}; 
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index: 2;
    footer{
        margin: 10px;
    }
`
export const StyledOrders = styled.div ` 
    padding: 20px; 
    .input{
        input{
        background-color:${({theme})=>theme.palette.main};
        }
        margin: 0px auto;
        width: max(50%,100px);
    }
    color:${({theme})=>theme.palette.font};   
    table{
        margin:10px 0;
    }
`