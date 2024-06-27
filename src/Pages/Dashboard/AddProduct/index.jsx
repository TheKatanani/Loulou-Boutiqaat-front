import { useSelector } from 'react-redux'
import { StyledAdd } from '../sytled.js'
import Form from './Form.jsx'
import Table from './Table.jsx' 
import { selectProducts } from '../../../redux/reducers/products.js'

const AddProduct = () => { 
  const products = useSelector(selectProducts)
  return (
    <StyledAdd>
      <Form/>
      <Table products={products}/>
    </StyledAdd>
  )
}

export default AddProduct