import { useDispatch, useSelector } from 'react-redux'
import { splitPhone } from '../../utels/func.js'
import { validationSchema } from '../../validationSchema.jsx'
import { handleInputChangeReducer, reSetUser, selectAddUserState, selectError, selectShowPassword, selectStatus, selectUsers, setError, setStatusFailed, setStatusIdle, setStatusLoading, setUpdateUser, showPassword as showPasswordFunc, updateUserInfo } from '../../redux/reducers/users.js'
import { handleCheckBoxChange } from '../../redux/reducers/users.js'
import Register from '../../Components/views/forms/Register.jsx'
import { useEffect } from 'react'
import { selectUser } from '../../redux/reducers/auth.js'
import { Container } from '../../Global/components.js'
import Alert from '../../Components/UI/Alert/index.jsx'
import { STATUS } from '../../Actions/index.js'
import useAxiosPrivate from '../../Hook/useAxiosPrivet.js'
import { StyledUpdateUserInfo } from './styled.js'

const UpdateInfo = () => {
  const formData = useSelector(selectAddUserState);
  const users = useSelector(selectUsers);
  const authUser = useSelector(selectUser)
  const showPassword = useSelector(selectShowPassword)
  const status = useSelector(selectStatus);
  const errors = useSelector(selectError);
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()
  // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
  const handleInputChangeFunc = (event) => {
    const { id, value } = event.target;
    dispatch(handleInputChangeReducer({ id, value }));
  };
  // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
  const handleCheckBoxChangeFunc = (e) => dispatch(handleCheckBoxChange({ id: e.target.id, checked: e.target.checked }));
  // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setStatusLoading());
    dispatch(setError({ errors: {} }));
    const user = {
      id: formData.id,
      name: formData.name,
      phone: formData.selectPhone + formData.phone,
      password: formData.password,
      gender: formData.gender,
      barthDay: formData.barthDay,
    }
    try {
      if (formData.currentPassword === authUser.password) {
        const foundedUser = users?.find((_user) => {
          return splitPhone(_user?.phone) === splitPhone(formData?.selectPhone + formData?.phone) && _user.id !== user.id
        }
        )
        if (!foundedUser) {
          await validationSchema.validate(formData, { abortEarly: false }); 
          dispatch(updateUserInfo({ user, axiosPrivate }))
          dispatch(reSetUser()) 
        }
        else {
          dispatch(setStatusFailed({ errors: { phone: 'this phone number has an account' } }));
        }
      }
      else {
        dispatch(setStatusFailed({ errors: { currentPassword: 'wrong password' } }));
      }
    } catch (e) {
      const errors = e.inner?.reduce((acc, { path, message }) => {
        acc[path] = message;
        return acc;
      }, {});
      dispatch(setStatusFailed({ ...{ errors } }));
    }
  }
    ;
  useEffect(() => {
    dispatch(setUpdateUser({ user: authUser }))
  }, [dispatch, authUser]) 
  useEffect(() => {
    dispatch(setStatusIdle())
  }, [dispatch])
  return (
    <StyledUpdateUserInfo>
      <Container>
        <Register isFromUserProfile={true} showPasswordFunc={showPasswordFunc} {...{ status, errors, formData, showPassword, handleSubmit, handleInputChangeFunc, handleCheckBoxChangeFunc }} />
        {
          status === STATUS.SUCCEEDED &&
          <Alert text={`تم التعديل بنجاح`} />
        }
      </Container>
    </StyledUpdateUserInfo>
  )
}
export default UpdateInfo