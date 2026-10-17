import React from 'react';
import {
  SkeletonGrid,
  SkeletonCard,
  SkeletonImage,
  SkeletonPrice,
  SkeletonTitle,
  SkeletonRating,
  SkeletonButton
} from './styled';

const ProductSkeleton = ({ count = 6 }) => {
  const items = Array.from({ length: count });

  return (
    <SkeletonGrid>
      {items.map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonImage />
          <SkeletonPrice />
          <SkeletonRating />
          <SkeletonTitle />
          <SkeletonButton />
        </SkeletonCard>
      ))}
    </SkeletonGrid>
  );
};

export default ProductSkeleton;
