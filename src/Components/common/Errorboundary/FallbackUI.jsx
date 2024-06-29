import { Link } from "react-router-dom"
import { StyledFallbackUI } from "./styled"

const FallbackUI = () => {
  return (
    <StyledFallbackUI>
      <h2>Something went wrong!</h2>
      <Link to='/'>back to home bage</Link>
    </StyledFallbackUI>
  )
}

export default FallbackUI