import styled from "styled-components";
import { StyledTable } from "../Dashboard/sytled";
export const StayledOrders = styled.div`
    min-height:calc(80dvh - 113px);
    margin: 120px auto 60px;
    ${({theme:{media}})=>media.xs}{
        margin: 190px auto 60px; 
    }
    ${({theme:{media}})=>media.s}{ 
        margin: 200px auto 60px;
        }
    ${({theme:{media}})=>media.l}{ 
        margin: 140px auto 60px;
        }
    text-align:center;
`
export const StayledOrdersTable = styled(StyledTable)`
    direction:rtl;
    ${({theme:{media}})=>media.xs}{
  .id 
,.address{
  display:none;
}}
${({theme:{media}})=>media.s}{
  .id  
,.address{
display:none
}}
${({theme:{media}})=>media.m}{
  .id  
,.address{
display:none;
}}
  ${({theme:{media}})=>media.xl}{
  .id 
,.address{
display:table-cell;
}}
`