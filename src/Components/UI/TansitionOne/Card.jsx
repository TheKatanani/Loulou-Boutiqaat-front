import React from 'react'
import { StyledCard } from './styled'
import { Link } from 'react-router-dom'

const Card = ({ img, id, name, background, description }) => {
  return (
    <StyledCard as={Link} to={`/home/categories/${id}`}>
      <img loading="lazy" src={background || img} alt={name} />
      <div className="cardOverlay" />
      <div className="cardContent">
        <span className="categoryPill">تشكيلة مميزة</span>
        <h3>{name}</h3>
        {description && <p>{description.slice(0, 50)}...</p>}
        <span className="discoverLink">تصفحي المنتجات ←</span>
      </div>
    </StyledCard>
  )
}

export default Card