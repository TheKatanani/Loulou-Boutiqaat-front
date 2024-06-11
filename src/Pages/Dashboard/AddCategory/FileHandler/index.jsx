import Input from "../../../../Components/Input";
import { StyledFileUploaded } from "./styled";



const FileHandler = ({ image, setImage }) => {
  const handleFileChange = async (e) => {
    const { files } = e.target;
    const selectedFile = files?.[0];
    if (selectedFile) {
      let render = new FileReader()
      render.readAsDataURL(selectedFile)
      render.onload = () => {
        setImage(render.result);
      }
      render.onerror = (error) => {
        console.log(error)
      }
      // setImage( URL.createObjectURL(selectedFile)); 
    }
  };
  const handleRemoveImage = () => {
    setImage('')
  }
  return (
    <StyledFileUploaded className='d-flex' style={{ padding: 5 }}>
      <Input
        id="images"
        type="file"
        placeholder="0.0"
        label='images'
        onChange={handleFileChange}
        accept="image/*"
      />
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