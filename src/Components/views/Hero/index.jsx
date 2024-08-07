import React from 'react'
import { StyledHero } from './styled'
import Img3 from "../../../Images/heroPageImage.png"
import LogoLoading from '../../common/LogoLoading'
import { Container } from '../../../Global/components'
const Hero = () => {
  return (
    <StyledHero >
      <Container className='conatainer'>
        <div className="text">
          <LogoLoading loader={false} />
          <p>
            لولو بوتيكات
            اول موقع الكتروني في غزة, <br />
            يهتم بجمالك من رأسك حتى قدمكِ ...
          </p>
        </div>
        <figure>
          <img src={Img3} alt="testImage" />
        </figure>
      </Container>
    </StyledHero>
  )
}

export default Hero