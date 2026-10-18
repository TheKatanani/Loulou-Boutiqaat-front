import React, { useCallback, useState, useEffect } from 'react'
import { Container } from '../../../../Global/components'
import Card from './Card'
import { Styledcategory } from './styled'
import { Link } from 'react-router-dom'
import LogoLoading from '../../../common/LogoLoading'
import { useSelector } from 'react-redux'
import { selectPublishedProducts, selectStatus } from '../../../../redux/reducers/products'
import { STATUS } from '../../../../Actions'

const Category = ({ name, id }) => {
  const products = useSelector(selectPublishedProducts)
  const status = useSelector(selectStatus)
  const [limit] = useState(4)
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
      const initCategoryProducts = products.filter((product) => String(product.categoryId) === String(id))
      setCategoryProducts(initCategoryProducts)
    }
  }, [products, id, status])

  if (status === STATUS.LOADING) {
    return <LogoLoading />
  } 

  return (
    <Styledcategory>
      <Container className='container'>
        {
          categoryProducts.length ? (
            <>
              <div className="categoryHeader">
                <div className="categoryTitleBox">
                  <span className="categoryBadge">قسم متميز</span>
                  <h2 className="categoryTitle">{name}</h2>
                </div>
                <div className="categoryHeaderControls">
                  <Link to={`/home/categories/${id}`} className="viewAllLink">
                    عرض جميع المنتجات ({categoryProducts.length}) ←
                  </Link>
                  <div className="sliderButtons">
                    <button 
                      type="button"
                      disabled={disaple.prev} 
                      className={`sliderBtn ${disaple.prev ? 'disabled' : ''}`} 
                      onClick={() => setPage(prev => (prev > 0 ? prev - 1 : 0))}
                      title="السابق"
                    >
                      ❮
                    </button>
                    <button 
                      type="button"
                      disabled={disaple.next} 
                      className={`sliderBtn ${disaple.next ? 'disabled' : ''}`} 
                      onClick={() => setPage(prev => prev + 1)}
                      title="التالي"
                    >
                      ❯
                    </button>
                  </div>
                </div>
              </div>

              <div className="data">
                {
                  categoryProducts?.slice(start, end)?.map((product, i) => (
                    <Card
                      index={i}
                      key={product.id || i}
                      data={product}
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <p className='noData'>لا توجد منتجات متوفرة حالياً في هذا القسم</p>
          )
        }
      </Container>
    </Styledcategory>
  )
}

export default Category