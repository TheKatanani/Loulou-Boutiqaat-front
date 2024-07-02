import React from 'react'
import { StyledCard } from './styled'
import { Link } from 'react-router-dom'

const Card = ({ img, id, name, background, description, setActive, isActive, card }) => {
  return (
    <StyledCard to='/' className={isActive && `active`} {...{ card }} onClick={() => setActive(id)}>
      <img src={background || img} alt="img" />
      <div>
        <header>
          <h3>{name}</h3>
          <p>{description}</p>
        </header>
        <footer>
          <Link to={`/home/categories/${id}`}>
            <p>View more</p>
          </Link>
          <Link to={`/home/categories/${id}`}>
            <button className="arrow">➡️</button>
          </Link>
        </footer>

      </div>
    </StyledCard>
  )
}

export default Card