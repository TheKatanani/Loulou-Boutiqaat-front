import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
import { deleteUser, selectAddUserState, selectMood, setUpdateUser } from '../../../redux/reducers/users'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import { ButtonUpadte } from '../../../Global/components'
const Table = ({ users }) => {
  const dispatch = useDispatch()
  const mood = useSelector(selectMood)
  const { id } = useSelector(selectAddUserState)
  const axiosPrivate = useAxiosPrivate()
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className='id'>id</th>
          <th className='name'>name</th>
          <th className='phone'>phone</th>
          <th className='password'>password</th>
          <th className='gender'>gender</th>
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
              <td className='gender'>{user.gender}</td>
              <td className='barthDay'>{user?.barthDay}</td>
              <td className='role'>{Object.keys(user?.roles)[0]}</td>
              <td>
                <ButtonUpadte className='update'
                  disabled={mood === MOOD.UPDATE && user.id === id}
                  onClick={() => {
                    dispatch(setUpdateUser({ user: { ...user, role: Object.keys(user.roles)[0] } }))
                  }}
                >
                  update
                </ButtonUpadte>
              </td>
              <td>
                <button className='delete' disabled={mood === MOOD.UPDATE && user.id === id}
                  onClick={() => {
                    dispatch(deleteUser({ id: user.id, axiosPrivate }))
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