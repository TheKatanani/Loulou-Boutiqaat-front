import { useEffect } from 'react'
import { StyledAdd } from '../sytled.js'
import Form from './Form.jsx'
import Table from './Table.jsx'
import { useDispatch } from 'react-redux'
import { setUsers } from '../../../redux/reducers/users.js'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet.js'

const AddUser = () => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    dispatch(setUsers({ axiosPrivate }))
  }, [dispatch, axiosPrivate])
  return (
    <StyledAdd>
      <Form />
      <Table />
    </StyledAdd>
  )
}

export default AddUser