import React, { useState } from 'react'
import { ImageSliderStyled } from './styled'
const ImageSlider = ({images}) => {
    const [main,setMain]=useState(0)
  return (
    <ImageSliderStyled selected={main}>
        <div className="imageArea">
            <img src={images[main]} alt="" />
        </div>
        <div className="images">
            {images.map((img,i)=>(
                <img src={img} id={i} key={i} onClick={()=>setMain(i)} alt="" />
            ))}
        </div>
    </ImageSliderStyled>
  )
}

export default ImageSlider