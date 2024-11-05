import { useDispatch, useSelector } from "react-redux"
import Name from "./Name"
import { selectError, selectStatus, setError, setStatusFailed, setStatusIdle, updateUserInfo } from "../../../redux/reducers/users"
import ErrorForm from "../../../Components/ErrorForm"
import Phone from "./Phone"
import Input from "../../../Components/Input"
import { StyledUpdateUserInfo } from "../styled"
import { Container } from "../../../Global/components"
import ButtonAnimation from "../../../Components/common/ButtonAnimation"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useAxiosPrivate from "../../../Hook/useAxiosPrivet"
import Password from "./Password"
import BarthDay from "./BerthDay"
import Gender from "./Gender"
import { STATUS } from "../../../Actions"
import { selectUser, setUser } from "../../../redux/reducers/auth"
import useRefreshToken from "../../../Hook/useRefreshToken"
import { validationName, validationPassword, validationPhone } from "./validatain"

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // check the password if correct here, put the better in the backend 
    if (password.trim().length >= 8) {
      try {
        switch (id) {
          case "password":
            await validationPassword.validate({
              password: newPassword, confirmPassword
            }, { abortEarly: false });
            break;
          case "name":
            await validationName.validate({
              name: input
            }, { abortEarly: false });
            break;
          case "phone":
            await validationPhone.validate({
              phone: input.slice(4)
            }, { abortEarly: false });
            break;
          default:
            console.log('Something is wrong!')
        }
        dispatch(updateUserInfo({
          user: {
            [id]: input
          },
          password,
          axiosPrivate
        }))
      } catch (e) {
        const errors = e.inner?.reduce((acc, { path, message }) => {
          acc[path] = message;
          return acc;
        }, {});
        dispatch(setStatusFailed({ ...{ errors } }));
      }
    } else {
      dispatch(setError({ errors: { thePassword: 'the password must be more than 6 characters' } }))
    }
  }

  useEffect(() => {
    if (status === STATUS.SUCCEEDED) {
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
          {errors?.thePassword && <ErrorForm>{errors?.thePassword}</ErrorForm>}
          <div className="passwordInput">
            <Link to="/forgotPassword" className='forgotPassword'>نسيت كلمة المرور</Link>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="اكنب هنا"
              label="كلمة المرور"
              value={password}
            />
          </div>
          {id !== "password" && errors?.[id] && <ErrorForm>{errors?.[id]}</ErrorForm>}
          {
            id === "name" &&
            <Name {...{ id, setInput, input }} />
          }
          {
            id === "phone" &&
            <Phone {...{ setInput }} />
          }
          {
            id === "password" &&
            <Password {...{ errors, newPassword, confirmPassword, setNewPassword, setConfirmPassword }} />
          }
          {
            id === "barthDay" &&
            <BarthDay {...{ input, setInput }} />
          }
          {
            id === "gender" &&
            <Gender {...{ input, setInput }} />
          }
          <ButtonAnimation status={status}>
            تعديل
          </ButtonAnimation>

          {errors?.message && <ErrorForm>{errors?.message}</ErrorForm>}
          {/* {
          status === STATUS.SUCCEEDED &&
          <Alert text={`تم التعديل بنجاح`} />
        } */}
        </form>
      </StyledUpdateUserInfo>

    </Container>
  )
}

export default UpdateUserInfo