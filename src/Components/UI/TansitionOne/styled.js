import styled from "styled-components";

export const StyledTransactionOne = styled.section`
  padding: 50px 0 20px 0;
  direction: rtl;

  .sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;

    .titleBox {
      .badge {
        display: inline-block;
        font-size: 0.8rem;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.ColorApp.primary};
        background: ${({ theme }) => theme.palette.ColorApp.primary_soft};
        padding: 4px 12px;
        border-radius: 20px;
        margin-bottom: 8px;
        border: 1px solid ${({ theme }) => theme.palette.ColorApp.primary_light}33;
      }

      h2 {
        font-size: 2rem;
        font-weight: 800;
        color: ${({ theme }) => theme.palette.font};
        margin: 0;
      }
    }

    .allCategoriesLink {
      font-size: 0.95rem;
      font-weight: 700;
      color: ${({ theme }) => theme.palette.ColorApp.primary};
      transition: all 0.2s ease;

      &:hover {
        transform: translateX(-4px);
        color: ${({ theme }) => theme.palette.ColorApp.primary_light};
      }
    }
  }

  .categoryShowcaseGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;

    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }
`;

export const StyledCard = styled.div`
  position: relative;
  height: 270px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 22px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.palette.ColorApp.gray_200};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .cardOverlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(15, 23, 42, 0.88) 100%);
    transition: opacity 0.3s ease;
  }

  .cardContent {
    position: relative;
    z-index: 2;
    direction: rtl;

    .categoryPill {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 700;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      padding: 3px 10px;
      border-radius: 20px;
      margin-bottom: 8px;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 10px;
      line-height: 1.4;
    }

    .discoverLink {
      font-size: 0.86rem;
      font-weight: 700;
      color: #facc15;
      transition: transform 0.2s ease;
      display: inline-block;
    }
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.16);

    img {
      transform: scale(1.08);
    }

    .discoverLink {
      transform: translateX(-4px);
    }
  }

  @media (max-width: 576px) {
    height: 220px;
    padding: 14px;

    .cardContent {
      h3 {
        font-size: 1.05rem;
      }
      p {
        display: none;
      }
    }
  }
`;