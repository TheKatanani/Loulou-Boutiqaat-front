import React from 'react'
import { FeatureItemStyled } from './styled'

const FeatureItem = ({Icon,title,description}) => {
  return (
    <FeatureItemStyled>
        <div className="iconArea">
            <Icon/>
        </div>
        <div className="text">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </div>
    </FeatureItemStyled>
  )
}

export default FeatureItem