import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/auth'
import { StyledProfile } from './styled'
import { ButtonUpadte, Container } from '../../Global/components'
import { StyledTable } from '../Dashboard/sytled'
import { ROLES } from '../../Actions'
import { Link } from 'react-router-dom'

const roleDisplay = {
  [ROLES.ADMIN]: 'مدير النظام (Admin)',
  [ROLES.EDITOR]: 'محرر المتجر (Editor)',
  [ROLES.USER]: 'عميل مميز (Customer)'
};

const Profile = () => {
  const user = useSelector(selectUser)
  return (
    <StyledProfile>
      <Container className='container'>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #6d28d9, #d4af37)', 
            color: '#ffffff', 
            fontSize: '2.2rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(109, 40, 217, 0.25)',
            marginBottom: 12
          }}>
            👤
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.name || 'الملف الشخصي'}</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>إدارة وتعديل بيانات حسابكِ في لولو بوتيكات</p>
        </div>

        <StyledTable style={{ maxWidth: 650, margin: '0 auto' }}>
          <table>
            <thead>
              <tr>
                <th>البيان</th>
                <th>القيمة</th>
                <th style={{ textAlign: 'center' }}>إجراء</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>رقم الجوال</strong></td>
                <td style={{ direction: 'ltr', textAlign: 'right' }}>{user?.phone}</td>
                <td style={{ textAlign: 'center' }}>
                  <ButtonUpadte as={Link} to={`updateUserInfo/phone`}>
                    ✏️ تعديل
                  </ButtonUpadte>
                </td>
              </tr>
              <tr>
                <td><strong>الاسم الكامل</strong></td>
                <td>{user?.name}</td>
                <td style={{ textAlign: 'center' }}>
                  <ButtonUpadte as={Link} to={`updateUserInfo/name`}>
                    ✏️ تعديل
                  </ButtonUpadte>
                </td>
              </tr>
              <tr>
                <td><strong>الجنس</strong></td>
                <td>{user?.gender === 'female' ? 'أنثى ♀' : user?.gender === 'male' ? 'ذكر ♂' : '-'}</td>
                <td style={{ textAlign: 'center' }}>
                  <ButtonUpadte as={Link} to={`updateUserInfo/gender`}>
                    ✏️ تعديل
                  </ButtonUpadte>
                </td>
              </tr>
              <tr>
                <td><strong>تاريخ الميلاد</strong></td>
                <td>{user?.barthDay || '-'}</td>
                <td style={{ textAlign: 'center' }}>
                  <ButtonUpadte as={Link} to={`updateUserInfo/barthDay`}>
                    ✏️ تعديل
                  </ButtonUpadte>
                </td>
              </tr>
              <tr>
                <td><strong>كلمة المرور</strong></td>
                <td>••••••••</td>
                <td style={{ textAlign: 'center' }}>
                  <ButtonUpadte as={Link} to={`updateUserInfo/password`}>
                    ✏️ تغيير
                  </ButtonUpadte>
                </td>
              </tr>
              <tr>
                <td><strong>نوع الحساب / الصلاحية</strong></td>
                <td>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: 12, 
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    background: 'rgba(109, 40, 217, 0.1)',
                    color: '#6d28d9'
                  }}>
                    {roleDisplay[user?.role] || 'عميل'}
                  </span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </StyledTable>
      </Container>
    </StyledProfile>
  )
}

export default Profile