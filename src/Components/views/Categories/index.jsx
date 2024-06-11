import React, { useEffect } from 'react'
import LogoLoading from '../../common/LogoLoading'
import { StyledCategories } from './styled'
import { STATUS } from '../../../Actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, selectStatus, setCategories } from '../../../redux/reducers/categories'
import {  selectPublishedProducts } from '../../../redux/reducers/products'

const Categories = () => {
  const categories = useSelector(selectCategories)
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
              if (product.count > 0) {
                return product
              }
            return undefined
          }) && category.isVisibile &&
            <category key={category.id} {...category} />
        })
      }
    </StyledCategories>
  )
}

export default Categories


