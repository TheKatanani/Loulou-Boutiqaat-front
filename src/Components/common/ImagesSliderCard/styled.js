import styled from "styled-components";

export const StyledImagesSliderCard = styled.div`
  direction: ltr;
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px 14px 0 0;
  background-color: ${({theme}) => theme.palette.main};

  &.cart {
    height: 110px;
    border-radius: 10px;
  }

  .sliderTrack {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }

  .slideItem {
    min-width: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 10px;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 8px;
      transition: transform 0.35s ease;

      &.defaultImage {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  /* Nav buttons */
  .sliderNavBtn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: ${({theme}) => theme.palette.ColorApp.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    opacity: 0.85;

    svg {
      width: 18px;
      height: 18px;
      stroke: ${({theme}) => theme.palette.ColorApp.primary};
      transition: transform 0.2s ease;
    }

    &:hover:not(:disabled) {
      opacity: 1;
      transform: translateY(-50%) scale(1.12);
      background: #ffffff;
      box-shadow: 0 6px 18px rgba(109, 40, 217, 0.25);
      svg {
        stroke: #4c1d95;
      }
    }

    &.prevImg {
      left: 10px;
      &:hover:not(:disabled) svg {
        transform: translateX(-2px);
      }
    }

    &.nextImg {
      right: 10px;
      &:hover:not(:disabled) svg {
        transform: translateX(2px);
      }
    }

    &:disabled,
    &.disabled {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-50%) scale(0.7);
    }
  }

  &.cart {
    .sliderNavBtn {
      width: 26px;
      height: 26px;
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  /* Dots Indicators */
  .dots {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    background: rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(4px);
    padding: 4px 8px;
    border-radius: 12px;

    .imgDot {
      width: 6px;
      height: 6px;
      background-color: rgba(255, 255, 255, 0.65);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        background-color: #ffffff;
      }

      &.active {
        width: 18px;
        border-radius: 6px;
        background: ${({theme}) => theme.palette.ColorApp.primary_gradient};
        box-shadow: 0 2px 6px rgba(109, 40, 217, 0.4);
      }
    }
  }

  .remove {
    position: absolute;
    right: 8px;
    top: 8px;
    background: rgba(239, 68, 68, 0.9);
    color: #ffffff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 6;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.15);
      background: #dc2626;
    }
  }
`;