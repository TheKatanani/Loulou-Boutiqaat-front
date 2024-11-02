import React from 'react'
import { StyledHero } from './styled'
import Img3 from "../../../Images/heroPageImage.png"
import LogoLoading from '../../common/LogoLoading'
import { Container } from '../../../Global/components'
import { ArrowDown } from '../../../Icons'
const Hero = ({elementRefs}) => {
  const handleClickScroll = (elementRef) => { 
    if (elementRef.current) {
      const elementTop = elementRef.current.getBoundingClientRect().top;
      const offset = elementTop + window.scrollY - 116 ;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };
  return (
    <StyledHero >
      <Container className='conatainer'>
        <div className="text">
          <LogoLoading loader={false} full/>
          <p>
            لولو بوتيكات
            اول موقع الكتروني في غزة, <br />
            يهتم بجمالك من رأسك حتى قدمكِ ...
          </p>
        </div>
        <div className='imgContainer'>
          <img loading="lazy" src={Img3} alt="testImage" />
        </div>
        <span onClick={() => handleClickScroll(elementRefs.categories)}>
        <ArrowDown/>
        </span>
      </Container>
    </StyledHero>
  )
}

export default Hero