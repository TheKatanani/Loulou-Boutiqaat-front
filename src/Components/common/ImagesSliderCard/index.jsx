import React, { useState, useEffect } from 'react'
import { StyledImagesSliderCard } from './styled'

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ImagesSliderCard = ({ images, className, handleRemoveImage }) => {
  const [imgIndex, setImgIndex] = useState(0)

  // Safely parse images
  let imagesList = [];
  try {
    if (Array.isArray(images)) {
      imagesList = images;
    } else if (typeof images === 'string') {
      if (images.startsWith('[') || images.startsWith('{')) {
        imagesList = JSON.parse(images);
      } else {
        imagesList = [images];
      }
    }
  } catch (e) {
    imagesList = images ? [images] : [];
  }

  if (!Array.isArray(imagesList)) {
    imagesList = [];
  }

  const total = imagesList.length;

  useEffect(() => {
    setImgIndex(0);
  }, [images]);

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (imgIndex > 0) {
      setImgIndex(prev => prev - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (imgIndex < total - 1) {
      setImgIndex(prev => prev + 1);
    }
  };

  const handleDotClick = (e, idx) => {
    e.stopPropagation();
    e.preventDefault();
    setImgIndex(idx);
  };

  const hasMultiple = total > 1;

  return (
    <StyledImagesSliderCard 
      className={`imagesSlider ${className || ''}`} 
      isImages={total > 0}
    >
      <div 
        className="sliderTrack"
        style={{ transform: `translateX(-${imgIndex * 100}%)` }}
      >
        {total > 0 ? (
          imagesList.map((img, idx) => (
            <div key={idx} className="slideItem">
              <img 
                src={img} 
                loading="lazy" 
                alt={`Loulou product ${idx + 1}`} 
              />
            </div>
          ))
        ) : (
          <div className="slideItem">
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>لا توجد صورة</div>
          </div>
        )}
      </div>

      {hasMultiple && (
        <>
          <button 
            type="button" 
            className="sliderNavBtn prevImg"
            disabled={imgIndex === 0}
            onClick={handlePrev}
            title="الصورة السابقة"
          >
            <ChevronLeft />
          </button>

          <button 
            type="button" 
            className="sliderNavBtn nextImg"
            disabled={imgIndex >= total - 1}
            onClick={handleNext}
            title="الصورة التالية"
          >
            <ChevronRight />
          </button>

          <div className="dots">
            {imagesList.map((_, i) => (
              <span 
                key={i} 
                className={`imgDot ${imgIndex === i ? 'active' : ''}`}
                onClick={(e) => handleDotClick(e, i)}
                title={`صورة ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {handleRemoveImage && total > 0 && (
        <span 
          className="remove" 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleRemoveImage(imgIndex);
            if (imgIndex >= total - 1 && imgIndex > 0) {
              setImgIndex(prev => prev - 1);
            }
          }}
          title="حذف الصورة"
        >
          ✕
        </span>
      )}
    </StyledImagesSliderCard>
  );
};

export default ImagesSliderCard;