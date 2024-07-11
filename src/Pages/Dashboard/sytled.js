import styled from "styled-components";

export const StyledDashboard = styled.div `
.content{
  display: flex; 
  gap:20px;
  min-height: calc(100dvh - 63.2px);
}
  ${({theme:{media}})=>media.xs}{
    padding-inline-start: 0px;
  }
  ${({theme:{media}})=>media.s}{
    padding-inline-start: 0px;
  }
  ${({theme:{media}})=>media.xl}{
  .container{
    max-width: 1150px;
    margin: 0 auto;
  }
  }
  .layout{
    position:fixed;
    inset:0;
    background-color: ${({theme})=>theme.palette.ColorApp.gray_600}55;
  }
  ${({theme:{media}})=>media.s}{
  main{
    padding-inline-start: 140px;
  }
  }
  aside{
    position: fixed;
    z-index: 999;
    top:0;
    padding: 30px  0px;
    min-height: 100vh;
    background-color:${({theme})=>theme.palette.main};
    transition: .3s;
    button{
      display: none;
    }
    ${({theme:{media}})=>media.xs}{
      &.opened{
        inset-inline-start: 0px; 
      } 
      &.colsed{
        inset-inline-start: -105px; 
      } 
    button{  
      display: block;
      position:absolute;
      width:fit-content;
      color:${({theme})=>theme.palette.ColorApp.white};
      background-color:${({theme})=>theme.palette.ColorApp.primary};
      top:0;
      right: -18px;
      padding:2px 5px;
      border-top-left-radius:0;
      border-bottom-left-radius:0;
    }
  }
    li{
      a{
        display: block;
        width: 100%;
        padding: 25px 20px;
        color:${({theme})=>theme.palette.font};
        transition: 0.3s; 
    } 
    :hover{
      background-color:${({theme})=>theme.palette.ColorApp.primary_light};
    }
    }
    li:last-child{
            padding:15px 5px;
            >div{
                position:unset;
                background-color:${(props) => props.theme.palette.ColorApp.gray_200}; 
                display: flex;
                flex-wrap: wrap; 
                justify-content:center;
                align-items: center;
                gap:10px;
                text-align: center;
                button{
                    display: block;
                    border: 1px solid ${props=>props.theme.palette.ColorApp.gray_500};
                    a{
                      padding: 0;
                    }
                }
            }
            :hover{
      background-color:transparent;
    }
    ${({theme:{media}})=>media.xs}{
      display:none
    }
    ${({theme:{media}})=>media.s}{
      display:none
    }
    ${({theme:{media}})=>media.m}{
      display:initial
    } 
        }
  }
  main{
    flex:1;
  }
`
export const StyledForm = styled.form ` 
  margin: 30px 0;
  padding: 20px;
  border-radius:8px;
  background-color:${({theme})=>theme.palette.main};
  box-shadow: 5px 5px 10px ${props=>props.theme.palette.ColorApp.gray_100};
  .d-flex{
    div{
      flex:1;
    }
    display: flex;
    justify-content: center;
    align-items:end;
    ${({theme:{media}})=>media.xs}{
    flex-wrap: wrap;
  }
    ${({theme:{media}})=>media.s}{
    flex-wrap: wrap;
  }
    ${({theme:{media}})=>media.m}{
    flex-wrap: nowrap;
  }
    gap:10px;
    .input,.select,select{
      width: 100%;
    }
  }
  button{
  background-color:${({theme})=>theme.palette.ColorApp.primary_light};
  &.disabled{
    opacity: 0.7;
    background-color:${({theme})=>theme.palette.ColorApp.gray_500};
    cursor:not-allowed
    }
  } 
`
export const StyledAdd = styled.div `
  #description{
    resize: vertical;
    height: 100px;
  }
  form{
    padding:20px;
    margin-top: 20px; 
  }
  .input{
    margin-top: 20px;
    input{
      background-color:${({theme})=>theme.palette.main};
    }
      margin: 0px auto;
      width: max(50%,100px);
  }
`
export const StyledTable = styled.table `
  td .checkbox{
    justify-content:center;
  }
  width:100%;
  overflow-x: auto;
  margin: 20px 0;
  box-shadow: 5px 5px 10px ${props=>props.theme.palette.ColorApp.gray_100};
  @media (width <= 300px) {
    .images{
      display: none;
    }
  }
  ${({theme:{media}})=>media.xs}{
  .id
,.description
,.previous
,.count
,.barthDay
,.gender
,.password
,.role
,.stars{
  display:none
}}
${({theme:{media}})=>media.s}{
  .id 
  ,.role
  ,.barthDay
  ,.gender
  ,.description 
,.stars{
display:none
}}
  ${({theme:{media}})=>media.l}{
  .id
,.description
,.previous
,.count
,.barthDay
,.gender
,.password
,.role
,.stars{
display:table-cell
}
  }
  th , td {
    width: fit-content;
    max-width: 150px;
    padding: 5px;
    text-align: center;
  }
  th{
    background-color:${({theme})=>theme.palette.ColorApp.primary_light};
  }
  td{
    background-color:${({theme})=>theme.palette.main}; 
    color:${({theme})=>theme.palette.font}; 
    &.images{
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border:1px solid;
      object-fit: cover;
    }
      overflow-x: auto;
    }
    button{
      padding: 5px 7px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      ${({theme:{media}})=>media.xs}{
        font-weight: normal;
        padding: 2px 4px;
        font-size: 1rem;
  }
      color:${({theme})=>theme.palette.main}; 
      border:2px solid ${({theme})=>theme.palette.ColorApp.gray_100};
      &.update{
        background-color:${({theme})=>theme.palette.ColorApp.primary_light};
      }
      &.delete{
        background-color:red;
      }
    }
  }
  tr{
    &:nth-child(2n){
      td{
        background-color:${({theme})=>theme.palette.ColorApp.gray_200};
      }
  }
    
    &.underUpdate 
    {
      td{ 
        background-color:${({theme})=>theme.palette.ColorApp.gray_400};
      }
      button{
        background-color: ${({theme})=>theme.palette.ColorApp.gray_400};
        opacity: 0.7;
        cursor:not-allowed;
      }
    }
}
`