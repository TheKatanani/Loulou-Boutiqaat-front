import { Link } from 'react-router-dom'; 
import { Container } from '../../Global/components';
import { RegisterStyled } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { handleCheckBoxChange, handleInputChange, handleRegister, selectError, selectFormData, selectStatus, setGender, setStatusIdle } from '../../redux/reducers/signup';
import Form from '../../Components/views/forms/Register';
import { useEffect } from 'react';
import Copy from '../../Components/UI/Copy';
import toast from 'react-hot-toast';

function Register() {
    const formData = useSelector(selectFormData);
    const errors = useSelector(selectError);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const handleInputChangeFunc = (event) => {
        const { id, value } = event.target;
        dispatch(handleInputChange({ id, value }));
    };

    const handleCheckBoxChangeFunc = (e) => dispatch(handleCheckBoxChange({ id: e.target.id, checked: e.target.checked }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(handleRegister({ formData }));
        if (res.payload?.data?.accessToken) {
            toast.success(`تم إنشاء حسابك بنجاح! أهلاً بكِ ${res.payload?.data?.user?.name || ''}`);
        } else if (res.payload?.errors?.message) {
            toast.error(res.payload?.errors?.message);
        }
    };

    useEffect(() => {
        dispatch(setStatusIdle());
    }, [dispatch]);

    return (
        <>
            <RegisterStyled>
                <Container>
                    <main>
                        <div className="brandHeader">
                            <span className="brandIcon">👑</span>
                            <h1>إنشاء حساب جديد</h1>
                            <p>انضمي إلى عالم لولو بوتيكات وتسوقي براحة وتألق</p>
                        </div>
                        <Form 
                            errors={errors} 
                            status={status} 
                            setGender={setGender} 
                            formData={formData} 
                            handleSubmit={handleSubmit} 
                            handleInputChangeFunc={handleInputChangeFunc} 
                            handleCheckBoxChangeFunc={handleCheckBoxChangeFunc} 
                        />
                        <div className="authFooterLinks">
                            <span>هل تمتلكين حساباً بالفعل؟</span>
                            <Link to="/login">تسجيل الدخول</Link>
                        </div>
                    </main>

                    <Link to="/home" className="backHomeLink">
                        <span>← العودة للصفحة الرئيسية للمتجر</span>
                    </Link>
                </Container>
            </RegisterStyled>
            <Copy />
        </>
    );
}

export default Register;
