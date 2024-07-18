import React from 'react' 
import ImagesSliderCard from '../ImagesSliderCard';
import MyDropzone from '../../Dropzone';

const FileHandler = ({ images, setImages }) => { 
  const handleRemoveImage = (index) => {
    const temp = [...images]
    temp.splice(index, 1)
    setImages(temp)
  }
  return (
    <div className='d-flex' style={{ padding: 5 }}> 
      <MyDropzone images={images} setImages={setImages} />
      <ImagesSliderCard images={images} {...{ handleRemoveImage }} />
    </div>
  )
}

export default FileHandler