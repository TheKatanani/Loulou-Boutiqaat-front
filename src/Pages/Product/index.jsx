import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageSlider from '../../Components/ImageSlider'
import { images as localImages } from '../../Mock/sliderImages'
import { Container } from '../../Global/components'
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

  useEffect(() => {
    if (!products.length) {
      dispatch(setProducts())
    }
  }, [dispatch, products])

  const currentProduct = products?.find((el) => String(el.id) === String(productId))

  if (status === STATUS.LOADING || !currentProduct) {
    return (
      <Container>
        <div style={{ padding: '160px 0', textAlign: 'center' }}>
          <LogoLoading />
        </div>
      </Container>
    )
  }

  const { id, description, stars = '5', name, price, prevPrice, images, stock = 25 } = currentProduct
  const hasDiscount = prevPrice > price
  const discount = hasDiscount ? Math.round(((prevPrice - price) / prevPrice) * 100) : 0
  const isAvailable = Number(stock) > 0

  return (
    <Container>
      <StyledProductPage>
        <div className="breadcrumb">
          <Link to="/home">الرئيسية</Link>
          <span>/</span>
          <Link to="/home/categories">الأقسام</Link>
          <span>/</span>
          <span className="activeItem">{name}</span>
        </div>

        <div className="card">
          <div className="img">
            {discount > 0 && <span className="discountTag">خصم {discount}%</span>}
            <ImageSlider images={images?.length ? images : localImages} />
          </div>
          <div className="content">
            <h1 className="title">{name}</h1>
            <div className="ratingSection">
              <Rating num={stars} />
              <span className="ratingText">تقييم ممتاز (5/5)</span>
            </div>

            <div className="priceContainer">
              <span className="mainPrice">{price} ₪</span>
              {prevPrice > 0 && <span className="prevCost">{prevPrice} ₪</span>}
              {discount > 0 && <span className="savingText">وفرتِ {prevPrice - price} ₪</span>}
            </div>

            <div className="descriptionBox">
              <h4>وصف المنتج:</h4>
              <p className="description">{description}</p>
            </div>

            <div className="stockStatus" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: '0.88rem',
              fontWeight: 600,
              marginBottom: 16,
              background: isAvailable ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: isAvailable ? '#15803d' : '#b91c1c',
              border: `1px solid ${isAvailable ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`
            }}>
              <span>{isAvailable ? '✅' : '❌'}</span>
              <span>{isAvailable ? `متوفر في المخزون (${stock} قطعة)` : 'نفد من المخزون حالياً'}</span>
            </div>

            <div className="actionsRow">
              <div className="cartBtnWrapper">
                <AddToCartButton id={id} />
                <span className="btnLabel">إضافة إلى سلة المشتريات</span>
              </div>
              <div className="saveBtnWrapper">
                <SavedButton id={id} />
              </div>
            </div>

            <div className="trustPerks">
              <div className="perk">
                <span>💎</span>
                <p>منتج أصلي 100% ومضمون</p>
              </div>
              <div className="perk">
                <span>🚚</span>
                <p>توصيل فوري وتغليف آمن</p>
              </div>
              <div className="perk">
                <span>🛡️</span>
                <p>ضمان الجودة وخدمة عملاء 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </StyledProductPage>
    </Container>
  )
}

export default Product