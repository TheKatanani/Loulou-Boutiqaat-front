import React, { useState, useRef } from 'react'
import { ImageSliderStyled } from './styled'

const ImageSlider = ({ images = [] }) => {
  const [main, setMain] = useState(0)
  const startX = useRef(0)
  const isHorizontal = useRef(null)

  const list = Array.isArray(images) ? images : []
  const total = list.length

  const onTouchStart = (e) => {
    if (total <= 1) return
    startX.current = e.touches[0].clientX
    isHorizontal.current = null
  }

  const onTouchMove = (e) => {
    if (total <= 1) return
    const diffX = e.touches[0].clientX - startX.current
    if (Math.abs(diffX) > 10) {
      isHorizontal.current = true
    }
  }

  const onTouchEnd = (e) => {
    if (total <= 1 || !isHorizontal.current) return
    const diffX = e.changedTouches[0].clientX - startX.current
    if (diffX < -40 && main < total - 1) {
      setMain(prev => prev + 1)
    } else if (diffX > 40 && main > 0) {
      setMain(prev => prev - 1)
    }
    isHorizontal.current = null
  }

  return (
    <ImageSliderStyled selected={main}>
      <div 
        className="imageArea"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img src={list[main]} loading="lazy" alt="Product preview" />
      </div>
      <div className="images">
        {list.map((img, i) => (
          <img src={img} loading="lazy" id={i} key={i} onClick={() => setMain(i)} alt={`Thumbnail ${i + 1}`} />
        ))}
      </div>
    </ImageSliderStyled>
  )
}

export default ImageSlider