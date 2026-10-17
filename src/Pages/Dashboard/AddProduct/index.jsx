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
    if (!searchTerm) {
      setVisibleProducts(products)
    } else {
      const visible = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setVisibleProducts(visible)
    }
  }, [searchTerm, products])

  return (
    <StyledAdd>
      <Form /> 
      <div className="searchContainer">
        <Input
          label="بحث سريع في قائمة المنتجات"
          type='text'
          id='search'
          placeholder='اكتبي اسم المنتج للبحث...'
          onChange={handleSearchChanged}
          value={searchTerm}
        />
      </div>
      <Table products={visibleProducts} />
    </StyledAdd>
  )
}

export default AddProduct