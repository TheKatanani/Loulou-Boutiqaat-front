import styled from 'styled-components';

export const FeaturesSection = styled.section`
  padding: 40px 0;
  background-color: ${({ theme }) => theme.palette.main};
  border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
  border-bottom: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  direction: rtl;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.page};
  border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
    border-color: ${({ theme }) => theme.palette.ColorApp.primary_light};
  }

  .iconWrapper {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
    flex-shrink: 0;
  }

  .textWrapper {
    h3 {
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.font};
      margin-bottom: 4px;
    }
    p {
      font-size: 0.82rem;
      color: ${({ theme }) => theme.palette.ColorApp.gray_500};
      line-height: 1.4;
      margin: 0;
    }
  }
`;
