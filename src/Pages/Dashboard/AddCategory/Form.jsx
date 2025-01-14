import Input from '../../../Components/Input/index.jsx'
import { Input as InputStyle, Label } from '../../../Components/Input/style.js'
import Select from '../../../Components/Select/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCategory, cancelUpdate, handleInputChangeReducer, selectPublishedCategoryies, selectCategoriesFormData, selectError, selectMood, selectStatus, setCategories, setStatusFailed, updateCategory } from '../../../redux/reducers/categories.js'
import { useEffect } from 'react'
import { MOOD } from '../../../Actions/index.js'
import FileHandler from './FileHandler'
import { StyledForm } from '../sytled.js'
import ButtonAnimation from '../../../Components/common/ButtonAnimation/index.jsx'
import ErrorForm from '../../../Components/ErrorForm/index.jsx'
import { validationSchema } from './validation.js'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet.js'
import { MainButton } from '../../../Global/components.js'
const Form = () => {
  const dispatch = useDispatch()
  const catitories = useSelector(selectPublishedCategoryies)
  const formData = useSelector(selectCategoriesFormData)
  const status = useSelector(selectStatus)
  const errors = useSelector(selectError);
  const mood = useSelector(selectMood)
  const axiosPrivate = useAxiosPrivate()
  const handleInputChange = (e) => {
    const {
      id,
      value
    } = e.target
    dispatch(handleInputChangeReducer({ id, value }))
  }
  const setImage = (value) => { 
    if (Array.isArray(value) && value.length) { 
      dispatch(handleInputChangeReducer({ id: 'background', value: value[0] }))
    } else{ 
      dispatch(handleInputChangeReducer({ id: 'background', value }))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (mood === MOOD.ADD) {
        dispatch(addNewCategory({ newcategory: formData, axiosPrivate })) 
      } else {
        dispatch(updateCategory({ category: formData, axiosPrivate })) 
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
        label="Category Name"
        value={formData.name}
      />
      {errors?.description && <ErrorForm>{errors?.description}</ErrorForm>}
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
        <Select id="published"
          value={formData.published} onChange={(e)=>{
            let {
              id,
              value
            } = e.target 
            value = value === 'true' 
            dispatch(handleInputChangeReducer({ id, value }))
          }}
          label={'published'}
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
      </div>
      {errors?.background && <ErrorForm>{errors?.background}</ErrorForm>}
      <FileHandler image={formData.background} setImage={setImage} />
      <ButtonAnimation status={status}>
        {
          mood === MOOD.ADD ? 'ADD' : 'UPDATE'
        }
      </ButtonAnimation>
      {
        mood === MOOD.UPDATE &&
        <MainButton className="cansel" onClick={() => {
          dispatch(cancelUpdate())
        }}>
          cancel
        </MainButton>
      }
      {errors?.isAxiosError &&
        <ErrorForm>{errors?.isAxiosError}</ErrorForm>
      }

    </StyledForm>
  )
}

export default Form