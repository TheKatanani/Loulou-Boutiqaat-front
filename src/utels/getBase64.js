// there a problem the function return value then the onload work
export function getBase64(file) {
  let document;
  let loaded = false;
  let render = new FileReader()
  render.readAsDataURL(file)
   render.onload = (ev) => {
    document =  render.result;   
  }
  render.onerror = (error) => {
    console.log(error)
  } 
  console.log('global',document)
  if(loaded){
    return document
  }
}