import React, { useCallback } from 'react'
import { Container } from '../../../../Global/components'
import Card from './Card'
import { StyledCatigory } from './styled'
import TitleSections from '../../../common/TitleSections'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogoLoading from '../../../common/LogoLoading'
import { useSelector } from 'react-redux'
import { selectProducts, selectStatus } from '../../../../redux/reducers/products'
import { STATUS } from '../../../../Actions'
const Catigory = ({ name, id }) => {
  const products = useSelector(selectProducts)
  const status = useSelector(selectStatus)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(4)
  const [catigoryProducts, setCatigoryProducts] = useState([])
  const [page, setPage] = useState(0)
  const [disaple, setDisaple] = useState({
    prev: true,
    next: false
  })
  let start = page * limit;
  let end = page * limit + limit;
  const sliderHandler = useCallback(() => {
    if (page === 0) {
      if (page * limit + limit >= catigoryProducts?.length) {
        return { prev: true, next: true }
      }
      return { prev: true, next: false }
    } else if (page * limit + limit >= catigoryProducts?.length) {
      return { prev: false, next: true }
    } else {
      return { prev: false, next: false }
    }
  }, [catigoryProducts, page, limit])
  useEffect(() => {
    setDisaple(sliderHandler)
  }, [sliderHandler])
  useEffect(() => {
    // status === STATUS.SUCCEEDED &&
      setCatigoryProducts(products?.filter((product) => product.catigoryId == id))
  }, [products, id, status])
  const element = catigoryProducts?.find(product => {  
    return +product.count > 0 && parseInt(product.isVisibile) === 1
  })  
  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }
  return (
    <>
      <StyledCatigory {...{ page }}>
        <Container className='container'>
          {
            catigoryProducts.length && element ?
              <>
                <Link to={`/home/catigories/${id}`}>
                  <TitleSections>{name}</TitleSections>
                </Link>
                <div className="data">
                  {
                    catigoryProducts?.slice(start, end)?.map((product, i) => (
                      <Card
                        index={i}
                        key={i}
                        data={product}
                      />
                    ))
                  }
                  <button disabled={disaple.prev} className={`prev ${disaple.prev && 'disabled'}`} onClick={() => {
                    setPage(prev => {
                      if (prev > 0) {
                        return prev - 1
                      }
                    })
                  }}>{"<"}</button>
                  <button disabled={disaple.next} className={`next ${disaple.next && 'disabled'}`} onClick={() => {
                    setPage(prev => {
                      return prev + 1
                    })
                  }}>{">"}</button>
                </div>
              </>
              :
              <p className='noData'>no data in this category</p>
          }
        </Container>
      </StyledCatigory>
    </>
  )
}

export default Catigory