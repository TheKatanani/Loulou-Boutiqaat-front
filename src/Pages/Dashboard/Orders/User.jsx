import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledBill as StyleUser } from './styled'
import { selectUsers, setUsers } from '../../../redux/reducers/users'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'

const User = ({ userId }) => {
  const users = useSelector(selectUsers)
  const user = users?.find(_user => _user.id === Number(userId) || _user.id === userId)
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    dispatch(setUsers({ axiosPrivate }))
  }, [axiosPrivate, dispatch])

  return (
    <StyleUser>
      <h3 style={{ marginBottom: 14, fontSize: '1.1rem', fontWeight: 800, color: '#6d28d9' }}>
        👤 بيانات العميل صاحب الطلب
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
        <thead>
          <tr style={{ background: 'rgba(109, 40, 217, 0.08)' }}>
            <th style={{ padding: '8px 12px' }}>#</th>
            <th style={{ padding: '8px 12px' }}>اسم العميل</th>
            <th style={{ padding: '8px 12px' }}>رقم الهاتف</th>
            <th style={{ padding: '8px 12px' }}>الجنس</th>
            <th style={{ padding: '8px 12px' }}>تاريخ الميلاد</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px 12px' }}><strong>#{user?.id || userId}</strong></td>
            <td style={{ padding: '10px 12px' }}><strong>{user?.name || 'غير معروف'}</strong></td>
            <td style={{ padding: '10px 12px', direction: 'ltr', textAlign: 'right' }}>{user?.phone || '-'}</td>
            <td style={{ padding: '10px 12px' }}>{user?.gender === 'female' ? 'أنثى' : user?.gender === 'male' ? 'ذكر' : '-'}</td>
            <td style={{ padding: '10px 12px' }}>{user?.barthDay || '-'}</td>
          </tr>
        </tbody>
      </table>
    </StyleUser>
  )
}

export default User