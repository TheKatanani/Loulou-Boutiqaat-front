import styled from 'styled-components';

export const PageStyled = styled.div`
  padding: 10px 0 60px;
  direction: rtl;

  .cartLayout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 30px;
    align-items: flex-start;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  .cartItemsSection {
    width: 100%;
  }

  .cartSummarySection {
    position: sticky;
    top: 240px;
    width: 100%;

    @media (max-width: 992px) {
      position: static;
    }
  }
`;
