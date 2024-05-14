import { useDispatch, useSelector } from 'react-redux'
import { splitPhone } from '../../utels/func.js'
import { validationSchema } from '../../validationSchema.jsx'
import { handleInputChangeReducer, reSetUser, selectAddUserState, selectError, selectShowPassword, selectStatus, selectUsers, setError, setStatusFailed, setStatusLoading, setUpdateUser, setUsers, updateUser,showPassword as showPasswordFunc } from '../../redux/reducers/users.js'
import { handleCheckBoxChange } from '../../redux/reducers/users.js'
import Register from '../../Components/views/forms/Register.jsx'
import { useEffect } from 'react'
import { selectUser, setUser } from '../../redux/reducers/auth.js'
import { Container } from '../../Global/components.js'
import Alert from '../../Components/UI/Alert/index.jsx'
import { STATUS } from '../../Actions/index.js'

const UpdateInfo = () => {
  const formData = useSelector(selectAddUserState);
  const users = useSelector(selectUsers);
  const authUser = useSelector(selectUser)
  const showPassword = useSelector(selectShowPassword)
  const status = useSelector(selectStatus);
  const errors = useSelector(selectError); 
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
      gendar: formData.gendar,
      barthDay: formData.barthDay,
      role: formData.role
    }
    try {
      if (formData.currentPassword === authUser.password) {
        const foundedUser = users?.find((_user) => {
          return splitPhone(_user?.phone) === splitPhone(formData?.selectPhone + formData?.phone) && _user.id !== user.id
        }
        )
        if (!foundedUser) {
          await validationSchema.validate(formData, { abortEarly: false });
          dispatch(updateUser({ user })) 
          dispatch(reSetUser())
          dispatch(setUser(user))
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
    dispatch(setUsers())
  }, [dispatch])
  return (
    <div style={{ margin: '120px 0 30px' }}>
      <Container>
        <Register isFromUserProfile={true} showPasswordFunc={showPasswordFunc} {...{ status, errors, formData, showPassword, handleSubmit, handleInputChangeFunc, handleCheckBoxChangeFunc }} />
        {
          status === STATUS.SUCCEEDED && 
          <Alert text={'updated successfolly'}/>
        }
      </Container>
    </div>
  )
}
export default UpdateInfo