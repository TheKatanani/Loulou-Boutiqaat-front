import React from 'react'
import { Seller, Worldwide } from '../../Icons'
import { SupplierStyled } from './styled'
import img from '../../Images/DE@2x.png'
import { MainButton } from '../../Global/components'
const Supplier = () => {
  return (
    <SupplierStyled>
      <div className="header">
        <div className="img">
          <span>R</span>
        </div>
        <div className="text">
          <p>Supplier</p>
          <p>Guanjoi Trading LLC</p>
        </div>
      </div>
      <div className="body">
        <p><span className='icon'><img src={img} alt="" /></span>Germany, Berlin</p>
        <p><span className='icon'><Seller/></span>Verified Seller</p>
        <p><span className='icon'><Worldwide/></span>Worldwide shipping</p>
      </div>
      <MainButton>Send inquiry</MainButton>
      <MainButton>Seller's profile</MainButton>
    </SupplierStyled>
  )
}

export default Supplier