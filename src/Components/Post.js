import React, { useEffect, useState } from 'react'
import axios from '../api/axios';

const Post = () => {
  const [data,setData]= useState('')
  useEffect(() => { 
    let isMounted = true;
    const controller = new AbortController()
      async function getUsers() {
        try {
          // const res = await fetch('http://localhost:5500/register',{
          //   method:'POST',
          //   body:{
          //     "name": 'mohammed anwer',
          //     "phone": '+972592588241',
          //     "password": '407873769',
          //     "gender": 'male',
          //     "barthDay": '19-4-2002',
          //   },
          //   credentials:'include'
          // })
          // const res = await axios.post('/register', { 
          //     "name": 'mohammed anwer',
          //     "phone": '+972592588241',
          //     "password": '407873769',
          //     "gendar": 'male',
          //     "barthDay": '19-4-2002',
          // },{
          //   withCredentials:true,
          //   signal:controller.signal
          // })
          const res = await axios.post('/login', {
            
              phone:'+972567124698',
              password:"123zxcZXC!@#"
            },{
              withCredentials:true,
              signal:controller.signal
          }) 
          isMounted && setData(res.data)

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
    <div>{JSON.stringify(data)}</div>
  )
}

export default Post