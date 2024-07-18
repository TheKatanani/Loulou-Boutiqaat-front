import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import heic2any from 'heic2any';
import Pica from 'pica';
import { StyledDropzone } from './styled';
import LogoLoading from '../common/LogoLoading';

const pica = Pica();

function MyDropzone({ images = [], setImages }) {
  const [isLoading, setIsLoading] = useState(false)

  const resizeImage = async (imageFile) => {
    const img = new Image();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        img.src = event.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800; // Maximum dimension for the resized image
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height *= maxDim / width;
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width *= maxDim / height;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        pica.resize(img, canvas)
          .then((result) => pica.toBlob(result, 'image/jpeg', 0.90))
          .then((blob) => {
            const resizedFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
            resolve(resizedFile);
          })
          .catch((error) => reject(error));
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(imageFile);
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const newImages = Array.isArray(images) ? [...images] : images.length ? [images] : []

    setIsLoading(true)
    for (const file of acceptedFiles) {
      let processedFile = file;

      if (file.type === 'image/heic') {
        try {
          const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
          processedFile = new File([convertedBlob], file.name.replace(/\.[^/.]+$/, ".jpeg"), {
            type: 'image/jpeg',
          });
        } catch (error) {
          console.error('Error converting HEIC to JPEG:', error);
          continue;
        }
      }

      try {
        const resizedFile = await resizeImage(processedFile);
        const reader = new FileReader();

        reader.onload = () => {
          newImages.unshift(reader.result);
          setImages(newImages)
          setIsLoading(false)
        };
        reader.readAsDataURL(resizedFile);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  }, [images, setImages]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });
  return (
    <>
      {
        isLoading && <LogoLoading />
      }
      <StyledDropzone className='dropzone' {...getRootProps()} >
        <input {...getInputProps()} />
        <p>Drag images here, or click to select images</p>
      </StyledDropzone>
    </>
  );
}

export default MyDropzone;
