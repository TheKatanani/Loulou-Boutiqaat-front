import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px 0;
  direction: rtl;
`;

export const SkeletonCard = styled.div`
  background-color: ${(props) => props.theme.palette.main};
  border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
`;

const ShimmerBase = styled.div`
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.palette.ColorApp.gray_200} 25%,
    ${(props) => props.theme.palette.ColorApp.gray_300} 50%,
    ${(props) => props.theme.palette.ColorApp.gray_200} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s infinite linear;
  border-radius: 8px;
`;

export const SkeletonImage = styled(ShimmerBase)`
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;

export const SkeletonPrice = styled(ShimmerBase)`
  width: 35%;
  height: 24px;
`;

export const SkeletonTitle = styled(ShimmerBase)`
  width: 75%;
  height: 20px;
`;

export const SkeletonRating = styled(ShimmerBase)`
  width: 45%;
  height: 16px;
`;

export const SkeletonButton = styled(ShimmerBase)`
  width: 100%;
  height: 38px;
  margin-top: 10px;
`;
