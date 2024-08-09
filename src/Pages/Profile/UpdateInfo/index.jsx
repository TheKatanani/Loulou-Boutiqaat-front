import { useDispatch, useSelector } from "react-redux"
import Name from "./Name"
import { selectError, selectStatus, setError, setStatusIdle, updateUserInfo } from "../../../redux/reducers/users"
import ErrorForm from "../../../Components/ErrorForm"
import Phone from "./Phone"
import Input from "../../../Components/Input"
import { StyledUpdateUserInfo } from "../styled"
import { Container } from "../../../Global/components"
import ButtonAnimation from "../../../Components/common/ButtonAnimation"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useAxiosPrivate from "../../../Hook/useAxiosPrivet"
import Password from "./Password"
import BarthDay from "./BerthDay"
import Gender from "./Gender"
import { STATUS } from "../../../Actions"
import { selectUser, setUser } from "../../../redux/reducers/auth"
import useRefreshToken from "../../../Hook/useRefreshToken"

const UpdateUserInfo = () => {
  // for the id use paramse insted and edit the router for that
  const { id } = useParams()
  const user = useSelector(selectUser)
  const status = useSelector(selectStatus)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [input, setInput] = useState(user?.[id])
  const navigate = useNavigate()
  const refresh = useRefreshToken()
  const errors = useSelector(selectError)
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    // check the password if correct here, put the better in the backend 
    if (password.trim().length >= 6) {
      if (id === "password") {
        if (newPassword === confirmPassword) {
          setInput(newPassword)
        } else {
          dispatch(setError({ errors: { confirmPassword: 'the confirm password does not match the new password' } }))
          return null;
        }
      }
      dispatch(updateUserInfo({
        user: {
          [id]: input
        },
        password,
        axiosPrivate
      }))
    } else {
      dispatch(setError({ password: 'the password must be more than 6 characters' }))
    }
  }

  useEffect(() => {
    if (status === STATUS.SUCCEEDED) {
      alert(`the ${id} updated successfolly`)
      // set the new changes in the auth slice
      if (id !== password) {
        const newUserInfo = {
          [id]: input
        }
        dispatch(setUser({ ...user, ...newUserInfo }))
      }
      navigate('/home/profile')
    }
  }, [status, navigate, id, refresh, dispatch, input, password, user])
  useEffect(() => {
    dispatch(setStatusIdle())
  }, [dispatch, status])

  return (
    <Container>
      <StyledUpdateUserInfo>
        <form onSubmit={handleSubmit}>
          {errors?.password && <ErrorForm>{errors?.password}</ErrorForm>}
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="Password"
            placeholder="Type here"
            label="Password"
            value={password}
          />
          {errors?.[id] && <ErrorForm>{errors[id]}</ErrorForm>}
          {
            id === "name" &&
            <Name {...{ id, setInput, input, errors }} />
          }
          {
            id === "phone" &&
            <Phone {...{ setInput, errors }} />
          }
          {
            id === "password" &&
            <Password {...{ confirmPassword, errors, newPassword, setConfirmPassword, setNewPassword }} />
          }
          {
            id === "barthDay" &&
            <BarthDay {...{ errors, input, setInput }} />
          }
          {
            id === "gender" &&
            <Gender {...{ errors, input, setInput }} />
          }
          <ButtonAnimation status={status}>
            UPDATE
          </ButtonAnimation>

          {errors?.message && <ErrorForm>{errors?.message}</ErrorForm>}

        </form>
      </StyledUpdateUserInfo>
    </Container>
  )
}

export default UpdateUserInfo