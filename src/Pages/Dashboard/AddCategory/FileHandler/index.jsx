import MyDropzone from "../../../../Components/Dropzone"; 
import { StyledFileUploaded } from "./styled"; 


const FileHandler = ({ image, setImage }) => { 
  const handleRemoveImage = () => {
    setImage('')
  }
  return (
    <StyledFileUploaded className='d-flex' style={{ padding: 5 }}> 
      <MyDropzone setImages={setImage} images={image}/>
      <div className="imageBox">
        {
          image &&
          <>
            <span className="remove" onClick={handleRemoveImage}>X</span>
            <img src={image} alt="" />
          </>
        }
      </div>
    </StyledFileUploaded>
  )
}

export default FileHandler