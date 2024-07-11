import { useEffect, useState } from 'react'
import { StyledAdd } from '../sytled.js'
import Form from './Form.jsx'
import Table from './Table.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers, setUsers } from '../../../redux/reducers/users.js'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet.js'
import Input from '../../../Components/Input/index.jsx'

const AddUser = () => {
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const [visibleUsers, setVisibleUsers] = useState(users)
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchChanged = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }
  useEffect(() => {
    if (visibleUsers.length <= 0 || searchTerm.length <= 0) {
      setVisibleUsers(users)
    }
  }, [visibleUsers, users, searchTerm])
  useEffect(() => {
    if (searchTerm) {
      const visible = users.filter(product => product.name.includes(searchTerm))
      setVisibleUsers(visible)
    }
  }, [searchTerm, users])
  useEffect(() => {
    dispatch(setUsers({ axiosPrivate }))
  }, [dispatch, axiosPrivate])
  return (
    <StyledAdd>
      <Form />
      <Input
        label="Search By User Name"
        type='text'
        id='search'
        placeholder='search term'
        onChange={handleSearchChanged}
        value={searchTerm}
      />
      <Table users={visibleUsers} />
    </StyledAdd>
  )
}

export default AddUser