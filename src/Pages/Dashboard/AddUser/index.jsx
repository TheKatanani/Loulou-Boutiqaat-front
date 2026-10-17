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
    if (!searchTerm) {
      setVisibleUsers(users)
    } else {
      const visible = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.phone.includes(searchTerm)
      )
      setVisibleUsers(visible)
    }
  }, [searchTerm, users])

  useEffect(() => {
    dispatch(setUsers({ axiosPrivate }))
  }, [dispatch, axiosPrivate])

  return (
    <StyledAdd>
      <Form />
      <div className="searchContainer">
        <Input
          label="بحث في قائمة المستخدمين (بالاسم أو رقم الهاتف)"
          type='text'
          id='search'
          placeholder='اكتب اسم المستخدم أو رقم الهاتف للبحث...'
          onChange={handleSearchChanged}
          value={searchTerm}
        />
      </div>
      <Table users={visibleUsers} />
    </StyledAdd>
  )
}

export default AddUser