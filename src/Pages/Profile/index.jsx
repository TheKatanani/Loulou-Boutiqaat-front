import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/auth'
import { StyledProfile } from './styled'
import { ButtonUpadte, Container } from '../../Global/components'
import { StyledTable } from '../Dashboard/sytled'
import { ROLES } from '../../Actions'
import { Link } from 'react-router-dom'
const Profile = () => {
  const user = useSelector(selectUser)
  return (
    <StyledProfile>
      <Container className='container'>
        <StyledTable>
          <thead>
            <th>#</th>
            <th>القيمة</th>
            <th>تعديل</th>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>{user?.id}</td>
              <td></td>
            </tr>
            <tr>
              <td>رقم الجوال</td>
              <td>{user?.phone}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/phone`}>
                  تعديل
                </ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>الاسم</td>
              <td>{user?.name}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/name`}>
                  تعديل
                </ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>الجنس</td>
              <td>{user?.gender}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/gender`}>تعديل</ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>تاريخ الميلاد</td>
              <td>{user?.barthDay}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/barthDay`}>تعديل</ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>كلمة المرور</td>
              <td>********</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/password`}>تعديل</ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>الصلاحية</td>
              <td>{Object.keys(ROLES)[Object.values(ROLES).indexOf(user.role)]}</td>
              <td></td>
            </tr>
          </tbody>
        </StyledTable>
      </Container>
    </StyledProfile>
  )
}

export default Profile