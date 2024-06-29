import { Link } from 'react-router-dom'
import PortalCard from '../../UI/PortalCard'
import { StyledAlert } from './styled'

const Alert = ({message, link,cancel}) => {
  return (
    <PortalCard>
      <StyledAlert>
        <span className='cancel' onClick={cancel}>x</span>
        <p>{message}</p>
        {
          link &&
          <Link to={link?.path}>{link.message}</Link>
        }
      </StyledAlert>
    </PortalCard>
  )
}

export default Alert