import React from 'react' 
import { Container } from '../../Global/components' 
import MyCart from '../../Components/MyCart'
// import Coupon from '../../Components/Coupon'
import Summary from '../../Components/Summary' 
import { PageStyled } from './styled'

const Cart = () => {
  return (
    <PageStyled> 
      <Container>
        <div className="flex">
          <MyCart/>
          <aside>
            {/* <Coupon/> */}
            <Summary/>
          </aside>
        </div> 
        {/* <DiscountSlide/> */}
      </Container> 
    </PageStyled>
  )
}

export default Cart;