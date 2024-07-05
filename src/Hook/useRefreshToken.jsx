import axios from '../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserInfo, selectRememberMe, setLogIn } from '../redux/reducers/auth' 
import { useNavigate } from 'react-router-dom'

const useRefreshToken = () => {
  // setAuth
  const dispatch = useDispatch()
  const remeberMe = useSelector(selectRememberMe)
  const navigate = useNavigate()
  const refresh = async ()=>{
    try{  
      if(remeberMe){
        const res = await axios.get('/refresh',{
          withCredentials:true
        }) 
        dispatch(setLogIn(res.data.accessToken)) //update the current token
        return res.data.accessToken;
      }else{
        dispatch(resetUserInfo())
        navigate("/login")
      }
    }catch (err) {
      console.log(err)
      dispatch(resetUserInfo())
      navigate("/login")
    }
  }
  return refresh
}

export default useRefreshToken