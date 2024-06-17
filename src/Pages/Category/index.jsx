import React from 'react'
import { useParams } from 'react-router-dom'
import LogoLoading from '../../Components/common/LogoLoading'
import CategoryComp from '../../Components/views/Categories/Category'
import { selectPublishedCategoryies } from '../../redux/reducers/categories'
import { useSelector } from 'react-redux'
import { selectStatus } from '../../redux/reducers/categories'
import { STATUS } from '../../Actions'

const Category = () => {
  const { categoryId } = useParams() 
  const categories = useSelector(selectPublishedCategoryies)
  const status = useSelector(selectStatus)
  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }
  const category = categories?.find((category) => category.id == categoryId)

  return (
    <div style={{ minHeight: '100dvh' }}>
      {
        <CategoryComp key={categoryId} {...category} />
      }
    </div>
  )
}

export default Category