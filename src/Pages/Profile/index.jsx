import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/auth'
import { StyledProfile } from './styled'
import { Container } from '../../Global/components'
import { StyledTable } from '../Dashboard/sytled'
import { Link } from 'react-router-dom'
import { ROLES } from '../../Actions'
const Profile = () => {
  const user = useSelector(selectUser)
   return (
    <StyledProfile>
      <Container className='container'>
        <StyledTable>
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>role</td>
              <td>gender</td>
              <td>barthDay</td>
              <td>password</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{
                Object.keys(ROLES)[Object.values(ROLES).indexOf(user.role)]
              }</td>
              <td>{user.gender}</td>
              <td>{user.barthDay}</td>
              <td>{user.password}</td>
            </tr>
          </tbody>
        </StyledTable>
        <Link to={'/home/updateInfo'}>update information</Link>
      </Container>
    </StyledProfile>
  )
}

export default Profile