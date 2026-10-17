import styled from "styled-components";

export const StyledSaved = styled.div`
  min-height: calc(80vh - 120px);
  margin: 120px auto 60px;
  direction: rtl;

  @media (max-width: 576px) {
    margin: 160px auto 60px; 
  }

  .savedGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
    margin-top: 28px;
    @media (max-width: 576px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .emptyState {
    text-align: center;
    padding: 60px 20px;
    background: ${({theme}) => theme.palette.card};
    border: 1px solid ${({theme}) => theme.palette.border};
    border-radius: 24px;
    margin: 30px auto;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

    .noItems {
      font-size: 1.4rem;
      font-weight: 800;
      color: ${({theme}) => theme.palette.font};
      margin-bottom: 8px;
    }

    .exploreBtn {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 25px;
      background: ${({theme}) => theme.palette.ColorApp.primary_gradient};
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(109, 40, 217, 0.25);
      transition: all 0.25s ease;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(109, 40, 217, 0.35);
      }
    }
  }
`;