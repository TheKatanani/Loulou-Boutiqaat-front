import { useDispatch, useSelector } from 'react-redux'
import { StyledAdd } from '../sytled.js'
import Form from './Form.jsx'
import Table from './Table.jsx'
import { setProducts, selectProducts, selectPublishedProducts } from '../../../redux/reducers/products.js'
import Input from '../../../Components/Input/index.jsx'
import { useEffect, useState } from 'react'

const AddProduct = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const publishedProducts = useSelector(selectPublishedProducts)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(setProducts())
  }, [dispatch])

  const allProducts = (products && products.length > 0) ? products : (publishedProducts || [])
  const [visibleProducts, setVisibleProducts] = useState(allProducts)

  const handleSearchChanged = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  useEffect(() => {
    const source = (products && products.length > 0) ? products : (publishedProducts || [])
    if (!searchTerm) {
      setVisibleProducts(source)
    } else {
      const visible = source.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setVisibleProducts(visible)
    }
  }, [searchTerm, products, publishedProducts])

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
