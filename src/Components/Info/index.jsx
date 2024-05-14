import React from 'react'
import Rating from '../Rating'
import { Info as InfoGloStyle } from '../../Global/components.js'
import { Correct, Reviews, Sold } from '../../Icons'
import { StyledInfo } from './styled'

export const Felid = ({ title, description }) => {
    return (
        <tr>
            <td><p>{title}</p></td>
            <td>{description}</td>
        </tr>)
}

const Info = () => {
    return (
        <StyledInfo>
            <span className='stock'><Correct /> In stock</span>
            <h6>Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle</h6>
            <InfoGloStyle>
                <Rating num="4" num2="9.3" />
                <p className='reviews'><Reviews /> 32 reviews</p>
                <p><Sold /> 154 sold</p>
            </InfoGloStyle>
            <div className="trade">
                <div>
                    <h6>$90.50</h6>
                    <p>50-100 pcs</p>
                </div>
                <div>
                    <h6 className='red'>$90.50</h6>
                    <p>700+ pcs</p>
                </div>
                <div>
                    <h6>$90.50</h6>
                    <p>100-700 pcs</p>
                </div>
            </div>
            <Felid title="Price: " description="Negotiable" />
            <hr />
            <Felid title="Type:  " description="Classic  shoes" />
            <Felid title="Material:  " description="Plastic material" />
            <Felid title="Design:  " description="Modern nice" />
            <hr />
            <Felid title="Customization:  " description="Customized logo and design custom packages" />
            <Felid title="Protection:  " description="Refund Policy" />
            <Felid title="Warranty:  " description="Negotiable" />
            <Felid title="Price: " description="2 years full warranty " />
            <hr />
        </StyledInfo>
    )
}

export default Info