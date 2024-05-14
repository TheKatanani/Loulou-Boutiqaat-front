import { Link } from 'react-router-dom';
import { validationSchema } from '../../validationSchema';
import SignFooter from '../../Components/SignFooter';
import { Container } from '../../Global/components';
import { RegisterStyled } from './styles';
import axios from 'axios';
import { API } from '../../API';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, handleCheckBoxChange, handleInputChange, selectError, selectFormData, selectStatus, setStatusFailed, setStatusIdle, setStatusLoading } from '../../redux/reducers/signup';
import { setLogIn, setUser } from '../../redux/reducers/auth';
import { splitPhone } from '../../utels/func';
import { setCart } from '../../redux/reducers/cart';
import Form from '../../Components/views/forms/Register';
import { useEffect } from 'react';

function Register() {
    const formData = useSelector(selectFormData); 
    const errors = useSelector(selectError); 
    const status = useSelector(selectStatus); 
    const dispatch = useDispatch()
    // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
    const handleInputChangeFunc = (event) => {
        const { id, value } = event.target;
        dispatch(handleInputChange({ id, value }));
    };
    // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
    const handleCheckBoxChangeFunc = (e) => dispatch(handleCheckBoxChange({ id: e.target.id, checked: e.target.checked }));
    // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setStatusLoading(true));
        dispatch(clearError());
        try {
            const currentUsers = await axios.get(`${API}/users`)
            const foundedUser = currentUsers?.data?.find((user) =>
                splitPhone(user?.phone) === splitPhone(formData?.selectPhone + formData?.phone)
            )
            if (!foundedUser) {
                await validationSchema.validate(formData, { abortEarly: false });
                const res = await axios.post(`${API}/users`, {
                    name: formData.name,
                    phone: formData.selectPhone + formData.phone,
                    password: formData.password,
                    gendar: formData.gendar,
                    barthDay: formData.barthDay
                });
                if (res.data) {
                    // localStorage.setItem('token', res.data.token);
                    dispatch(setLogIn(res.data))
                    dispatch(setUser(foundedUser))
                    dispatch(setCart({ userId: foundedUser.id }))
                }
            } else {
                dispatch(setStatusFailed({ errors: { phone: 'this phone number has an account' } }));
            }
        } catch (e) {
            const errors = e.inner?.reduce((acc, { path, message }) => {
                acc[path] = message;
                return acc;
            }, {});
            dispatch(setStatusFailed({ ...{ errors } }));
        }
    };
    useEffect(() => {
        // to set idle as an initail status
        dispatch(setStatusIdle())
    }, [dispatch])
    return (
        <>
            <RegisterStyled>
                <Container>
                    <main>
                        <h1>Register</h1>
                        <Form errors={errors} status={status} {...{ formData, handleSubmit, handleInputChangeFunc, handleCheckBoxChangeFunc }} />
                        <p>Already have an accaunt? <Link to="/login">Logn in </Link></p>
                    </main>
                    <Link to="/home" className="icon">
                        <p>back to home page</p>
                    </Link>
                </Container>
            </RegisterStyled>
            <SignFooter />
        </>
    );
}

export default Register;
