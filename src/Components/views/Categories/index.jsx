import React, { useEffect } from 'react'
import LogoLoading from '../../common/LogoLoading'
import { StyledCategories } from './styled'
import { STATUS } from '../../../Actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectPublishedCategoryies, selectStatus, setCategories } from '../../../redux/reducers/categories'
import {  selectPublishedProducts } from '../../../redux/reducers/products'
import Category from './Category'

const Categories = () => {
  const categories = useSelector(selectPublishedCategoryies)
  const products = useSelector(selectPublishedProducts)
  const status = useSelector(selectStatus)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCategories())
  }, [dispatch])
  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }
  return (
    <StyledCategories>
      {
        categories?.map((category) => {
          return products.find(product => {
            if (product.categoryId == category.id) 
                return product 
            return undefined
          })  &&
            <Category key={category.id} {...category} />
        })
      }
    </StyledCategories>
  )
}

export default Categories


