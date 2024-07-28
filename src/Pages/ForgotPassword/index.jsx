// import React, { useState, useEffect } from 'react';
// import ErrorForm from '../../Components/ErrorForm';
// import Input from '../../Components/Input';
// import { Container } from '../../Global/components';
// import { useNavigate } from 'react-router-dom';
// import { StyledForgotPassword } from './styled';
// import ButtonAnimation from '../../Components/common/ButtonAnimation';
// import { STATUS } from '../../Actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearError, handleInputChangeReducer, selectError, selectOTPData, selectStatus, sendOTP, setStatusIdle } from '../../redux/reducers/OTP';
// import { RecaptchaVerifier } from 'firebase/auth';
// import auth from '../../firebase';

// const ForgotPassword = () => {
//   const error = useSelector(selectError);
//   const { phone } = useSelector(selectOTPData);
//   const status = useSelector(selectStatus);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [appVerifier, setAppVerifier] = useState(null);

//   const sendVerificationCode = () => {
//     if (appVerifier) {
//       dispatch(sendOTP({
//         navigate, phone, appVerifier
//       }));
//     } else {
//       console.error('Please complete the reCAPTCHA verification.');
//     }
//   };

//   const onCaptchaVerify = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'normal',
//           callback: (response) => {
//             onAppVerify();
//           },
//           'expired-callback': () => {},
//         },
//         auth
//       );
//     }
//   };

