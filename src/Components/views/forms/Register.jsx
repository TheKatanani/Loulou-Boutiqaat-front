import React, { useEffect } from 'react'
import Input from '../../Input'
import ErrorForm from '../../ErrorForm'
import useFetch from '../../../Hook/useFetch'
import Select from '../../Select'
import { useDispatch, useSelector } from 'react-redux'
import { MainButton } from '../../../Global/components' 
import { API2 } from '../../../API'
import LogoLoading from '../../common/LogoLoading'
import { StyledRigisterForm } from './styled'
import { handleInputChangeReducer, reSetUser, selectMood } from '../../../redux/reducers/users'
import { MOOD, ROLES } from '../../../Actions'
import PasswordInput from '../../common/PasswordInput'
import { selectUser } from '../../../redux/reducers/auth'
import { Link } from 'react-router-dom'
import ButtonAnimation from '../../common/ButtonAnimation'

const Register = ({ setGender, isFromUserProfile, errors, status, showPasswordFunc, showPassword, formData, handleSubmit, handleInputChangeFunc }) => {
  const { data: allowedPhones, isLoading, error } = useFetch(`${API2}/countryCode`)
  const user = useSelector(selectUser)  
  const mood = useSelector(selectMood)
  const dispatch = useDispatch()
  const handleInputChange = ({id,value,event})=>{  
    event.target.value = value
    event.target.id = id 
    return handleInputChangeFunc(event)
  }
  useEffect(() => {
    if (mood === MOOD.UPDATE) {
      // to dont fill the new password input in hash password
      dispatch(handleInputChangeReducer({ id: "password", value: '' }))
    }
  }, [formData.id, dispatch, mood])
  if (isLoading) {
    return <LogoLoading />
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <StyledRigisterForm onSubmit={handleSubmit}>
      {errors?.name && <ErrorForm>{errors?.name}</ErrorForm>}
      <Input
        onChange={handleInputChangeFunc}
        id="name"
        type="text"
        placeholder="اكتب هنا"
        label="اسم المستخدم"
        value={formData.name}
      />
      {/* *************************** */}
      {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
      <div className="phone">
        <label htmlFor="Phone">رقم الجوال</label>
        <div>
          <Select
            defualt={allowedPhones[0].value}
            id="selectPhone"
            value={formData.selectPhone}
            onChange={handleInputChangeFunc}
            options={allowedPhones}
          />
          <Input
              onChange={(e)=>{
                dispatch(handleInputChange({ id: 'phone', value: (e.target.value?.trim()),event:e }))
            }}
            id="phone"
            type="text"
            placeholder="00-000-00-00"
            value={formData.phone}
          />
        </div>
      </div>
      {errors?.gender && <ErrorForm>{errors?.gender}</ErrorForm>}
      <div className="gender">
        <label htmlFor="male">
          <input type="radio" name="gender" id="male"
            onChange={() => {
              dispatch(setGender('male'))
            }}
            checked={formData.gender === 'male'}
          />
          ذكر</label>
        <label htmlFor="male">
          <input type="radio" name="gender" id="female"
            onChange={() => dispatch(setGender('female'))}
            checked={formData.gender === 'female'}
          />
          انثى</label>
      </div>
      {
        user.role === ROLES.USER &&
        (
          <>
            {errors?.currentPassword && <ErrorForm>{errors?.currentPassword}</ErrorForm>}
            <PasswordInput handleInputChange={handleInputChangeFunc} showPasswordFunc={showPasswordFunc} id={"currentPassword"} label={"Current Password"} value={formData?.currentPassword} showPassword={showPassword} />
          </>
        )
      }
      {
        // !(mood === MOOD.UPDATE && user?.role === ROLES.ADMIN) &&
        <>
          {errors?.password && <ErrorForm>{errors?.password}</ErrorForm>}
          <Input
            onChange={handleInputChangeFunc}
            id="password"
            type="Password"
            placeholder="اكتب هنا"
            label="كلمة المرور"
            value={formData.password}
          />

          {errors?.confirmPassword && <ErrorForm>{errors?.confirmPassword}</ErrorForm>}
          <Input
            onChange={handleInputChangeFunc}
            id="confirmPassword"
            type="Password"
            placeholder="اكتب هنا"
            label="تاكيد كلمة المرور"
            value={formData.confirmPassword}
          />
        </>
      }
      <div className="d-flex">
        {
          user?.role === ROLES.ADMIN && (
            <>
              {errors?.role && <ErrorForm>{errors?.role}</ErrorForm>}
              <Select
                defualt={formData.role || Object.keys(ROLES)[0] || 'USER'}
                label={"User Role"}
                id="role"
                value={formData.role}
                onChange={handleInputChangeFunc}
                options={
                  Object.keys(ROLES).map(key => ({ value: key, label: key.toLowerCase() }))//return the role in dynamic way
                }
              />
            </>
          )
        }

        {errors?.barthDay && <ErrorForm>{errors?.barthDay}</ErrorForm>}
        <Input
          type="date"
          name="barthDay"
          id="barthDay"
          label="تاريخ الميلاد"
          value={formData.barthDay}
          onChange={handleInputChangeFunc}
        />{/* *********************** */}
      </div>
      {/* submit button */}
      <ButtonAnimation status={status}>
        {
          mood === MOOD.UPDATE ? "Update Now" : "انشاء"
        }
      </ButtonAnimation>
      {
        mood === MOOD.UPDATE && (isFromUserProfile
          ?
          <Link to={'/home/profile'}>
            <MainButton type='button'>cansel</MainButton>
          </Link>
          :
          <MainButton type='button' className="cansel" onClick={() => {
            dispatch(reSetUser())
          }}>cansel</MainButton>)
      }
      {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
      {errors?.message && <ErrorForm>{errors?.message}</ErrorForm>}
      {/* correct these */}
      {/* {errors?.message && <ErrorForm>{errors?.message}</ErrorForm>} */} 
    </StyledRigisterForm>
  )
}

export default Register