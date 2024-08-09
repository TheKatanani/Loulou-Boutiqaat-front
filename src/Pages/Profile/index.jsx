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
            <th>value</th>
            <th>update</th>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>{user?.id}</td>
              <td></td>
            </tr>
            <tr>
              <td>phone</td>
              <td>{user?.phone}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/phone`}>
                  update
                </ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>name</td>
              <td>{user?.name}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/name`}>
                  update
                </ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{user?.gender}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/gender`}>update</ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>Barth Day</td>
              <td>{user?.barthDay}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/barthDay`}>update</ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{user?.password}</td>
              <td>
                <ButtonUpadte as={Link} to={`updateUserInfo/password`}>update</ButtonUpadte>
              </td>
            </tr>
            <tr>
              <td>role</td>
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