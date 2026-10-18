import React, { useState, useEffect, useRef } from 'react'
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
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const startX = useRef(0)
  const startY = useRef(0)
  const currentOffset = useRef(0)
  const isHorizontalSwipe = useRef(null)
  const didDrag = useRef(false)

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
  const hasMultiple = total > 1;

  useEffect(() => {
    setImgIndex(0);
    setDragOffset(0);
  }, [images]);

  const handlePrev = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (imgIndex > 0) {
      setImgIndex(prev => prev - 1);
    }
  };

  const handleNext = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (imgIndex < total - 1) {
      setImgIndex(prev => prev + 1);
    }
  };

  const handleDotClick = (e, idx) => {
    e.stopPropagation();
    e.preventDefault();
    setImgIndex(idx);
  };

  // Touch handlers for mobile swipe & drag
  const onTouchStart = (e) => {
    if (!hasMultiple) return;
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    currentOffset.current = 0;
    isHorizontalSwipe.current = null;
    didDrag.current = false;
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (!hasMultiple || !e.touches.length) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - startX.current;
    const diffY = touch.clientY - startY.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      if (e.cancelable) {
        e.preventDefault();
      }
      if (Math.abs(diffX) > 5) {
        didDrag.current = true;
      }

      // Rubber-band resistance at boundaries
      let offset = diffX;
      if ((imgIndex === 0 && diffX > 0) || (imgIndex === total - 1 && diffX < 0)) {
        offset = diffX * 0.25;
      }

      currentOffset.current = offset;
      setDragOffset(offset);
    }
  };

  const onTouchEnd = () => {
    if (!hasMultiple) return;
    setIsDragging(false);

    const threshold = 40;
    if (isHorizontalSwipe.current && Math.abs(currentOffset.current) > threshold) {
      if (currentOffset.current < -threshold && imgIndex < total - 1) {
        setImgIndex(prev => prev + 1);
      } else if (currentOffset.current > threshold && imgIndex > 0) {
        setImgIndex(prev => prev - 1);
      }
    }

    setDragOffset(0);
    currentOffset.current = 0;
    isHorizontalSwipe.current = null;

    setTimeout(() => {
      didDrag.current = false;
    }, 80);
  };

  // Mouse handlers for desktop dragging / testing
  const onMouseDown = (e) => {
    if (!hasMultiple || e.button !== 0) return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    currentOffset.current = 0;
    didDrag.current = false;
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (!isDragging || !hasMultiple) return;
    const diffX = e.clientX - startX.current;
    if (Math.abs(diffX) > 5) {
      didDrag.current = true;
    }

    let offset = diffX;
    if ((imgIndex === 0 && diffX > 0) || (imgIndex === total - 1 && diffX < 0)) {
      offset = diffX * 0.25;
    }

    currentOffset.current = offset;
    setDragOffset(offset);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 40;
    if (Math.abs(currentOffset.current) > threshold) {
      if (currentOffset.current < -threshold && imgIndex < total - 1) {
        setImgIndex(prev => prev + 1);
      } else if (currentOffset.current > threshold && imgIndex > 0) {
        setImgIndex(prev => prev - 1);
      }
    }

    setDragOffset(0);
    currentOffset.current = 0;

    setTimeout(() => {
      didDrag.current = false;
    }, 80);
  };

  return (
    <StyledImagesSliderCard 
      className={`imagesSlider ${className || ''}`} 
      isImages={total > 0}
      isDragging={isDragging}
      hasMultiple={hasMultiple}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClickCapture={(e) => {
        if (didDrag.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <div 
        className="sliderTrack"
        style={{ 
          transform: `translateX(calc(-${imgIndex * 100}% + ${dragOffset}px))`,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {total > 0 ? (
          imagesList.map((img, idx) => (
            <div key={idx} className="slideItem">
              <img 
                src={img} 
                loading="lazy" 
                alt={`Loulou product ${idx + 1}`}
                draggable={false}
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