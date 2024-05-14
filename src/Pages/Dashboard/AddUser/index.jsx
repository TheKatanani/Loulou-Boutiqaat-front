import { useEffect } from 'react'
import { StyledAdd } from '../sytled.js'
import Form from './Form.jsx'
import Table from './Table.jsx' 
import { useDispatch } from 'react-redux'
import { setUsers } from '../../../redux/reducers/users.js'

const AddUser = () => {
  const dispatch = useDispatch() 
  useEffect(()=>{
    dispatch(setUsers())
  })
  return (
    <StyledAdd>
      <Form/>
      <Table/>
    </StyledAdd>
  )
}

export default AddUser