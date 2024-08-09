import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, selectCategories, selectCategoriesFormData, selectMood, setUpdateCategory } from '../../../redux/reducers/categories'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import { selectProducts } from '../../../redux/reducers/products' 
import Alert from '../../../Components/common/Alert'
import { ButtonUpadte } from '../../../Global/components'
const Table = () => {
  const [message, setMessage] = useState()
  const [isAlert, setIsAlert] = useState(false)
  const categories = useSelector(selectCategories)
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  const { id } = useSelector(selectCategoriesFormData)
  const axiosPrivate = useAxiosPrivate()
  const mood = useSelector(selectMood)

  const handleCancellation = () => {
    setIsAlert(false)
    setMessage('')
  }
  const handelDelete = (categoryId) => {
    const catetoryProducts = products.reduce((count, item) => {
      if (item?.categoryId == categoryId) {
        return ++count
      }
      return count
    }, 0) 
    if (catetoryProducts > 0) {
      setMessage(`you can not delete this category, there ${catetoryProducts} products in this category`)
      setIsAlert(true)
    } else {
      dispatch(deleteCategory({ id: categoryId, axiosPrivate }))
    }
  }
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th className='description'>description</th>
          <th>background</th>
          <th>published</th>
          <th>update</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {
          categories?.map((category) => (
            <tr key={category?.id} className={(mood === MOOD.UPDATE && category.id === id) ? `underUpdate` : undefined}>
              <td>{category?.id}</td>
              <td>{category?.name}</td>
              <td className='description'>{category.description?.slice(0, 50)}...</td>
              <td className='images'>{
                <img src={category?.background} alt="" />
              }</td>
              <td>{category?.published ? 'True' : 'False'}</td>
              <td>
                <button className='update'
                  disabled={mood === MOOD.UPDATE && category?.id === id}
                  onClick={() => {
                    dispatch(setUpdateCategory({ category }))
                  }}
                >
                  update
                </button>
              </td>
              <td>
                <ButtonUpadte className='delete' disabled={mood === MOOD.UPDATE && category?.id === id}
                  onClick={() => {
                    handelDelete(category.id)
                  }}>
                  delete
                </ButtonUpadte>
              </td>
              {
                isAlert &&
                <Alert {...{ message }} link={{ path: `/dashboard/addcategory/${category.id}`, message: 'view the products' }} cancel={handleCancellation}/>
              }
            </tr>
          ))
        }
      </tbody>
    </StyledTable>
  )
}

export default Table