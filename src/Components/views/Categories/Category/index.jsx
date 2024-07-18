import React, { useCallback } from 'react'
import { Container } from '../../../../Global/components'
import Card from './Card'
import { Styledcategory } from './styled'
import TitleSections from '../../../common/TitleSections'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogoLoading from '../../../common/LogoLoading'
import { useSelector } from 'react-redux'
import { selectPublishedProducts, selectStatus } from '../../../../redux/reducers/products'
import { STATUS } from '../../../../Actions'
const Category = ({ name, id }) => {
  const products = useSelector(selectPublishedProducts)
  const status = useSelector(selectStatus)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(4)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [page, setPage] = useState(0)
  const [disaple, setDisaple] = useState({
    prev: true,
    next: false
  })
  let start = page * limit;
  let end = page * limit + limit;
  const sliderHandler = useCallback(() => {
    if (page === 0) {
      if (page * limit + limit >= categoryProducts?.length) {
        return { prev: true, next: true }
      }
      return { prev: true, next: false }
    } else if (page * limit + limit >= categoryProducts?.length) {
      return { prev: false, next: true }
    } else {
      return { prev: false, next: false }
    }
  }, [categoryProducts, page, limit])
  useEffect(() => {
    setDisaple(sliderHandler)
  }, [sliderHandler])
  useEffect(() => {
    if (status === STATUS.SUCCEEDED || status === STATUS.IDLE) { 
      const initCategoryProducts = products.filter((product) => product.categoryId == id)
      setCategoryProducts(initCategoryProducts)
    }
  }, [products, id, status])

  if (status === STATUS.LOADING) {
    return <LogoLoading />
  } 
  return (
    <>
      <Styledcategory {...{ page }}>
        <Container className='container'>
          {
            categoryProducts.length ?
              <>
                <Link to={`/home/categories/${id}`}>
                  <TitleSections>{name}</TitleSections>
                </Link>
                <div className="data">
                  {
                    categoryProducts?.slice(start, end)?.map((product, i) => (
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
      </Styledcategory>
    </>
  )
}

export default Category