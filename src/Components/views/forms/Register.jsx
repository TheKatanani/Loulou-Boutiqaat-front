import React, { useEffect } from 'react'
import Input from '../../Input'
import ErrorForm from '../../ErrorForm'
import useFetch from '../../../Hook/useFetch'
import Select from '../../Select'
import { useDispatch, useSelector } from 'react-redux'
import { MainButton } from '../../../Global/components'
import Checkbox from '../../Checkbox'
import { API } from '../../../API'
import LogoLoading from '../../common/LogoLoading'
import { StyledRigisterForm } from './styled'
import { handleInputChangeReducer, reSetUser, selectMood, setGendar } from '../../../redux/reducers/users'
import { MOOD, ROLES } from '../../../Actions'
import PasswordInput from '../../common/PasswordInput'
import { selectUser } from '../../../redux/reducers/auth'
import { Link } from 'react-router-dom'
import ButtonAnimation from '../../common/ButtonAnimation'

const Register = ({ isFromUserProfile, errors, status, showPasswordFunc, showPassword, formData, handleSubmit, handleInputChangeFunc, handleCheckBoxChangeFunc }) => {
  const { data: allowedPhones, isLoading, error } = useFetch(`${API}/allowedPhones`)
  const user = useSelector(selectUser)
  const mood = useSelector(selectMood)
  const dispatch = useDispatch()
  useEffect(() => {
    if (mood === MOOD.UPDATE) {
      // to dont fill the new password input in the old value
      dispatch(handleInputChangeReducer({ id: "password", value: '' }))
      // dispatch(handleInputChangeReducer({ id: "confirmPassword", value: formData.password }))
    }
  }, [formData.id])
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
        placeholder="Type here"
        label="User Name"
        value={formData.name}
      />
      {/* *************************** */}
      {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
      <div className="phone">
        <label htmlFor="Phone">Phone</label>
        <div>
          <Select
            defualt={allowedPhones[0].value}
            id="selectPhone"
            value={formData.selectPhone}
            onChange={handleInputChangeFunc}
            options={allowedPhones}
          />
          <Input
            onChange={handleInputChangeFunc}
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
          <input type="radio" name="gendar" id="male"
            onChange={(e) => {
              dispatch(setGendar('male'))
            }}
            checked={formData.gendar === 'male'}
          />
          male</label>
        <label htmlFor="male">
          <input type="radio" name="gendar" id="female"
            onChange={() => dispatch(setGendar('female'))}
            checked={formData.gendar === 'female'}
          />
          female</label>
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

      {errors?.password && <ErrorForm>{errors?.password}</ErrorForm>}
      <Input
        onChange={handleInputChangeFunc}
        id="password"
        type="Password"
        placeholder="Type here"
        label="Password"
        value={formData.password}
      />

      {errors?.confirmPassword && <ErrorForm>{errors?.confirmPassword}</ErrorForm>}
      <Input
        onChange={handleInputChangeFunc}
        id="confirmPassword"
        type="Password"
        placeholder="Type here"
        label="Repeat password"
        value={formData.confirmPassword}
      />
      <div className="d-flex">
        {
          user.role === ROLES.MANAGER && (
            <>
              {errors?.role && <ErrorForm>{errors?.role}</ErrorForm>}
              <Select
                defualt={"user"}
                id="role"
                value={formData.role}
                onChange={handleInputChangeFunc}
                options={
                  [
                    { value: 'user', label: 'user' },
                    { value: 'admin', label: 'admin' },
                    { value: 'manager', label: 'manager' }
                  ]
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
          value={formData.barthDay}
          onChange={handleInputChangeFunc}
        />{/* *********************** */}
      </div>
      <ButtonAnimation status={status}>
        {
          mood === MOOD.UPDATE ? "Update Now" : "Register Now"
        }
      </ButtonAnimation>
      {
        mood === MOOD.UPDATE && isFromUserProfile ?
          <Link to={'/home/profile'}>
            <MainButton type='button'>cansel</MainButton>
          </Link>
          :
          <MainButton type='button' onClick={() => {
            dispatch(reSetUser())
          }}>cansel</MainButton>
      }
      {errors?.agree && <ErrorForm>{errors?.agree}</ErrorForm>}
      <Checkbox checked={formData.agree} id="agree" label="I agree with " primary="Terms and Conditions" onChange={handleCheckBoxChangeFunc} />
      {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
    </StyledRigisterForm>
  )
}

export default Register