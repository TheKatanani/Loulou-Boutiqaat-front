import React, { useEffect, useState } from 'react'
import Banner from '../../../Images/Banner.png'
import image104 from '../../../Images/image104.png'
import image108 from '../../../Images/image108.png'
import image92 from '../../../Images/image92.png'
import image98 from '../../../Images/image98.png'
import Card from './Card'
import { StyledTransactionOne } from './styled'
import TitleSections from '../../common/TitleSections'
import { Container } from '../../../Global/components'
import { API2 } from '../../../API'
import useFetch from '../../../Hook/useFetch'
import LogoLoading from '../../common/LogoLoading'
import { Link } from 'react-router-dom'
const images = Array.from([Banner, image104, image108, image92, image98]) // if there is no images in the api use it 
const TransitionOne = ({ card, title }) => {
  const [active, setActive] = useState()
  const { data, isLoading } = useFetch(`${API2}/category/published`)
  useEffect(() => {

    !isLoading && data.length && setActive(data[2]?.id)
  }, [data, isLoading])
  if (isLoading) {
    return <LogoLoading />
  } 
  return (
    <StyledTransactionOne {...{ card }}>
      <Container>
        <Link to={`/home/${title}`}>
          <TitleSections>{title}</TitleSections>
        </Link>
        <div className={`${card}`}>
          {
            data?.map((category, i) => ( 
              <Card key={category.id} {...{ card }}   {...{ ...category, img: images[i], setActive }} isActive={category.id === active} />
            ))
          }
        </div>
      </Container>
    </StyledTransactionOne>
  )
}

export default TransitionOne