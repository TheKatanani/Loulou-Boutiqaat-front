import React from 'react'
import Input from '../../Input'
import ImagesSliderCard from '../ImagesSliderCard'; 

const FileHandler = ({ images, setImages }) => {
  const handleFileChange = async (e) => {
    const { files } = e.target;
    const selectedFile = files?.[0];
    if (selectedFile) {
      let render = new FileReader()
      render.readAsDataURL(selectedFile)
      render.onload = () => {
        setImages([...images, render.result]);
      }
      render.onerror = (error) => {
        console.log(error)
      }
    }
  };
  const handleRemoveImage = (index) => { 
    const temp = [...images]
    temp.splice(index,1)  
    setImages(temp)
  }
  return (
    <div className='d-flex' style={{ padding: 5 }}>
      <Input
        id="images"
        type="file"
        placeholder="0.0"
        label='images'
        onChange={handleFileChange}
        accept="image/*"
      />
      <ImagesSliderCard images={images} {...{ handleRemoveImage }} />
    </div>
  )
}

export default FileHandler