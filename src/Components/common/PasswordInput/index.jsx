import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input } from '../../Input/style'
import { StyledPasswordInput } from './styled'

const PasswordInput = ({ showPassword, showPasswordFunc, onToggle, handleInputChange, id, value, label, hideForgot = false }) => {
  const dispatch = useDispatch() 
  return (
    <StyledPasswordInput>
      <div className="passwordHeader">
        <label htmlFor={id}>{label}</label>
        {!hideForgot && id === 'password' && (
          <Link to="/forgotPassword" className='forgotPassword'>نسيت كلمة المرور؟</Link>
        )}
      </div>
      <div className="inputWrapper">
        <Input
          onChange={handleInputChange}
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={value || ''}
        />
        <span 
          className="toggleVisibility" 
          onClick={() => {
            if (onToggle) {
              onToggle()
            } else if (showPasswordFunc) {
              dispatch(showPasswordFunc())
            }
          }}
          title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </span>
      </div>
    </StyledPasswordInput>
  )
}

export default PasswordInput