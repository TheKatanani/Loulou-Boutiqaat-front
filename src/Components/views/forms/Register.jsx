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
import { selectSuccess } from '../../../redux/reducers/signup'

const Register = ({ setGender, isFromUserProfile, errors, status, showPasswordFunc, showPassword, formData, handleSubmit, handleInputChangeFunc, handleCheckBoxChangeFunc }) => {
  const { data: allowedPhones, isLoading, error } = useFetch(`${API2}/countryCode`)
  const user = useSelector(selectUser) 
  const success = useSelector(selectSuccess);
  const mood = useSelector(selectMood)
  const dispatch = useDispatch()
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
          <input type="radio" name="gender" id="male"
            onChange={() => {
              dispatch(setGender('male'))
            }}
            checked={formData.gender === 'male'}
          />
          male</label>
        <label htmlFor="male">
          <input type="radio" name="gender" id="female"
            onChange={() => dispatch(setGender('female'))}
            checked={formData.gender === 'female'}
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
      {
        // !(mood === MOOD.UPDATE && user?.role === ROLES.ADMIN) &&
        <>
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
        </>
      }
      <div className="d-flex">
        {
          user?.role === ROLES.ADMIN && (
            <>
              {errors?.role && <ErrorForm>{errors?.role}</ErrorForm>}
              <Select
                defualt={formData.roles || Object.keys(ROLES)[0] || 'USER'}
                label={"User Role"}
                id="role"
                value={formData.roles}
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
          label="Barth Day"
          value={formData.barthDay}
          onChange={handleInputChangeFunc}
        />{/* *********************** */}
      </div>
      {/* submit button */}
      <ButtonAnimation status={status}>
        {
          mood === MOOD.UPDATE ? "Update Now" : "Register Now"
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
      {success && <h3 style={{ color: 'green', fontWeight: 'bold' }}>{success}</h3>}
    </StyledRigisterForm>
  )
}

export default Register