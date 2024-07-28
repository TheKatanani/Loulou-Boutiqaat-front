import React from 'react'
import { useDispatch } from 'react-redux'
import logInPassword from '../../../Images/VectorpasswordIcon.png'
import { Link } from 'react-router-dom'
import Input from '../../Input'
import { StyledPasswordInput } from './styled'

const PasswordInput = ({ showPassword,showPasswordFunc, handleInputChange, id, value, label }) => {
  const dispatch = useDispatch() 
  return (
    <StyledPasswordInput className={`logInPassword ${showPassword ? 'text' : 'password'}`}>
      <span>
        <img src={logInPassword} alt="" onClick={() => {
          dispatch(showPasswordFunc())
        }} />
      </span>
      <Link to="/forgotPassword" className='forgotPassword'>Forgot Password</Link>
      <Input
        onChange={handleInputChange}
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder="Type here"
        label={label}
        value={value}
      />
    </StyledPasswordInput>
  )
}

export default PasswordInput