import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, selectCategories, selectCategoriesFormData, selectMood, setUpdateCategory } from '../../../redux/reducers/categories'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
const Table = () => {
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  const { id } = useSelector(selectCategoriesFormData)
  const axiosPrivate = useAxiosPrivate()
  const mood = useSelector(selectMood)
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
                <button className='delete' disabled={mood === MOOD.UPDATE && category?.id === id}
                  onClick={() => {
                    dispatch(deleteCategory({ id: category?.id, axiosPrivate }))
                  }}>
                  delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </StyledTable>
  )
}

export default Table