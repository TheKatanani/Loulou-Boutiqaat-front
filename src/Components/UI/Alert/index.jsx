import React from 'react'
import { StyledAlert, StyledLayout } from './styled'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setStatusIdle } from '../../../redux/reducers/users'
import { useNavigate } from 'react-router-dom'

const Alert = ({ text }) => {
  const [showAlert, setShowAlert] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  setTimeout(() => {
    setShowAlert(false)
    dispatch(setStatusIdle())
    navigate('/home')
  }, 5000);
  return (
    <>
      {
        showAlert &&
        <>
          <StyledAlert className="alert">{text}
          <span onClick={() => setShowAlert(false)}>x</span>
          </StyledAlert>
          <StyledLayout className="layout"></StyledLayout>
        </>
      }
    </>
  )
}

export default Alert