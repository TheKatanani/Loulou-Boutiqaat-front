import axios from '../api/axios'
import { useDispatch } from 'react-redux'
import { resetUserInfo, setLogIn, setUser } from '../redux/reducers/auth'
import { useNavigate } from 'react-router-dom'

const useRefreshToken = () => {
  // setAuth
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const refresh = async () => {
    try {
      const res = await axios.get('/refresh', {
        withCredentials: true
      })
      dispatch(setLogIn(res.data.accessToken)) //update the current token
      dispatch(setUser(res.data.user))
      return res.data.accessToken;
    } catch (err) {
      //403 most error here 
      console.log(err)
      dispatch(resetUserInfo())
      navigate("/login")
    }
  }
  return refresh
}

export default useRefreshToken