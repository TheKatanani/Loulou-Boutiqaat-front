import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
import { deleteUser, selectAddUserState, selectMood, selectUsers, setUpdateUser } from '../../../redux/reducers/users'
const Table = () => {
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  const mood = useSelector(selectMood)
  const { id } = useSelector(selectAddUserState)
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className='id'>id</th>
          <th className='name'>name</th>
          <th className='phone'>phone</th>
          <th className='password'>password</th>
          <th className='gendar'>gendar Price</th>
          <th className='barthDay'>barthDay</th>
          <th className='role'>role</th>
          <th>update</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {
          users?.map(user => (
            <tr key={user.id} className={(mood === MOOD.UPDATE && user.id === id) ? `underUpdate` : undefined}>
              <td className='id'>{user.id}</td>
              <td className='name'>{user.name}</td>
              <td className='phone'>{user.phone}</td>
              <td className='password'>{user.password}</td>
              <td className='gendar'>{user.gendar}</td>
              <td className='barthDay'>{user?.barthDay}</td>
              <td className='role'>{user?.role}</td>
              <td>
                <button className='update'
                  disabled={mood === MOOD.UPDATE && user.id === id}
                  onClick={() => { 
                    dispatch(setUpdateUser({ user }))
                  }}
                >
                  update
                </button>
              </td>
              <td>
                <button className='delete' disabled={mood === MOOD.UPDATE && user.id === id}
                  onClick={() => {
                    dispatch(deleteUser({ id: user.id }))
                  }}>
                  delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </StyledTable>
  )
}

export default Table