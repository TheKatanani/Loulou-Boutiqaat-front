import { Link } from "react-router-dom"
import { StyledFallbackUI } from "./styled"
import errorImage from '../../../Images/something-lost.png'
import { Container, PrimaryButton } from "../../../Global/components"
const FallbackUI = () => {
  return (
    <StyledFallbackUI>
      <Container className="container">
        <div>
          <h2>...Oops!<br/> Something went wrong</h2>
          <p>Sorry but there is a problem in this page</p>
          <Link to='/'>
            <PrimaryButton>
              back to home bage
            </PrimaryButton>
          </Link>
        </div>
        <img src={errorImage} loading="lazy" alt="404error" />
      </Container>
    </StyledFallbackUI>
  )
}

export default FallbackUI