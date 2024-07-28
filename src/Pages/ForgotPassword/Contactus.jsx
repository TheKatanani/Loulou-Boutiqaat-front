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
        <img src={contactImage} alt="" />
        <div>
          <h1>Contact Us</h1>
          <p>Send a message  with your number and new password
          </p>
          <div className="buttons"> 
          <Link to={`https://wa.me/${phone}`}>
            <PrimaryButton>
              {phone}
            </PrimaryButton>
          </Link>
          <Link to={`/login`}>
            <MainButton className="signIn">
              Sign In
            </MainButton>
          </Link>
          </div>
        </div>
      </Container> 
    </StyledContactus>
  )
}

export default Contactus