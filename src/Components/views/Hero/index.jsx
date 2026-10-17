import React from 'react'
import { StyledHero } from './styled'
import heroImg from "../../../Images/heroPageImage.png"
import { Container } from '../../../Global/components'
import { Link } from 'react-router-dom'

const Hero = ({ elementRefs }) => {
  const handleClickScroll = (elementRef) => { 
    if (elementRef?.current) {
      const elementTop = elementRef.current.getBoundingClientRect().top;
      const offset = elementTop + window.scrollY - 130;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <StyledHero>
      <Container className='heroContainer'>
        <div className="heroContent">
          <div className="heroBadge">
            <span>✨ لولو بوتيكات • عالم من الجمال والتميز</span>
          </div>
          <h1 className="heroTitle">
            تألقي بأرقى صيحات <span className="highlight">الجمال والعطور</span> الفاخرة
          </h1>
          <p className="heroDescription">
            وجهتكِ الأولى لأفخم الماركات العالمية، العطور الأصلية ومستحضرات العناية الفائقة المختارة بعناية لتعكس سحركِ وأناقتكِ في كل لحظة.
          </p>
          <div className="heroActions">
            <button 
              type="button" 
              className="primaryCta" 
              onClick={() => handleClickScroll(elementRefs?.categories)}
            >
              تسوقي الآن 🛍️
            </button>
            <Link to="/home/categories" className="secondaryCta">
              اكتشفي الأقسام ✨
            </Link>
          </div>
          <div className="heroStats">
            <div className="statItem">
              <h4>+500</h4>
              <p>منتج أصلي ومستورد</p>
            </div>
            <div className="statDivider" />
            <div className="statItem">
              <h4>توصيل سريع</h4>
              <p>لكافة مناطق قطاع غزة</p>
            </div>
            <div className="statDivider" />
            <div className="statItem">
              <h4>خدمة متواصلة</h4>
              <p>استقبال الطلبات 11ص - 11م</p>
            </div>
          </div>
        </div>

        <div className='heroVisual'>
          <div className="imageWrapper">
            <img loading="lazy" src={heroImg} alt="Loulou Boutiqaat Luxury Collection" />
            <div className="floatingBadge top">
              <span className="badgeIcon">💎</span>
              <div>
                <strong>تشكيلة حصرية</strong>
                <p>عطور ومستحضرات مختارة</p>
              </div>
            </div>
            <div className="floatingBadge bottom">
              <span className="badgeIcon">🎁</span>
              <div>
                <strong>تغليف ملكي فاخر</strong>
                <p>مجاناً مع كل طلب</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </StyledHero>
  )
}

export default Hero