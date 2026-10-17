import styled from "styled-components";
import { MainButton } from "../../../Global/components";

export const StyledButton = styled(MainButton)` 
  p {
    margin: 0 !important;
    padding: 0;
    color: #ffffff !important;
    font-weight: 700;
    font-size: 0.98rem;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    > span {
      animation: 1s ease-in-out infinite buttonLoader;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #ffffff;
      &:nth-child(2) { 
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  @keyframes buttonLoader {
    0% {
      opacity: 0.2;
      transform: scale(0.8);
    }
    40% {
      opacity: 1;
      transform: scale(1.1);
    }
    80% {
      opacity: 0.2;
      transform: scale(0.8);
    }
    100% {
      opacity: 0.2;
      transform: scale(0.8);
    }
  }
`;