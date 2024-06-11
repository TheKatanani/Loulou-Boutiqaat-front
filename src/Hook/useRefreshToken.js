import axios from '../api/axios'
import { useDispatch } from 'react-redux'
import { setLogIn } from '../redux/reducers/auth' 

const useRefreshToken = () => {
  // setAuth
  const dispatch = useDispatch()
  const refresh = async ()=>{
    try{  
      const res = await axios.get('/refresh',{
        withCredentials:true
      }) 
      dispatch(setLogIn(res.data.accessToken)) //update the current token
      return res.data.accessToken;
    }catch (err) {
      console.log(err)
    }
  }
  return refresh
}

export default useRefreshToken