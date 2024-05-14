import React from 'react'
import { StyledCard } from './styled'

const Card = ({ img, id, name, background, discription, setActive, isActive, card }) => {
  return (
    <StyledCard to='/' className={isActive && `active`} {...{ card }} onClick={() => setActive(id)}>
      <img src={background||img} alt="img" />
      <div>
        <header>
          <h3>{name}</h3>
          <p>{discription}</p>
        </header>
        <footer>
          <p>lorem lorem lorem</p>
          <button className="arrow">➡️</button>
        </footer>

      </div>
    </StyledCard>
  )
}

export default Card