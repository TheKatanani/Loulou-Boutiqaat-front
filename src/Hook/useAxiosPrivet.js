import {
  axiosPrivate
} from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import {
  useSelector
} from "react-redux";
import { 
  selectToken
} from "../redux/reducers/auth";
import {
  useEffect
} from "react";
const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const token = useSelector(selectToken)  
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      }, (err) => Promise.reject(err)

    )
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (err) => {
        const prevRequest = err?.config;
        // if (err?.response?.status === 403) { 
        if (err?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true
          const newRefreshToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newRefreshToken}`
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err)
      }
    )
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [token, refresh])
  return axiosPrivate
}
export default useAxiosPrivate