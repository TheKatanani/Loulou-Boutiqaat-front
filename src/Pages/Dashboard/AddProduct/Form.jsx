import Input from '../../../Components/Input/index.jsx'
import { Input as InputStyle, Label } from '../../../Components/Input/style.js'
import Select from '../../../Components/Select/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, setCategories } from '../../../redux/reducers/categories.js'
import FileHandler from '../../../Components/common/FileHandler/index.jsx'
import { useEffect } from 'react'
import { addNewProduct, cancelUpdate, handleInputChangeReducer, selectAddProductsState, selectError, selectMood, selectStatus, setStatusFailed, setStatusIdle, setStatusLoading, updateProduct } from '../../../redux/reducers/products.js'
import { MOOD } from '../../../Actions/index.js'
import { StyledForm } from '../sytled.js'
import ButtonAnimation from '../../../Components/common/ButtonAnimation/index.jsx'
import { validationSchema } from './validation.js'
import ErrorForm from '../../../Components/ErrorForm/index.jsx'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet.js'
import { MainButton } from '../../../Global/components.js' 

const Form = () => {
  const dispatch = useDispatch()
  const catitories = useSelector(selectCategories)
  const formData = useSelector(selectAddProductsState)
  const status = useSelector(selectStatus)
  const mood = useSelector(selectMood)
  const errors = useSelector(selectError);
  const axiosPrivate = useAxiosPrivate()
  const handleInputChange = (e) => {
    const {
      id,
      value
    } = e.target
    dispatch(handleInputChangeReducer({ id, value }))
  }
  const setImages = (value) => {
    dispatch(handleInputChangeReducer({ id: 'images', value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(setStatusLoading())
      await validationSchema.validate(formData, { abortEarly: false });
      if (mood === MOOD.ADD) {
        dispatch(addNewProduct({ newProduct: formData, axiosPrivate }))
      } else {
        dispatch(updateProduct({ product: formData, axiosPrivate }))
      }
    } catch (e) {
      const errors = e.inner?.reduce((acc, { path, message }) => {
        acc[path] = message;
        return acc;
      }, {});
      dispatch(setStatusFailed({ ...{ errors } }));
    }
  }
  useEffect(() => {
    dispatch(setCategories())
    dispatch(setStatusIdle())
  }, [dispatch])
  useEffect(() => {
    dispatch(handleInputChangeReducer({ id: 'categoryId', value: catitories?.[0]?.id }))
  }, [catitories, dispatch])
  return (
    <StyledForm onSubmit={handleSubmit}>
      {errors?.name && <ErrorForm>{errors?.name}</ErrorForm>}
      <Input
        onChange={handleInputChange}
        id="name"
        type="text"
        placeholder="Type here"
        label="Product Name"
        required
        value={formData.name}
      />
      {errors?.description && <ErrorForm>{errors?.description}</ErrorForm>}
      {/* this div to save the shape of the input as Input component */}
      <div className="input">
        <Label htmlFor='description'>description</Label>
        <InputStyle
          as='textarea'
          onChange={handleInputChange}
          id="description"
          type="text"
          placeholder="Type here"
          value={formData.description}
        />
      </div>
      <div className="d-flex">
        <div>
          {errors?.price && <ErrorForm>{errors?.price}</ErrorForm>}
          <Input
            id="price"
            type="number"
            placeholder="0.0"
            label='Price'
            required
            onChange={handleInputChange}
            value={formData.price}
          />
        </div>
        <div>
          {errors?.prevPrice && <ErrorForm>{errors?.prevPrice}</ErrorForm>}
          <Input
            id="prevPrice"
            type="number"
            placeholder="0.0"
            label='Privious Price'
            onChange={handleInputChange}
            value={formData.prevPrice}
          />
        </div> 
      </div>
      <div className="d-flex">
        <Select id="published"
          value={formData.published} onChange={handleInputChange}
          label={'publish'}
          options={[
            {
              value: true,
              label: 'publish'
            },
            {
              value: false,
              label: 'unpublish'
            }
          ]}
          defualt
        />
        <Select id="stars"
          value={formData.stars} onChange={handleInputChange}
          label={'stars'}
          options={[
            {
              value: '1',
              label: '1'
            },
            {
              value: '2',
              label: '2'
            },
            {
              value: '3',
              label: '3'
            },
            {
              value: '4',
              label: '4'
            },
            {
              value: '5',
              label: '5'
            },
          ]}
          defualt
        />
        <Select id="categoryId"
          value={formData.categoryId} onChange={handleInputChange}
          label={'category'}
          options={
            catitories?.map((category) => ({ 'value': category.id, 'label': category.name }))
          }
          defualt
        />
      </div>
      {errors?.images && <ErrorForm>{errors?.images}</ErrorForm>}
      <FileHandler images={formData?.images && typeof (formData.images) === 'string' ? JSON.parse(formData.images) : formData.images} setImages={setImages} />
        {/* <MyDropzone images={formData?.images &&( typeof (formData.images) === 'string' ? JSON.parse(formData.images) : formData.images)} setImages={setImages} />  */}
      <ButtonAnimation status={status}>
        {
          mood === MOOD.ADD ? 'ADD' : 'UPDATE'
        }
      </ButtonAnimation>
      {
        mood === MOOD.UPDATE &&
        <MainButton style={{marginTop:2}} onClick={() => {
          dispatch(cancelUpdate())
        }}>
          cancel
        </MainButton>
      }
      {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
    </StyledForm>
  )
}
export default Form