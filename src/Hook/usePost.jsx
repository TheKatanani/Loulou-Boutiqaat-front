import { useState } from 'react';
import useAxiosPrivate from './useAxiosPrivet';

const usePost = () => { 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate()
 
    const fetchData = async (url, postData) => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post(url, postData);
         return response.data 
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }; 

  return { fetchData, isLoading, error };
};

export default usePost;
