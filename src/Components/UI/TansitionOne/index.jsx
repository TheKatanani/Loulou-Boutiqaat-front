import React from 'react'
import Banner from '../../../Images/Banner.png'
import image104 from '../../../Images/image104.png'
import image108 from '../../../Images/image108.png'
import image92 from '../../../Images/image92.png'
import image98 from '../../../Images/image98.png'
import Card from './Card'
import { StyledTransactionOne } from './styled'
import { Container } from '../../../Global/components'
import { API2 } from '../../../API'
import useFetch from '../../../Hook/useFetch'
import LogoLoading from '../../common/LogoLoading'
import { Link } from 'react-router-dom'

const images = [Banner, image104, image108, image92, image98]

const TransitionOne = ({ title = "تسوقي حسب القسم", elementRefs }) => {
  const { data, isLoading } = useFetch(`${API2}/category/published`)

  if (isLoading) {
    return <LogoLoading />
  }

  return (
    <StyledTransactionOne ref={elementRefs?.categories}>
      <Container>
        <div className="sectionHeader">
          <div className="titleBox">
            <span className="badge">أقسام المتجر</span>
            <h2>{title}</h2>
          </div>
          <Link to="/home/categories" className="allCategoriesLink">
            جميع الأقسام ←
          </Link>
        </div>
        <div className="categoryShowcaseGrid">
          {
            data?.map((category, i) => (
              <Card 
                key={category.id} 
                {...category} 
                img={images[i % images.length]} 
              />
            ))
          }
        </div>
      </Container>
    </StyledTransactionOne>
  )
}

export default TransitionOne