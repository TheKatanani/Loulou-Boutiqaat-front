import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, selectAddProductsState, selectMood, selectProducts, setUpdateProduct } from '../../../redux/reducers/products'
import { selectCategories } from '../../../redux/reducers/categories'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
const Table = () => {
  const products = useSelector(selectProducts)
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const { id } = useSelector(selectAddProductsState)
  const mood = useSelector(selectMood)
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className='id'>id</th>
          <th>name</th>
          <th className='description'>description</th>
          <th>price</th>
          <th className='previous'>pre price</th>
          <th className='images'>images</th>
          <th className='count'>count</th>
          <th className='stars'>stars</th>
          <th>category</th>
          <th>visibility</th>
          <th>update</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {
          products?.map(product => (
            <tr key={product.id} className={(mood === MOOD.UPDATE && product.id === id) ? `underUpdate` : undefined}>
              <td className='id'>{product.id}</td>
              <td>{product.name}</td>
              <td className='description'>{product.description?.slice(0, 50)}...</td>
              <td>{product.price}</td>
              <td className='previous'>{product.prevPrice}</td>
              <td className='images'>{
                product?.images && typeof (product.images) === 'string' ? JSON.parse(product.images) : product.images?.map((img, i) => (
                  <img key={i} src={img} alt="" />
                ))
              }</td>
              <td className='count'>{product?.count}</td>
              <td className='stars'>{product.stars}</td>
              <td>{categories.find(el => el.id == product.categoryId)?.name
              }</td>
              <td className='visibility'>{product?.published == 1 || product?.published === undefined ? 'published' : 'unpublished'}</td>
              <td>
                <button className='update'
                  disabled={mood === MOOD.UPDATE && product.id === id}
                  onClick={() => {
                    dispatch(setUpdateProduct({ product }))
                  }}
                >
                  update
                </button>
              </td>
              <td>
                <button className='delete' disabled={mood === MOOD.UPDATE && product.id === id}
                  onClick={() => {
                    dispatch(deleteProduct({ id: product.id,axiosPrivate }))
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