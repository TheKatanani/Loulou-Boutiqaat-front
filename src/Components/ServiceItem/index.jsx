import React from 'react'
import { CardStyle } from './Styled'
const SerciseItem = ({ bg, Icon, text }) => {
    return (
        <CardStyle src={bg}>
            <div className="bg"></div>
            <div className="content">
                <p>{text}</p>
                <div className="icon">
                    <Icon />
                </div>
            </div>
        </CardStyle>
    )
}

export default SerciseItem