import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
import { deleteUser, selectAddUserState, selectMood, setUpdateUser } from '../../../redux/reducers/users'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'

const roleNames = {
  ADMIN: 'مدير النظام (Admin)',
  EDITOR: 'محرر المتجر (Editor)',
  USER: 'عميل المتجر (Customer)'
};

const Table = ({ users }) => {
  const dispatch = useDispatch()
  const mood = useSelector(selectMood)
  const { id } = useSelector(selectAddUserState)
  const axiosPrivate = useAxiosPrivate()

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th className='id'>#</th>
            <th className='name'>اسم المستخدم</th>
            <th className='phone'>رقم الهاتف</th>
            <th className='gender'>الجنس</th>
            <th className='barthDay'>تاريخ الميلاد</th>
            <th className='role'>الدور / الصلاحية</th>
            <th>تعديل</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => {
            const roleKey = Object.keys(user?.roles || {})[0] || 'USER';
            const roleLabel = roleNames[roleKey] || roleKey;
            return (
              <tr 
                key={user.id} 
                className={(mood === MOOD.UPDATE && user.id === id) ? `underUpdate` : undefined}
              >
                <td className='id'><strong>#{user.id}</strong></td>
                <td><strong>{user.name}</strong></td>
                <td className='phone'>{user.phone}</td>
                <td className='gender'>{user.gender === 'female' ? 'أنثى ♀' : 'ذكر ♂'}</td>
                <td className='barthDay'>{user?.barthDay || '-'}</td>
                <td className='role'>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: 12, 
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    background: roleKey === 'ADMIN' ? 'rgba(239, 68, 68, 0.1)' : roleKey === 'EDITOR' ? 'rgba(109, 40, 217, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: roleKey === 'ADMIN' ? '#ef4444' : roleKey === 'EDITOR' ? '#6d28d9' : '#10b981'
                  }}>
                    {roleLabel}
                  </span>
                </td>
                <td>
                  <button 
                    type="button"
                    className='update'
                    disabled={mood === MOOD.UPDATE && user.id === id}
                    onClick={() => {
                      dispatch(setUpdateUser({ user: { ...user, role: Object.keys(user.roles)[0] } }))
                    }}
                  >
                    ✏️ تعديل
                  </button>
                </td>
                <td>
                  <button 
                    type="button"
                    className='delete' 
                    disabled={mood === MOOD.UPDATE && user.id === id}
                    onClick={() => {
                      if (window.confirm(`هل أنت متأكد من حذف المستخدم: "${user.name}"؟`)) {
                        dispatch(deleteUser({ id: user.id, axiosPrivate }))
                      }
                    }}
                  >
                    🗑️ حذف
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </StyledTable>
  )
}

export default Table