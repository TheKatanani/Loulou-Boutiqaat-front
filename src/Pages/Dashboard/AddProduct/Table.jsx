import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, selectAddProductsState, selectMood, selectProducts, setUpdateProduct } from '../../../redux/reducers/products'
import { selectCatigories } from '../../../redux/reducers/catigories'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
const Table = () => {
  const products = useSelector(selectProducts)
  const catigories = useSelector(selectCatigories)
  const dispatch = useDispatch()
  const { id } = useSelector(selectAddProductsState)
  const mood = useSelector(selectMood)
  return ( 
      <StyledTable>
        <thead>
          <tr>
            <th className='id'>id</th>
            <th>name</th>
            <th className='discription'>discription</th>
            <th>price</th>
            <th className='previous'>pre price</th>
            <th className='images'>images</th>
            <th className='count'>count</th>
            <th className='stars'>stars</th>
            <th>catigory</th>
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
                <td className='discription'>{product.discription?.slice(0, 50)}...</td>
                <td>{product.price}</td>
                <td className='previous'>{product.previousPrice}</td>
                <td className='images'>{
                  product?.images?.map((img, i) => (
                    <img key={i} src={img} alt="" />
                  ))
                }</td>
                <td className='count'>{product?.count}</td>
                <td className='stars'>{product.stars}</td>
                <td>{catigories.find(el => el.id == product.catigoryId)?.name
                }</td>
                <td className='visibility'>{product?.isVisibile == 1 || product?.isVisibile === undefined ?'visibile':'hidden' }</td>
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
                      dispatch(deleteProduct({ id: product.id }))
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