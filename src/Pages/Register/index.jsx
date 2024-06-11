import { Link } from 'react-router-dom';
import SignFooter from '../../Components/SignFooter';
import { Container } from '../../Global/components';
import { RegisterStyled } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { handleCheckBoxChange, handleInputChange, handleRegister, selectError, selectFormData, selectStatus, setGender, setStatusIdle } from '../../redux/reducers/signup';
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
        dispatch(handleRegister({ formData })) 
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
                        <Form errors={errors} status={status} {...{
                            setGender, formData, handleSubmit, handleInputChangeFunc, handleCheckBoxChangeFunc
                        }} />
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
