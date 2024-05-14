import React, { useEffect } from 'react'
import LogoLoading from '../../common/LogoLoading'
import Catigory from './Catigory'
import { StyledCatigories } from './styled'
import { STATUS } from '../../../Actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectCatigories, selectStatus, setCatigories } from '../../../redux/reducers/catigories'
import { selectProducts } from '../../../redux/reducers/products'

const Catigories = () => {
  const catigories = useSelector(selectCatigories)
  const products = useSelector(selectProducts)
  const status = useSelector(selectStatus)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCatigories())
  },[dispatch])
  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }
  return (
    <StyledCatigories>
      {
        catigories?.map((catigory) => { 
          return products.find(product => {
            if (product.catigoryId == catigory.id)
              if (product.count > 0 && parseInt(product.isVisibile) === 1) {
                return product
              }
            return undefined
          }) && catigory.isVisibile &&
            <Catigory key={catigory.id} {...catigory} />
        })
      }
    </StyledCatigories>
  )
}

export default Catigories


