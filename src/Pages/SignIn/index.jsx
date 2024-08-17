import { LoginStyle } from './styled';
import Input from '../../Components/Input';
import { Link } from 'react-router-dom';
import { Container } from '../../Global/components';
import ErrorForm from '../../Components/ErrorForm';
import { handleInputChange, selectFormData, showPassword, selectStatus, selectError, setStatusIdle } from '../../redux/reducers/auth.js';
import { useDispatch, useSelector } from 'react-redux';
import { API2 } from '../../API.js';
import { handleLogin } from '../../redux/reducers/auth.js';
import Select from '../../Components/Select/index.jsx';
import useFetch from '../../Hook/useFetch.jsx';
import LogoLoading from '../../Components/common/LogoLoading/index.jsx';
import PasswordInput from '../../Components/common/PasswordInput/index.jsx';
import Copy from '../../Components/UI/Copy/index.jsx';
import ButtonAnimation from '../../Components/common/ButtonAnimation/index.jsx';
import { useEffect } from 'react';
function SignIn() {
    const formData = useSelector(selectFormData);
    const status = useSelector(selectStatus)
    const errors = useSelector(selectError)
    const dispatch = useDispatch() 
    const { data: allowedPhones, error, isLoading } = useFetch(`${API2}/countryCode`)
    // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
    const handleInputChangeFunc = (event) => {
        const { id, value } = event.target;
        dispatch(handleInputChange({ id, value }));
    };
    // // // // // // // // /// // // // // // // // // /// // // // // // // // // ///     // // // // // // // // /// // // // // // // // // /// // // // // // // // // /// 
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(handleLogin({ formData }))
    };
    useEffect(() => {
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
                        <h1>تسجيل الدخول</h1>
                        <form onSubmit={handleSubmit}>
                            {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
                            <div className="phone">
                                <label htmlFor="Phone">رقم الجوال</label>
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
                            <PasswordInput handleInputChange={handleInputChangeFunc} value={formData?.password} id={'password'} label={"كلمة المرور"} showPassword={formData.showPassword} showPasswordFunc={showPassword} />
                            {/* *********************** */}
                            {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
                            {errors?.message && <ErrorForm>{errors?.message}</ErrorForm>}
                            {/* <LogInButton type="submit">{formData.isLoading ? <ButtonAnimation /> : "Login"}</LogInButton> */}
                            <ButtonAnimation status={status}>تسجيل الدخول
                            </ButtonAnimation>
                        </form>
                        <p>لا تمتلك حساب : <Link to="/Register">انشاء حساب جديد</Link></p>
                    </main>
                    <Link to="/home" className="icon">
                        <p>عد للصفحة الرئيسية</p>
                    </Link>
                </Container>
            </LoginStyle>
            {/* <SignInFooter /> */}
            <Copy />
        </>
    );
}

export default SignIn;
