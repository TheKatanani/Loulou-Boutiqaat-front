import React from 'react'
import Table from '../AddProduct/Table'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/reducers/products'
import Form from '../AddProduct/Form'
const CategoryProducts = () => {
  const { categoryId } = useParams()
  const products = useSelector(selectProducts)
  const categoryProducts = products.filter(product => product.categoryId == categoryId)
  return (
    <div>
      <Form />
      <Table products={categoryProducts} />
    </div>
  )
}

export default CategoryProducts