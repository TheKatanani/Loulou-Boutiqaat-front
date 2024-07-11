import { useSelector } from 'react-redux'
import { StyledAdd } from '../sytled.js'
import Form from './Form.jsx'
import Table from './Table.jsx'
import { selectProducts } from '../../../redux/reducers/products.js'
import Input from '../../../Components/Input/index.jsx'
import { useEffect, useState } from 'react'

const AddProduct = () => {
  const products = useSelector(selectProducts)
  const [visibleProducts, setVisibleProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchChanged = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }
  useEffect(() => {
    if (visibleProducts.length <= 0 || searchTerm.length <= 0) {
      setVisibleProducts(products)
    }
  }, [visibleProducts, products , searchTerm])
  useEffect(() => {
    if (searchTerm) {
      const visible = products.filter(product => product.name.includes(searchTerm))
      setVisibleProducts(visible)
    }
  }, [searchTerm, products])

  return (
    <StyledAdd>
      <Form /> 
      <Input
        label="Search By Product Name"
        type='text'
        id='search'
        placeholder='search term'
        onChange={handleSearchChanged}
        value={searchTerm}
      />
      <Table products={visibleProducts} />
    </StyledAdd>
  )
}

export default AddProduct