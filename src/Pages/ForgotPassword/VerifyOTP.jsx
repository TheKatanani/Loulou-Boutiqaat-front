// // import React, { useState, useEffect } from "react";
// // import auth from "../../firebase";
// // import { isSignInWithEmailLink } from "firebase/auth";
// import { StyledVerifyOTP } from "./styled";
// import { PrimaryButton } from "../../Global/components";
// import ErrorForm from "../../Components/ErrorForm";
// import { useDispatch, useSelector } from "react-redux";
// import { selectError, selectOTPData, selectStatus, verifyOTP } from "../../redux/reducers/OTP";
// import { useNavigate } from "react-router-dom";
// import ButtonAnimation from "../../Components/common/ButtonAnimation";
// import { STATUS } from "../../Actions";
// import { useRef } from "react";
// import Input from "../../Components/Input";
// import { useState } from "react";
// import { useEffect } from "react";

// function VerifyOTP() {
//   const [test, setTest] = useState('')
//   const error = useSelector(selectError)
//   const { otp } = useSelector(selectOTPData)
//   const status = useSelector(selectStatus)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const inputsLength = 4
//   const field_1_ref = useRef()
//   const field_2_ref = useRef()
//   const field_3_ref = useRef()
//   const field_4_ref = useRef()
//   // const handleInputChangeFunc = (e)=>{}
//   const handleOtpChange = (event) => {
//     const { id, value } = event.target
//     if (value === 1){

//     }
//       dispatch(handleOtpChange({ id, value }))
//   };
//   // do the logic here and then send the OTP to the store with the verifyOTP to controll on ref

//   const verify = () => {
//     dispatch(verifyOTP({ navigate }))
//   }
//   useEffect(() => {
//     field_1_ref.current.focus()
//   }, [])
//   return (
//     <StyledVerifyOTP >
//       <div className="container">
//         <h3 class="title">OTP Verification</h3>
//         <p class="sub-title">
//           Enter the OTP you received to
//           <span class="phone-number">{ }</span>
//         </p>
//         {error && <ErrorForm>{error}</ErrorForm>} 
//         <Input
//           onChange={(e) => setTest(e.target.value)}
//           id="test"
//           type="text"
//           placeholder="00-000-00-00"
//           value={test}
//           maxLength='4'
//         />
//         <div class="wrapper">
//           <input
//             type="text"
//             value={test[0] || ''}
//             onChange={handleOtpChange}
//             maxLength="1"
//             id='field_1'
//             ref={field_1_ref}
//             readOnly
//           />
//           <input
//             type="text"
//             value={test[1] || ''}
//             onChange={handleOtpChange}
//             maxLength="1"
//             id='field_2'
//             ref={field_2_ref}
//             readOnly
//           />
//           <input
//             type="text"
//             value={test[2] || ''}
//             onChange={handleOtpChange}
//             maxLength="1"
//             id='field_3'
//             ref={field_3_ref}
//             readOnly
//           />
//           <input
//             type="text"
//             value={test[3] || ''}
//             onChange={handleOtpChange}
//             maxLength="1"
//             id='field_4'
//             ref={field_4_ref}
//             readOnly
//           />
//         </div>
//         <ButtonAnimation status={status} disabled={status === STATUS.LOADING} onClick={verify}>Verify</ButtonAnimation>
//         <button className="resend" onClick={() => { }}>Resend OTP</button>
//       </div>
//     </StyledVerifyOTP>
//   );
// }

// export default VerifyOTP;
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StyledVerifyOTP } from "./styled";
import { PrimaryButton } from "../../Global/components";
import ErrorForm from "../../Components/ErrorForm";
import ButtonAnimation from "../../Components/common/ButtonAnimation";
import { selectError, selectOTPData, selectStatus, verifyOTP, handleInputOTPChange } from "../../redux/reducers/OTP";
import { STATUS } from "../../Actions";

function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const {phone} = useSelector(selectOTPData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputsRef = useRef([]);

  const handleOtpChange = (event, index) => {
    const { value } = event.target;

    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    dispatch(handleInputOTPChange({ id: `field_${index + 1}`, value }));

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    if (!value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, 4).split("");

    const newOtp = [...otp];
    pasteData.forEach((value, index) => {
      newOtp[index] = value;
      dispatch(handleInputOTPChange({ id: `field_${index + 1}`, value }));
    });
    setOtp(newOtp);
    inputsRef.current[pasteData.length - 1].focus();
  };

  const verify = () => {
    const fullOtp = otp.join("");
    dispatch(verifyOTP({ otp: fullOtp, navigate }));
  };

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  return (
    <StyledVerifyOTP>
      <div className="container">
        <h3 className="title">OTP Verification</h3>
        <p className="sub-title">
          Enter the OTP you received to {phone}
          <span className="phone-number"></span>
        </p>
        {error && <ErrorForm>{error}</ErrorForm>}
        <div className="wrapper">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              onPaste={handlePaste}
              maxLength="1"
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>
        <ButtonAnimation
          status={status}
          disabled={status === STATUS.LOADING}
          onClick={verify}
        >
          Verify
        </ButtonAnimation>
        <button className="resend" onClick={() => { }}>
          Resend OTP
        </button>
      </div>
    </StyledVerifyOTP>
  );
}

export default VerifyOTP;
