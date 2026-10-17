import styled from "styled-components";

export const StyledHero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 130px 0 60px 0;
  background: radial-gradient(circle at 85% 25%, ${({ theme }) => theme.palette.ColorApp.primary_soft} 0%, transparent 55%),
              ${({ theme }) => theme.palette.page};
  transition: background 0.3s ease;

  .heroContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    min-height: calc(85vh - 100px);

    @media (max-width: 992px) {
      flex-direction: column;
      text-align: center;
      padding-top: 20px;
    }
  }

  .heroContent {
    flex: 1.2;
    direction: rtl;
    z-index: 2;

    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .heroBadge {
    display: inline-block;
    padding: 8px 18px;
    border-radius: 30px;
    background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.primary_light}55;
    color: ${({ theme }) => theme.palette.ColorApp.primary};
    font-size: 0.88rem;
    font-weight: 700;
    margin-bottom: 24px;
    box-shadow: 0 2px 10px ${({ theme }) => theme.palette.ColorApp.primary}15;
  }

  .heroTitle {
    font-size: 3.2rem;
    font-weight: 900;
    line-height: 1.25;
    color: ${({ theme }) => theme.palette.font};
    margin-bottom: 20px;
    letter-spacing: -0.5px;

    .highlight {
      background: linear-gradient(135deg, ${({ theme }) => theme.palette.ColorApp.primary} 0%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  .heroDescription {
    font-size: 1.12rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.palette.ColorApp.gray_600};
    margin-bottom: 34px;
    max-width: 580px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .heroActions {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 45px;

    @media (max-width: 576px) {
      flex-direction: column;
      width: 100%;
    }
  }

  .primaryCta {
    padding: 14px 34px;
    border-radius: 30px;
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
    background: ${({ theme }) => theme.palette.ColorApp.primary_gradient};
    border: none;
    cursor: pointer;
    box-shadow: 0 8px 24px ${({ theme }) => theme.palette.ColorApp.primary}44;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px ${({ theme }) => theme.palette.ColorApp.primary}66;
    }

    @media (max-width: 576px) {
      width: 100%;
      text-align: center;
    }
  }

  .secondaryCta {
    padding: 13px 28px;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.font};
    background: ${({ theme }) => theme.palette.main};
    border: 1.5px solid ${({ theme }) => theme.palette.ColorApp.gray_300};
    transition: all 0.25s ease;

    &:hover {
      border-color: ${({ theme }) => theme.palette.ColorApp.primary};
      color: ${({ theme }) => theme.palette.ColorApp.primary};
      transform: translateY(-2px);
    }

    @media (max-width: 576px) {
      width: 100%;
      text-align: center;
    }
  }

  .heroStats {
    display: flex;
    align-items: center;
    gap: 28px;
    padding-top: 24px;
    border-top: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};

    .statItem {
      h4 {
        font-size: 1.35rem;
        font-weight: 800;
        color: ${({ theme }) => theme.palette.ColorApp.primary};
        margin-bottom: 2px;
      }
      p {
        font-size: 0.82rem;
        color: ${({ theme }) => theme.palette.ColorApp.gray_500};
        font-weight: 500;
      }
    }

    .statDivider {
      width: 1px;
      height: 32px;
      background: ${({ theme }) => theme.palette.ColorApp.gray_300};
    }

    @media (max-width: 576px) {
      gap: 16px;
      justify-content: center;
    }
  }

  .heroVisual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .imageWrapper {
    position: relative;
    max-width: 440px;
    width: 100%;
    border-radius: 24px;
    background: ${({ theme }) => theme.palette.main};
    padding: 24px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
      max-height: 420px;
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.12));
      transition: transform 0.4s ease;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

  .floatingBadge {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 14px;
    background: ${({ theme }) => theme.palette.main}ee;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    direction: rtl;

    .badgeIcon {
      font-size: 1.5rem;
    }

    strong {
      display: block;
      font-size: 0.85rem;
      color: ${({ theme }) => theme.palette.font};
    }

    p {
      font-size: 0.72rem;
      color: ${({ theme }) => theme.palette.ColorApp.gray_500};
      margin: 0;
    }

    &.top {
      top: -15px;
      right: -15px;
      animation: floatBadge 3.5s ease-in-out infinite alternate;
    }

    &.bottom {
      bottom: -15px;
      left: -15px;
      animation: floatBadge 3.5s ease-in-out infinite alternate-reverse;
    }

    @media (max-width: 576px) {
      display: none;
    }
  }

  @keyframes floatBadge {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-8px);
    }
  }
`;