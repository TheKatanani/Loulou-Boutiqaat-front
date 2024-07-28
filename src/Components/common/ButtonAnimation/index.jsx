import { StyledButton } from "./styled"
import { STATUS } from "../../../Actions"

const ButtonAnimation = ({ children, status, className, disabled = false,onClick }) => {
  return (
    <StyledButton onClick={onClick} type="submit" className={className || undefined} disabled={disabled}>
      {
        !(status === STATUS.LOADING) ?
          <p>{children}</p>
          :
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
      }
    </StyledButton>
  )
}

export default ButtonAnimation