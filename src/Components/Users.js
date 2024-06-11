import React, {
  useEffect,
  useState
} from 'react'
import axios from '../api/axios';
import useRefreshToken from '../Hook/useRefreshToken';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/reducers/auth';
const Users = () => {
  const [users, setUsers] = useState();
  const accessToken = useSelector(selectToken)
  const refresh = useRefreshToken()
  console.log('accessToken',accessToken)
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController()
      async function getUsers() {
        try {
          const res = await axios.get('/users', {
            signal: controller.signal,
            headers:{
              'Authorization':`Bearer ${accessToken}`
            }
          })
          console.log(res.data)
          isMounted && setUsers(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      getUsers()
    return () => {
      isMounted = false
      controller.abort()
    }
  },[])
  return ( 
    <div > 
      {
        users?.map(user=>(
          <p key={user.id}>{JSON.stringify(user)}</p>
        ))
      }
      <p>{accessToken}</p>
      <button onClick={refresh}>Refresh</button>
    </div>
  )
}

export default Users