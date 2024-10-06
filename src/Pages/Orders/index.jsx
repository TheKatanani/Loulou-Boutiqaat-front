import OrderList from './OrderList'
import { StayledOrders } from './styled' 
import { Container } from '../../Global/components'

const Orders = () => {
  return (
    <Container>
      <StayledOrders>
        <h1>الطلبات</h1>
        <OrderList />
      </StayledOrders >
    </Container>
  )
}
export default Orders