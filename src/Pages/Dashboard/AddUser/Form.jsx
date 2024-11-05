import { useDispatch, useSelector } from 'react-redux'
import Register from '../../../Components/views/forms/Register.jsx'
import { validationSchema, validationSchemaUpdateAdmain } from '../../../validationSchema.jsx'
import { addNewUser, handleInputChangeReducer, selectAddUserState, selectError, selectMood, selectStatus, setError, setStatusFailed, setStatusLoading, setGender, updateUser } from '../../../redux/reducers/users.js'
import { MOOD, ROLES } from '../../../Actions/index.js'
import { handleCheckBoxChange } from '../../../redux/reducers/users.js'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet.js'

const Form = () => {
  const formData = useSelector(selectAddUserState);
  const status = useSelector(selectStatus);
  const errors = useSelector(selectError);
  const axiosPrivate = useAxiosPrivate()
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
      name: formData.name,
      phone: formData.selectPhone + formData.phone,
      gender: formData.gender,
      barthDay: formData.barthDay,
      roles: {
        [formData?.role]: ROLES[formData?.role]
      }
    } 
    try {
      if (mood === MOOD.ADD) {
        await validationSchema.validate(formData, { abortEarly: false });
        dispatch(addNewUser({ user: { ...user, password: formData.password }, axiosPrivate }))
      } else {
        // check if user have a new pass must validate the password inputs
        if (formData.password) {
          await validationSchema.validate(formData, { abortEarly: false });
          user.password = formData.password
        } else
          await validationSchemaUpdateAdmain.validate(formData, { abortEarly: false });
        dispatch(updateUser({ user: { ...user, id: formData.id }, axiosPrivate }))
      }
    } catch (e) {
      const errors = e.inner?.reduce((acc, { path, message }) => {
        acc[path] = message;
        return acc;
      }, {});
      dispatch(setStatusFailed({ ...{ errors } }));
    }
  };
  return (
    <Register errors={errors} userRole={true} {...{ status, formData, handleSubmit, setGender, handleInputChangeFunc, handleCheckBoxChangeFunc }} />
  )
}

export default Form