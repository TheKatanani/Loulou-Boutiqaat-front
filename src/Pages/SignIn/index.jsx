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
import toast from 'react-hot-toast';

function SignIn() {
  const formData = useSelector(selectFormData);
  const status = useSelector(selectStatus)
  const errors = useSelector(selectError)
  const dispatch = useDispatch()
  const { data: allowedPhones, error, isLoading } = useFetch(`${API2}/countryCode`)

  const handleInputChangeFunc = (event) => {
    const { id, value } = event.target;
    dispatch(handleInputChange({ id, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(handleLogin({ formData }));
    if (resultAction.payload?.data?.accessToken) {
      toast.success(`أهلاً بك مجدداً ${resultAction.payload?.data?.user?.name || ''}!`);
    } else if (resultAction.payload?.errors?.message) {
      toast.error(resultAction.payload?.errors?.message);
    }
  };

  useEffect(() => {
    dispatch(setStatusIdle()) 
  }, [dispatch])

  if (isLoading) {
    return <LogoLoading />
  }
  if (error) {
    return <p style={{ textAlign: 'center', padding: 40 }}>{error}</p>
  }

  const defaultCountry = allowedPhones?.[0]?.value || '+970';

  return (
    <>
      <LoginStyle>
        <Container>
          <main>
            <div className="brandHeader">
              <span className="brandIcon">👑</span>
              <h1>تسجيل الدخول</h1>
              <p>أهلاً بكِ مجدداً في لولو بوتيكات</p>
            </div>

            <form onSubmit={handleSubmit} autoComplete='off'>
              {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
              <div className="phoneGroup">
                <label htmlFor="phone">رقم الجوال</label>
                <div className="phoneInputs">
                  <Select
                    defualt={defaultCountry}
                    id="selectPhone"
                    value={formData.selectPhone || defaultCountry}
                    onChange={handleInputChangeFunc}
                    options={allowedPhones}
                  />
                  <Input
                    onChange={(e) => {
                      dispatch(handleInputChange({ id: 'phone', value: (e.target.value?.trim()) }))
                    }}
                    id="phone"
                    type="tel"
                    placeholder="59-123-4567"
                    value={formData.phone || ''}
                    required
                  />
                </div>
              </div>

              {errors?.password && <ErrorForm>{errors?.password}</ErrorForm>}
              <PasswordInput 
                handleInputChange={handleInputChangeFunc} 
                value={formData?.password} 
                id={'password'} 
                label={"كلمة المرور"} 
                showPassword={formData.showPassword} 
                showPasswordFunc={showPassword} 
              />

              {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
              {errors?.message && <ErrorForm>{errors?.message}</ErrorForm>}

              <div style={{ marginTop: 22 }}>
                <ButtonAnimation status={status}>
                  تسجيل الدخول
                </ButtonAnimation>
              </div>
            </form>

            <div className="authFooterLinks">
              <span>ليس لديكِ حساب؟</span>
              <Link to="/register">إنشاء حساب جديد ✨</Link>
            </div>
          </main>

          <Link to="/home" className="backHomeLink">
            <span>← العودة للصفحة الرئيسية للمتجر</span>
          </Link>
        </Container>
      </LoginStyle>
      <Copy />
    </>
  );
}

export default SignIn;
