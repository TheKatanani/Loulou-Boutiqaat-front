import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, selectAddProductsState, selectMood, setUpdateProduct } from '../../../redux/reducers/products'
import { selectCategories } from '../../../redux/reducers/categories'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import { ButtonUpadte } from '../../../Global/components'
const Table = ({ products }) => {
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const { id } = useSelector(selectAddProductsState)
  const mood = useSelector(selectMood)
  return (
    <StyledTable style={{ margin: '10px 0' }}>
      <thead>
        <tr>
          <th className='id'>id</th>
          <th>name</th>
          <th className='description'>description</th>
          <th className='price'>price</th>
          <th className='previous'>pre price</th>
          <th className='images'>images</th>
          <th className='stars'>stars</th>
          <th className='category'>category</th>
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
              <td className='price'>{product.price}</td>
              <td className='previous'>{product.prevPrice}</td>
              <td className='images'>{
                product?.images && typeof (product.images) === 'string' ? JSON.parse(product.images) : product.images?.map((img, i) => (
                  <img loading="lazy" key={i} src={img} alt="product img" />
                ))
              }</td>
              <td className='stars'>{product.stars}</td>
              <td className='category'>{categories.find(el => el.id == product.categoryId)?.name
              }</td>
              <td className='visibility'>{product?.published == 1 || product?.published === undefined ? 'published' : 'unpublished'}</td>
              <td>
                <ButtonUpadte className='update'
                  disabled={mood === MOOD.UPDATE && product.id === id}
                  onClick={() => {
                    dispatch(setUpdateProduct({ product }))
                  }}
                >
                  update
                </ButtonUpadte>
              </td>
              <td>
                <button className='delete' disabled={mood === MOOD.UPDATE && product.id === id}
                  onClick={() => {
                    dispatch(deleteProduct({ id: product.id, axiosPrivate }))
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