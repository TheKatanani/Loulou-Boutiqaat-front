import React from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/reducers/products'
import { StyledBill } from './styled'

const Bill = ({ orders, paid = 0 }) => {
  const products = useSelector(selectProducts)
  let billTotal = 0
  return (
    <StyledBill>
      <table>
        <thead>
          <tr>
            <th className='id'>id</th>
            <th >product</th> 
            <th >quantity</th>
            <th >cost</th>
            <th >total</th>
          </tr>
        </thead>
        <tbody>
          {
            orders?.map(order => {
              const currentProduct = products?.find(pro => pro.id == order.productId)
              const price = currentProduct?.price || 0
              const total = price * order.quantity
              billTotal += total
              return (
                <tr key={order.productId} >
                  <td className='id'>{order?.productId}</td>
                  <td >{currentProduct?.name}</td>
                  <td >{order?.quantity}</td>
                  <td >{price}</td>
                  <td >{total}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <footer>
        <p>total: <span>{billTotal}₪</span></p>
        <p>paid: <span>{paid}₪</span></p>
      </footer>
    </StyledBill>
  )
}

export default Bill