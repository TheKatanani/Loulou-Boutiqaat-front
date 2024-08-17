import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageSlider from '../../Components/ImageSlider'
import { images as localImages } from '../../Mock/sliderImages'
import { Container, Info } from '../../Global/components'
import Rating from '../../Components/Rating'
import AddToCartButton from '../../Components/AddToCartButton'
import SavedButton from '../../Components/SavedButton'
import { useDispatch, useSelector } from 'react-redux'
import LogoLoading from '../../Components/common/LogoLoading'
import { STATUS } from '../../Actions'
import { selectPublishedProducts, selectStatus, setProducts } from '../../redux/reducers/products'
import { StyledProductPage } from './styled'

const Product = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const products = useSelector(selectPublishedProducts)
  const status = useSelector(selectStatus)
  const isFull = true;
  const currentProduct = products?.find((el) => el.id == productId)
  const { id, description, stars = '4', name, price, prevPrice, images } = currentProduct

  useEffect(() => {
    !products.length &&
      dispatch(setProducts())
  }, [dispatch, products])
  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }
  return (
    <>
      {
        <Container>
          <StyledProductPage >
            <div className="card">
              <div className="img">
                <ImageSlider images={!!images.length ? images : localImages} />
              </div>
              <div className="content">
                <h2 className="title">{name}</h2>
                <p className="price">{price}₪
                  {
                    prevPrice > 0 &&
                    <span className="prevCost">{prevPrice}₪</span>
                  }
                </p>
                <Info>
                  <div className="rating"><Rating num={stars} /></div>
                </Info>
                {isFull && <p className="description">{description}</p>}
                <div className="icons">
                  <AddToCartButton  {...{ id }} />
                  <SavedButton {...{ id }} />
                </div>
              </div>
            </div>
          </StyledProductPage>
        </Container>
      }
    </>
  )
}

export default Product