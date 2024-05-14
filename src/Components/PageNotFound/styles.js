import styled from "styled-components";

export const PageNotFoundStyled = styled.div `
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;

  .title {
    font-size: 4rem;
    color: #f00;
    text-align: center;
    animation: fadeIn 1s ease-in;
  }

  .message {
    font-size: 2rem;
    color: #444;
    text-align: center;
    animation: fadeIn 2s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

`