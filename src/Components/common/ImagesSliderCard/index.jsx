import { StyledImagesSliderCard } from './styled'
import { useState } from 'react'
import { useEffect } from 'react'
import defaultImage from '../../../Images/defoultImage.jpg'
import ErrorBoundary from '../Errorboundary'
const ImagesSliderCard = ({ images, className, handleRemoveImage }) => {
  const [imgIndex, setImgIndex] = useState(images.length - 1)

  const [disaple, setDisaple] = useState({
    prev: true,
    next: false
  })
  useEffect(() => {
    if (imgIndex === 0) {
      if (images?.length <= 1) {
        setDisaple({ prev: true, next: true })
      }
      else {
        setDisaple({ prev: true, next: false })
      }
    } else if (imgIndex + 1 >= images?.length) {
      setDisaple({ prev: false, next: true })
    } else {
      setDisaple({ prev: false, next: false })
    }
    if (images?.length <= 0) {
      setDisaple({ prev: true, next: true })
    }
  }, [imgIndex, images, handleRemoveImage])
  useEffect(() => {
    setImgIndex(images.length - 1)
  }, [images])
  return (
    <ErrorBoundary>
      <StyledImagesSliderCard isImages={!!images.length} className={`imagesSlider ${className || ''}`}>
        <img src={images.length ? images?.[imgIndex] : defaultImage} className={images.length ? '' : 'defaultImage'} alt="loulou boutiqaat" />
        <button type='button' disabled={disaple.prev} className={`prevImg ${disaple.prev && 'disabled'}`} onClick={() => {
          setImgIndex(prev => {
            if (prev > 0) {
              return prev - 1
            }
          })
        }}>{"<"}</button>
        <button type='button' disabled={disaple.next} className={`nextImg ${disaple.next && 'disabled'}`} onClick={() => {
          setImgIndex(prev => {
            return prev + 1
          })
        }}>{">"}</button>
        <div className="dots">
          {
            images?.map((img, i) => (
              <span key={i} className={`imgDot ${imgIndex === i && `active`}`} onClick={() => {
                setImgIndex(i)
              }}></span>
            ))
          }
        </div>
        {
          handleRemoveImage && images.length &&
          <span className="remove" onClick={() => {
            handleRemoveImage(imgIndex)
            if (imgIndex === (images.length)) {
              setImgIndex(prev => {
                if (prev > 0) {
                  return prev - 1
                } else {
                  return 0
                }
              }
              )
            }
          }}>
            x
          </span>
        }
      </StyledImagesSliderCard>
    </ErrorBoundary>
  )
}

export default ImagesSliderCard