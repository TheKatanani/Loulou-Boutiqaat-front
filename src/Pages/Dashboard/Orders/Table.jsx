import { useDispatch } from 'react-redux'
import { StyledTable } from '../sytled'
import { removeOrder, updateOrder } from '../../../redux/reducers/orders'
import Checkbox from '../../../Components/Checkbox'
import PortalCard from '../../../Components/UI/PortalCard'
import Bill from './Bill'
import User from './User'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'

const Table = ({ orders, handlePillShow, handleUserShow, bill, setBill, userState, setUserState }) => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  const handleCheckBoxChange = (orderId, value) => {
    dispatch(updateOrder({ orderId, data: { status: value }, axiosPrivate }))
  }
  return (
    <StyledTable >
      <thead>
        <tr>
          <th className='id'>id</th>
          <th >user</th>
          <th >orders</th>
          <th >location</th>
          <th >total Cost</th>
          <th >paid</th>
          <th >createdAt</th>
          <th>delete</th>
          <th >status</th>
        </tr>
      </thead>
      {
        orders.length ?
          <tbody>
            {
              orders?.map(order => (
                <tr key={order.id}>
                  <td className='id'>{order?.id}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleUserShow(order?.userId)}>view the user</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handlePillShow(order?.orders)}>view the bill</td>
                  <td >{order?.location}</td>
                  <td >{order?.totalCost}</td>
                  <td >{order?.paid}</td>
                  <td >{order?.createdAt}</td>
                  <td>
                    <button className='delete'
                      onClick={() => {
                        dispatch(removeOrder({ orderId: order.id, axiosPrivate }))
                      }}>
                      delete
                    </button>
                  </td>
                  {/* <td>{order?.status}</td> */}
                  <td>
                    <Checkbox id="status" onChange={(e) => { handleCheckBoxChange(order?.id, e.target.checked) }} checked={order?.status} />
                  </td>
                </tr>
              ))
            }
          </tbody>
          :
          <tbody>
            <tr>
              No Orders
            </tr>
          </tbody>
      }
      {
        bill.show &&
        <PortalCard onClick={() => setBill(prev => ({ ...prev, show: !bill.show }))}>
          <Bill orders={bill?.orders} />
        </PortalCard>
      }
      {
        userState.show &&
        <PortalCard onClick={() => setUserState(prev => ({ ...prev, show: !userState.show }))}>
          <User userId={userState.userId} />
        </PortalCard>
      }
    </StyledTable>
  )
}

export default Table