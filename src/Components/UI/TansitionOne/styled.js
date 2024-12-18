import styled from "styled-components";

export const StyledTransactionOne = styled.div `
  background-color: ${props=>props.theme.palette.main};
  padding: 60px 0;
  min-height: calc(100vh - 113px);
${({card,theme})=>(
  card==='one'?`
`:`
background - color: $ {
  $ {
    theme.palette.main
  }
};
`
)}
.two{
  display:flex;
  justify-content: center;
  align-items: center; 
  overflow:auto;
}
.one{
  display: grid;
  grid-template-columns: repeat(3,auto);
}
.one,.two{
  gap: 10px;
  margin: 30px;
  padding: 30px 0;
  ${({theme:{media}})=>media.xs}{
    gap:5px;
    flex-wrap: wrap;
    } 
}
`
export const StyledCard = styled.a `
  text-decoration: none;
  color: #fff; 
  overflow: hidden;
  position:relative;
  padding: 20px; 
  border-radius: 8px;
  border:1px solid;
  cursor: pointer;
  transition: 0.4s;
  box-shadow: 5px 5px 10px   ${props=>props.theme.palette.ColorApp.gray_300};
  header{
    margin-top: 20px;
    padding: 15px;
    transform: translateY(-1rem);
    h3{
      padding: 10px 0;
    }
  } 
footer{
  padding: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  transform: translateY(1rem);
  width: 100%;
    a{
      color:${props=>props.theme.palette.ColorApp.primary_light}; 
    }
    .arrow{
      background-color: #00a6ed; 
      border:1px solid  #00a6ed;
      transform: translatex(-3rem)  rotate(180deg);
      transition: .4s ease-in-out 0.4s;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      cursor: pointer;
      animation: arrow 1s infinite ease-in-out .4s forwards;
    }
    @keyframes arrow {
      0%{
      transform:translateX(0rem)
    }
      50%{
      transform:translateX(.8rem)
    }
      80%{
      transform:translateX(1rem)
    }
    }
  }
  img{
    z-index: 1;
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    transform: scale(1.2);
    transition:transform 0.4s ease-out;
  }
  >div{
      position: relative;
      z-index: 3;
    }
  header,footer{
    opacity: 0;
    visibility: hidden;
    transition: .4s ease-in-out ;
  }
  ::before{
    content:'';
    position: absolute;
    inset:0;
    background: linear-gradient(360deg,#000,#555);
    opacity:0;
    transition: 0.4s ease-in-out;
    z-index: 2;
  } 
    
  width:100px;
  height:300px;

  &.active{
    min-width: 220px;
  }  
  &.active , :hover{
    width: 300px;
  }  
  &.active , :hover{
  .arrow {
    transform: translatex(0rem);
  }
  } 
  &.active , :hover{
    ::before {
      opacity: 0.75;
    }
  } >
  div { 
    }

  header,footer{

    opacity: 0;

    visibility: hidden;

    transition: .4s ease-in-out ;

  }

  &.active , :hover{

    header,

  footer{

    transform: translateY(0);

    opacity: 1;

    visibility: visible;

  }

  }   
`