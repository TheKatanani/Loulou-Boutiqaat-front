import { LoginStyle } from './styled';
import Input from '../../Components/Input';
import Checkbox from '../../Components/Checkbox';
import { Link } from 'react-router-dom';
// import SignInFooter from '../../Components/SignFooter';

import { Container } from '../../Global/components';
import axios from 'axios';
import ErrorForm from '../../Components/ErrorForm';
import { handleCheckBoxChange, handleInputChange, selectFormData, showPassword, selectStatus, selectError, setStatusLoading, clearError, setStatusFailed, setStatusIdle } from '../../redux/reducers/login.js';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../API.js';
import { validationSchemaLogIn } from '../../validationSchema.jsx';
import { setLogIn, setUser } from '../../redux/reducers/auth.js';
import { splitPhone } from '../../utels/func.js';
import Select from '../../Components/Select/index.jsx';
import useFetch from '../../Hook/useFetch.jsx';
import LogoLoading from '../../Components/common/LogoLoading/index.jsx';
import { setCart } from '../../redux/reducers/cart.js';
import PasswordInput from '../../Components/common/PasswordInput/index.jsx';
import Copy from '../../Components/UI/Copy/index.jsx';
import ButtonAnimation from '../../Components/common/ButtonAnimation/index.jsx';
import { useEffect } from 'react';
function SignIn() {
    const formData = useSelector(selectFormData);
    const status = useSelector(selectStatus)
    const errors = useSelector(selectError)
    const dispatch = useDispatch()
    const { data: allowedPhones, isLoading, error } = useFetch(`${API}/allowedPhones`)
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
            await validationSchemaLogIn.validate(formData, { abortEarly: false });
            const res = await axios.get(`${API}/users`);
            if (res.data) {
                const foundedUser = res?.data?.find((user) =>
                    splitPhone(user?.phone) === splitPhone(formData?.selectPhone + formData?.phone)
                )
                if (foundedUser.password === formData.password) {
                    // this is wrong 
                    // localStorage.setItem('token', res.data.token);
                    // this is wrong , there is no token yet
                    dispatch(setLogIn({ token: res.data.token || 'tempToken' }))
                    dispatch(setUser(foundedUser))
                    dispatch(setCart({ userId: foundedUser.id }))
                } else {
                    dispatch(setStatusFailed({ errors: { password: 'wrong password' } }));
                }
            } else {
                dispatch(setStatusFailed({ errors: { phone: 'this phone dose not has an acount' } }));
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
    if (isLoading) {
        return <LogoLoading />
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <>
            <LoginStyle>
                <Container>
                    <main>
                        <h1>Sign in</h1>
                        <form onSubmit={handleSubmit}>
                            {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
                            <div className="phone">
                                <label htmlFor="Phone">Phone</label>
                                <div>
                                    <Select
                                        defualt={allowedPhones[0].value}
                                        id="selectPhone"
                                        value={formData.selectPhone}
                                        onChange={handleInputChangeFunc}
                                        options={allowedPhones}
                                    />
                                    <Input
                                        onChange={handleInputChangeFunc}
                                        id="phone"
                                        type="text"
                                        placeholder="00-000-00-00"
                                        value={formData.phone}
                                    />
                                </div>
                            </div>
                            {/* *************************** */}
                            {errors?.password && <ErrorForm>{errors?.password}</ErrorForm>}
                            <PasswordInput handleInputChange={handleInputChangeFunc} value={formData?.password} id={'password'} label={"password"} showPassword={formData.showPassword} showPasswordFunc={showPassword} />
                            {/* *********************** */}
                            {errors?.agree && <ErrorForm>{errors?.agree}</ErrorForm>}
                            <Checkbox id="agree" label="Remember me" onChange={handleCheckBoxChangeFunc} />
                            {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
                            {/* <LogInButton type="submit">{formData.isLoading ? <ButtonAnimation /> : "Login"}</LogInButton> */}
                            <ButtonAnimation status={status}>Login</ButtonAnimation>
                        </form>
                        <p>Don't have an account? <Link to="/Register">Register</Link></p>
                    </main>
                    <Link to="/home" className="icon">
                        <p>back to home page</p>
                    </Link>
                </Container>
            </LoginStyle>
            {/* <SignInFooter /> */}
            <Copy />
        </>
    );
}

export default SignIn;