//   const onAppVerify = (event) => {
//     event.preventDefault();
//     onCaptchaVerify();
//     const appVerifier = window.recaptchaVerifier;
//     setAppVerifier(appVerifier);
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(setStatusIdle());
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   return (
//     <Container>
//       <StyledForgotPassword>
//         <div>
//           <h3>Verefication Code</h3>
//           {error && <ErrorForm>{error}</ErrorForm>}
//           <Input
//             onChange={(e) => dispatch(handleInputChangeReducer({ id: e.target.id, value: e.target.value }))}
//             id="phone"
//             type="text"
//             placeholder="Type here"
//             label="Add Your Phone number"
//             value={phone}
//           />
//           <ButtonAnimation disabled={status === STATUS.LOADING} onClick={sendVerificationCode} status={status}>send verification code</ButtonAnimation>
//           <div id="recaptcha-container" className="mt-4"></div>
//         </div>
//       </StyledForgotPassword>
//     </Container>
//   )
// }

// // export default ForgotPassword 
// import React, { useState, useEffect } from 'react';
// import ErrorForm from '../../Components/ErrorForm';
// import Input from '../../Components/Input';
// import { Container } from '../../Global/components';
// import { useNavigate } from 'react-router-dom';
// import { StyledForgotPassword } from './styled';
// import ButtonAnimation from '../../Components/common/ButtonAnimation';
// import { STATUS } from '../../Actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearError, handleInputChangeReducer, selectError, selectOTPData, selectStatus, sendOTP, setStatusIdle } from '../../redux/reducers/OTP';
// import { RecaptchaVerifier } from 'firebase/auth';
// import auth from '../../firebase';

// const ForgotPassword = () => {
//   const error = useSelector(selectError);
//   const { phone } = useSelector(selectOTPData);
//   const status = useSelector(selectStatus);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [appVerifier, setAppVerifier] = useState(null);

//   useEffect(() => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'normal', // Change this to make reCAPTCHA visible
//           callback: (response) => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             onAppVerify(); 
//           },
//           'expired-callback': () => {
//             // Response expired. Ask user to solve reCAPTCHA again.
//             console.error('reCAPTCHA expired. Please verify again.');
//           },
//         },
//         auth
//       );
//     }
//     setAppVerifier(window.recaptchaVerifier);
//   }, []);

//   const sendVerificationCode = (event) => {
//     event.preventDefault();

//     if (appVerifier) {
//       appVerifier.verify().then(() => {
//         dispatch(sendOTP({ navigate, phone, appVerifier }));
//       }).catch((error) => {
//         console.error(error.message);
//       });
//     } else {
//       console.error('Please complete the reCAPTCHA verification.');
//     }
//   };
//   // const sendVerificationCode = () => {
//   //   if (appVerifier) {
//   //     dispatch(sendOTP({
//   //       navigate, phone, appVerifier
//   //     }));
//   //   } else {
//   //     console.error('Please complete the reCAPTCHA verification.');
//   //   }
//   // };

//   const onCaptchaVerify = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'normal',
//           callback: (response) => {
//             onAppVerify();
//           },
//           'expired-callback': () => {},
//         },
//         auth
//       );
//     }
//   };

//   const onAppVerify = (event) => {
//     event.preventDefault();
//     onCaptchaVerify();
//     const appVerifier = window.recaptchaVerifier;
//     setAppVerifier(appVerifier);
//   };
//   useEffect(() => {
//     return () => {
//       dispatch(setStatusIdle());
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   return (
//     <Container>
//       <StyledForgotPassword>
//         <div>
//           <h3>Verification Code</h3>
//           {error && <ErrorForm>{error}</ErrorForm>}
//           <Input
//             onChange={(e) => dispatch(handleInputChangeReducer({ id: e.target.id, value: e.target.value }))}
//             id="phone"
//             type="text"
//             placeholder="Type here"
//             label="Add Your Phone Number"
//             value={phone}
//           />
//           <ButtonAnimation disabled={status === STATUS.LOADING} onClick={sendVerificationCode} status={status}>
//             Send Verification Code
//           </ButtonAnimation>
//           <div id="recaptcha-container" className="mt-4"></div>
//         </div>
//       </StyledForgotPassword>
//     </Container>
//   );
// };

// export default ForgotPassword;
// Import necessary libraries
import React, { useState, useEffect } from 'react';
import ErrorForm from '../../Components/ErrorForm';
import Input from '../../Components/Input';
import { Container } from '../../Global/components';
import { useNavigate } from 'react-router-dom';
import { StyledForgotPassword } from './styled';
import ButtonAnimation from '../../Components/common/ButtonAnimation';
import { STATUS } from '../../Actions';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, handleInputChangeReducer, selectError, selectOTPData, selectStatus, sendOTP, setStatusIdle } from '../../redux/reducers/OTP';
import { RecaptchaVerifier } from 'firebase/auth';
import auth from '../../firebase';

// ForgotPassword component
const ForgotPassword = () => {
  const error = useSelector(selectError);
  const { phone } = useSelector(selectOTPData);
  const status = useSelector(selectStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [appVerifier, setAppVerifier] = useState(null);

  // Ensure reCAPTCHA is created with visible size
  useEffect(() => {
    if (auth && auth.settings) {
      auth().settings.appVerificationDisabledForTesting = true;
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'normal', // This makes the reCAPTCHA visible
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onAppVerify();
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            console.error('reCAPTCHA expired. Please verify again.');
          },
        },
        auth
      );
    }
    setAppVerifier(window.recaptchaVerifier);
  }, []);

  // Function to send verification code
  const sendVerificationCode = (event) => {
    event.preventDefault();

    if (appVerifier) {
      appVerifier.verify().then(() => {
        dispatch(sendOTP({ navigate, phone, appVerifier }));
      }).catch((error) => {
        console.error(error.message);
      });
    } else {
      console.error('Please complete the reCAPTCHA verification.');
    }
  };

  // Helper functions (can be removed if not needed)
  const onCaptchaVerify = () => {
    // ... (same logic as before)
  };

  const onAppVerify = (event) => {
    // ... (same logic as before)
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      dispatch(setStatusIdle());
      dispatch(clearError());
    };
  }, [dispatch]);

  // Return JSX with reCAPTCHA container
  return (
    <Container>
      <StyledForgotPassword>
        <div>
          <h3>Verification Code</h3>
          {error && <ErrorForm>{error}</ErrorForm>}
          <Input
            onChange={(e) => dispatch(handleInputChangeReducer({ id: e.target.id, value: e.target.value }))}
            id="phone"
            type="text"
            placeholder="Type here"
            label="Add Your Phone Number"
            value={phone}
          />
          <ButtonAnimation disabled={status === STATUS.LOADING} onClick={sendVerificationCode} status={status}>
            Send Verification Code
          </ButtonAnimation>
          <div id="recaptcha-container" className="mt-4"></div>
        </div>
      </StyledForgotPassword>
    </Container>
  );
};

export default ForgotPassword;
