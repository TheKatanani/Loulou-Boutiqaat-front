import styled from 'styled-components'
export const PageStyled = styled.div`
    margin: 60px auto;
    direction: rtl;
    .flex{
      display: flex;
      justify-content:space-between;
      gap:20px;
      flex-wrap: wrap;
      @media (max-width: 576px) {
          justify-content:center;
      }
    }
    aside{
      margin-top: 47px;
      @media (max-width: 576px) {
        margin-top: 20px;
        width:100%;
      }
    }
`