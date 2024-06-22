import React from 'react'
import { StyledHero } from './styled'
import Img2 from "../../../Images/undraw_proud_coder_re_exuy.svg" 
import Img3 from "../../../Images/heroPageImage.png" 
import LogoLoading from '../../common/LogoLoading'
import { Container } from '../../../Global/components'
const Hero = () => {
  return (
    <StyledHero >
      <Container className='conatainer'> 
        <div className="text">
          <LogoLoading loader={false}/>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
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