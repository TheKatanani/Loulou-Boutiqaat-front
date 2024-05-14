import { useDispatch, useSelector } from 'react-redux'
import Register from '../../../Components/views/forms/Register.jsx'
import { splitPhone } from '../../../utels/func.js'
import { validationSchema } from '../../../validationSchema.jsx'
import { addNewUser, handleInputChangeReducer, reSetUser, selectAddUserState, selectError, selectMood, selectStatus, selectUsers, setError, setStatusFailed, setStatusLoading, setStatusSucceeded, updateUser } from '../../../redux/reducers/users.js'
import { MOOD, STATUS } from '../../../Actions/index.js'
import { handleCheckBoxChange } from '../../../redux/reducers/users.js'

const Form = () => { 
  const formData = useSelector(selectAddUserState);
  const users = useSelector(selectUsers);
  const status = useSelector(selectStatus);
  const errors = useSelector(selectError);
  const mood = useSelector(selectMood);
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
      id:formData.id,
      name: formData.name,
      phone: formData.selectPhone + formData.phone,
      password: formData.password,
      gendar: formData.gendar,
      barthDay: formData.barthDay,
      role: formData.role
    }
    try {
      const foundedUser = users?.find((_user) =>
        splitPhone(_user?.phone) === splitPhone(formData?.selectPhone + formData?.phone)&& _user.id !== user.id
      )
      if (mood === MOOD.ADD) {
        if (!foundedUser) {
          await validationSchema.validate(formData, { abortEarly: false });
          dispatch(addNewUser({ user }))
          if (status === STATUS.SUCCEEDED) {
            console.log('the user add succesfolly')
            dispatch(reSetUser())
          }
        } else {
          dispatch(setError({ errors: { phone: 'this phone number has an account' } }));
        }
      } else {
        if (foundedUser) {
          // to correct validation wait for complete the backend
        await validationSchema.validate(formData, { abortEarly: false });
        dispatch(updateUser({ user })) 
        if (status === STATUS.SUCCEEDED) {
          console.log('the user updated succesfolly')
          dispatch(setStatusSucceeded());
          dispatch(reSetUser())
        }
        } 
        else {
          dispatch(setError({ errors: { phone: 'this phone number has an account' } }));
        }
      }
    } catch (e) {
      dispatch(setStatusFailed());
      const errors = e.inner?.reduce((acc, { path, message }) => {
        acc[path] = message;
        return acc;
      }, {});
      dispatch(setError({ ...{ errors } }));
    }
  };
  return (
    <Register errors={errors} userRole={true} {...{ status, formData, handleSubmit, handleInputChangeFunc, handleCheckBoxChangeFunc }} />
  )
}

export default Form