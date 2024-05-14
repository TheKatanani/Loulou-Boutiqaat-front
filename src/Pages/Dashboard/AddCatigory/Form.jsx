import Input from '../../../Components/Input/index.jsx'
import { Input as InputStyle, Label } from '../../../Components/Input/style.js'
import Select from '../../../Components/Select/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCatigory, clearError, handleInputChangeReducer, resitCatigory, selectCatigories, selectCatigoriesState, selectError, selectMood, selectStatus, setCatigories, setStatusFailed, setStatusLoading, updateCatigory } from '../../../redux/reducers/catigories.js'
import { useEffect } from 'react'
import { MOOD } from '../../../Actions/index.js'
import FileHandler from './FileHandler'
import { StyledForm } from '../sytled.js'
import ButtonAnimation from '../../../Components/common/ButtonAnimation/index.jsx'
import ErrorForm from '../../../Components/ErrorForm/index.jsx'
import { validationSchema } from './validation.js'
const Form = () => {
  const dispatch = useDispatch()
  const catitories = useSelector(selectCatigories)
  const formData = useSelector(selectCatigoriesState)
  const status = useSelector(selectStatus)
  const errors = useSelector(selectError);
  const mood = useSelector(selectMood)
  const handleInputChange = (e) => {
    const {
      id,
      value
    } = e.target
    dispatch(handleInputChangeReducer({ id, value }))
  }
  const setImage = (value) => {
    dispatch(handleInputChangeReducer({ id: 'background', value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(setStatusLoading(true));
      dispatch(clearError());
      await validationSchema.validate(formData, { abortEarly: false });
      if (mood === MOOD.ADD) {
        dispatch(addNewCatigory({ newCatigory: formData }))
        dispatch(resitCatigory())
      } else {
        dispatch(updateCatigory({ catigory: formData }))
        dispatch(resitCatigory())
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
        value={formData.name}
      />
      {errors?.discription && <ErrorForm>{errors?.discription}</ErrorForm>}
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
        <Select id="isVisibile"
          value={formData.isVisibile} onChange={handleInputChange}
          label={'isVisibile'}
          options={[
            {
              value: true,
              label: 'visibile'
            },
            {
              value: false,
              label: 'hidden'
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
      {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}

    </StyledForm>
  )
}

export default Form