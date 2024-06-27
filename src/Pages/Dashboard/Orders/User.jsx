import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledBill as StyleUser } from './styled'
import { selectUsers, setUsers } from '../../../redux/reducers/users'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'

const User = ({ userId }) => {
  const users = useSelector(selectUsers)
  const user = users.find(_user => _user.id == userId)
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    dispatch(setUsers(axiosPrivate))
  }, [axiosPrivate, dispatch])
  return (
    <StyleUser>
      <table>
        <thead>
          <tr>
            <th className='id'>id</th>
            <th >name</th>
            <th >phone</th>
            <th className='gender'>gender</th>
            <th className='barthDay'>barthDay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='id'>{user?.id}</td>
            <td >{user?.name}</td>
            <td >{user?.phone}</td>
            <td className='gender'>{user?.gender}</td>
            <td className='barthDay'>{user?.barthDay}</td>
          </tr>
        </tbody>
      </table>
    </StyleUser>
  )
}

export default User