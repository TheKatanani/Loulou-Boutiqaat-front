import Input from '../../../Components/Input/index.jsx'
import { Input as InputStyle, Label } from '../../../Components/Input/style.js'
import Select from '../../../Components/Select/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectCatigories, setCatigories } from '../../../redux/reducers/catigories.js'
import FileHandler from '../../../Components/common/FileHandler/index.jsx'
import { useEffect } from 'react'
import { addNewProduct, handleInputChangeReducer, resitProduct, selectAddProductsState, selectError, selectMood, selectStatus, setStatusFailed, setStatusIdle, setStatusLoading, updateProduct } from '../../../redux/reducers/products.js'
import { MOOD } from '../../../Actions/index.js'
import { StyledForm } from '../sytled.js'
import ButtonAnimation from '../../../Components/common/ButtonAnimation/index.jsx'
import { validationSchema } from './validation.js'
import ErrorForm from '../../../Components/ErrorForm/index.jsx'

const Form = () => {
  const dispatch = useDispatch()
  const catitories = useSelector(selectCatigories)
  const formData = useSelector(selectAddProductsState)
  const status = useSelector(selectStatus)
  const mood = useSelector(selectMood)
  const errors = useSelector(selectError);

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
        dispatch(addNewProduct({ newProduct: formData }))
        dispatch(resitProduct())
      } else {
        dispatch(updateProduct({ product: formData }))
        dispatch(resitProduct())
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
    dispatch(setCatigories())
    dispatch(setStatusIdle())
  }, [dispatch])
  useEffect(() => {
    dispatch(handleInputChangeReducer({ id: 'catigoryId', value: catitories?.[0]?.id }))
  }, [catitories, dispatch])
  return (
    <StyledForm onSubmit={handleSubmit}>
      {errors?.name && <ErrorForm>{errors?.name}</ErrorForm>}
      <Input
        onChange={handleInputChange}
        id="name"
        type="text"
        placeholder="Type here"
        label="User Name"
        required
        value={formData.name}
      />
      {errors?.discription && <ErrorForm>{errors?.discription}</ErrorForm>}
      {/* this div to save the shape of the input as Input component */}
      <div className="input">
        <Label htmlFor='discription'>discription</Label>
        <InputStyle
          as='textarea'
          onChange={handleInputChange}
          id="discription"
          type="text"
          placeholder="Type here"
          value={formData.discription}
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
          {errors?.previousPrice && <ErrorForm>{errors?.previousPrice}</ErrorForm>}
          <Input
            id="previousPrice"
            type="number"
            placeholder="0.0"
            label='Privious Price'
            onChange={handleInputChange}
            value={formData.previousPrice}
          />
        </div>
        <div>
          {errors?.count && <ErrorForm>{errors?.count}</ErrorForm>}
          <Input
            id="count"
            type="number"
            placeholder="0.0"
            label='Count'
            onChange={handleInputChange}
            value={formData.count}
          />
        </div>
      </div>
      <div className="d-flex">
        <Select id="isVisibile"
          value={formData.isVisibile} onChange={handleInputChange}
          label={'isVisibile'}
          options={[
            {
              value: 1,
              label: 'visibile'
            },
            {
              value: 0,
              label: 'hidden'
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
        <Select id="catigoryId"
          value={formData.catigoryId} onChange={handleInputChange}
          label={'catigory'}
          options={
            catitories?.map((catigory) => ({ 'value': catigory.id, 'label': catigory.name }))
          }
          defualt
        />
      </div>
      {errors?.images && <ErrorForm>{errors?.images}</ErrorForm>} 
      <FileHandler images={formData.images} setImages={setImages} />
      <ButtonAnimation status={status}>
        {
          mood === MOOD.ADD ? 'ADD' : 'UPDATE'
        }
      </ButtonAnimation>
      {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
    </StyledForm>
  )
}

export default Form