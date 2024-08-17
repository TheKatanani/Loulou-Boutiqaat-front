import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectSocial, selectStatus, setSocial } from '../../redux/reducers/social'
import { Container, MainButton, PrimaryButton } from '../../Global/components'
import contactImage from '../../Images/contactus.svg'
import { StyledContactus } from './styled'
import { STATUS } from '../../Actions'
import LogoLoading from '../../Components/common/LogoLoading'
const Contactus = () => {
  const social = useSelector(selectSocial)
  const status = useSelector(selectStatus)
  useEffect(() => {
    setSocial()
  }, [])
  if (status !== STATUS.SUCCEEDED || !social) {
    return <LogoLoading />
  }
  const phone = social?.find(el => el?.name === 'whatsApp')?.value || ''
  return (
    <StyledContactus>
      <Container className='container'>
        <img loading="lazy" src={contactImage} alt="contact us" />
        <div>
          <h1>تواصل معنا</h1>
          <p>
            {/* make it props */}
            {/* Send a message  with your number and new password */}
            ارسل كلمة المرور الجديدة ورقم هاتفك في رسالة عبر تطبيق واتساب 
          </p>
          <div className="buttons"> 
          <Link to={`https://wa.me/${phone}`} target='_blank'>
            <PrimaryButton>
              {/* {phone} */}
              ارسال
            </PrimaryButton>
          </Link>
          <Link to={`/login`}>
            <MainButton className="signIn">
              تسجيل الدخول
            </MainButton>
          </Link>
          </div>
        </div>
      </Container> 
    </StyledContactus>
  )
}

export default Contactus