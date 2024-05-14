import React from 'react'
import styled from 'styled-components'
import { CatigotyData } from '../../Mock'
import ItemList from '../ItemList'
import Range from '../Range'

const AsideStyle=styled.aside`
    width:240px;
    ${({theme:{media}})=>`${media.xs} or (${media.s.split("@media")[1]} and (max-width: 992px))`}{ 
        display: none;
    }
`
const Aside = () => {
    return (
        <AsideStyle>
            <ItemList title="Categories" items={CatigotyData.li} type="li" />
            <ItemList title="Brands" items={CatigotyData.checkbox} type="checkbox" />
            <ItemList title="Materials" items={CatigotyData.checkbox2} type="checkbox" />
            <Range/>
            <ItemList title="Phone Type" items={CatigotyData.radio} type="radio" />
            <ItemList title="Rating" items={CatigotyData.checkbox3} type="checkbox" />
        </AsideStyle>
    )
}

export default Aside