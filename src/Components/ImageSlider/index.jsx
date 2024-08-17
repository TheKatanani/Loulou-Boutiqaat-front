import React, { useState } from 'react'
import { ImageSliderStyled } from './styled'
const ImageSlider = ({images}) => {
    const [main,setMain]=useState(0)
  return (
    <ImageSliderStyled selected={main}>
        <div className="imageArea">
            <img src={images[main]} loading="lazy" alt="Main image slider" />
        </div>
        <div className="images">
            {images.map((img,i)=>(
                <img src={img} loading="lazy" id={i} key={i} onClick={()=>setMain(i)} alt={`img slider ${i}`} />
            ))}
        </div>
    </ImageSliderStyled>
  )
}

export default ImageSlider