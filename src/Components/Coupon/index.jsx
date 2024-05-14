import React, { useState } from 'react'
import { WhitePrimaryButton } from '../../Global/components';
import Input from '../Input'
import { CouponStyled } from './styled'

const Coupon = () => {
  const [coupon, setCoupon] = useState("");

  return (
    <CouponStyled>
      <div className="myInput">
        <Input
          onChange={(e) => setCoupon(e.target.value)}
          id="name"
          type="text"
          placeholder="Email or phone"
          label="Have a coupon?"
          value={coupon}
        />
        <WhitePrimaryButton>Apply</WhitePrimaryButton>
      </div>
    </CouponStyled>
  )
}

export default Coupon