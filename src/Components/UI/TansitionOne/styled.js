import styled from "styled-components";

export const StyledTransactionOne = styled.div `
  padding: 60px 0;
  min-height: calc(100vh - 113px);
${({card,theme})=>(
  card==='one'?`
`:`
background - color: $ {
  ${theme.palette.main}
};
`
)}
.two{
  display: flex;
  justify-content: center;
  align-items: center;

  flex-wrap:wrap;
}
.one{
  display: grid;
  grid-template-columns: repeat(3,auto);
}
.one,.two{
  gap: 20px;
  margin: 30px;
  padding: 30px 0;
  ${({theme:{media}})=>media.xs}{
    gap:5px;
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
    padding: 20px;
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
    .arrow{
      background-color: #00a6ed; 
      border:1px solid  #00a6ed;
      transform: translatex(-3rem);
      transition: .4s ease-in-out 0.4s;
      border-radius: 50%;
      width: 20px;
      height: 20px;
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
    transition:transform 0.4s ease-in-out;
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
    background:linear-gradient(360deg,#000,#00000033);
    opacity:0;
    transition: 0.4s ease-in-out;
    z-index: 2;
  } 
  ${({card})=>(
    card==='one'?`
min-width: 200px;
min-height: 200px;

:hover {
  ::before {
    opacity: 1;
  }
}

:hover {
  img {
    transform: scale(1);
  }
}:hover {
  .arrow {
    transform: translatex(0 rem);
  }
}

: hover {
  header,
  footer {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
}
`:`
width:100px;
height:300px;
  &.active {
  width: 300px;
}  &.active {
  .arrow {
    transform: translatex(0rem);
  }
} &.active {
  ::before {
    opacity: 0.35;
  }
} >
div { 
  }

  header,footer{

    opacity: 0;

    visibility: hidden;

    transition: .4s ease-in-out ;

  }

   &.active {

    header,

   footer{

    transform: translateY(0);

    opacity: 1;

    visibility: visible;

  }

  }

    `

  )}



  

`