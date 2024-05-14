import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageSlider from '../../Components/ImageSlider'
import { images as localImages } from '../../Mock/sliderImages'
import { Container, Info } from '../../Global/components'
import Rating from '../../Components/Rating'
import AddToCartButton from '../../Components/AddToCartButton'
import LikeButton from '../../Components/LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import LogoLoading from '../../Components/common/LogoLoading'
import { STATUS } from '../../Actions'
import { selectStatus, setProducts } from '../../redux/reducers/products'
import { StyledProductPage } from './styled'

const Product = () => {
  const { product } = useParams()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)
  const status = useSelector(selectStatus)
  const isFull = true;
  const currentProduct = products?.find((el) => el.id == product)
  const { id, discription, stars = '4', name, price, prevPrice, images, count = 1, isVisibile = 0 } = currentProduct

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
        !(parseInt(isVisibile) === 0 || count <= 0) ?
          <Container>
            <StyledProductPage >
              <div className="card">
                <div className="img">
                  <ImageSlider images={!!images.length ? images : localImages} />
                </div>
                <div className="content">
                  <h2 className="title">{name}</h2>
                  <p className="price">{price}₪ <span className="prevCost">{prevPrice}₪</span>   </p>
                  <Info>
                    <div className="rating"><Rating num={stars} /></div>
                  </Info>
                  {isFull && <p className="description">{discription}</p>}
                  <div className="icons">
                    <AddToCartButton  {...{ id }} />
                    <LikeButton {...{ id }} />
                  </div>
                </div>
              </div>
            </StyledProductPage>
          </Container>
          :
          <p>no data to show</p>
      }
    </>
  )
}

export default Product