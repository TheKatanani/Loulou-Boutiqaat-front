import React from 'react'
import { StyledCard } from './styled'
import { Link } from 'react-router-dom'

const Card = ({ img, id, name, background, description, setActive, isActive, card }) => {
  return (
    <StyledCard to='/' className={isActive && `active`} {...{ card }} onClick={() => setActive(id)}>
      <img loading="lazy" src={background || img} alt="img" />
      <div>
        <header>
          <h3>{name}</h3>
          <p>{description}</p>
        </header>
        <footer>
          <Link to={`/home/الأقسام/${id}`}>
            <p>View more</p>
          </Link>
          <Link to={`/home/الأقسام/${id}`}>
            <button className="arrow">➡️</button>
          </Link>
        </footer>

      </div>
    </StyledCard>
  )
}

export default Card