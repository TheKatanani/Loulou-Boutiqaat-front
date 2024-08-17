import React from 'react'
import img2 from '../../Images/image 21.png'
import img3 from "../../Images/Logo2.png"
import img4 from "../../Images/Logo3.png"
import img5 from "../../Images/Visa.png"
import { LiSignIn } from '../../Global/components'
import { PaymentsStyled } from './styled'

const Payments = () => {
  return (
    <PaymentsStyled>
      <LiSignIn><img loading="lazy" src={img2} alt="1" /></LiSignIn>
      <LiSignIn><img loading="lazy" src={img3} alt="2" /></LiSignIn>
      <LiSignIn><img loading="lazy" src={img4} alt="3" /></LiSignIn>
      <li><img loading="lazy" src={img5} alt="4" /></li>
    </PaymentsStyled>
  )
}

export default Payments