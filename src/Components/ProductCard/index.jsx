import { ProductCardStyeld } from './styled'
import { Link } from 'react-router-dom'
import { Info } from '../../Global/components'
import Rating from '../Rating'
import AddToCartButton from '../AddToCartButton'
import SavedButton from '../SavedButton'
import ImagesSliderCard from '../common/ImagesSliderCard'

const ProductCard = ({ data: { id, description, images, name, price, prevPrice, stars }, isFull }) => {
    const hasDiscount = prevPrice > price;
    const discount = hasDiscount ? Math.round(((prevPrice - price) / prevPrice) * 100) : 0;
    const productLink = `/home/products/${id}`;

    return (
        <ProductCardStyeld full={isFull} >
            {discount > 0 && <span className="discountBadge">خصم {discount}%</span>}
            <Link to={productLink} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <ImagesSliderCard images={images} />
            </Link>
            <div className="content">
                <p className="price">{price}₪
                    {
                        prevPrice > 0 &&
                        <span className="prevCost">{prevPrice}₪</span>
                    }
                </p>
                <Info>
                    <div className="rating"><Rating num={stars} /></div>
                </Info>
                <Link to={productLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="title">{name}</h3>
                </Link>
                {isFull && <p className="description">{description}</p>}
                <Link to={productLink} className="ViewDetails">عرض التفاصيل</Link>
                <div className="icons">
                    <AddToCartButton {...{ id }} />
                    <SavedButton {...{ id }} />
                </div>
            </div>
        </ProductCardStyeld>
    )
}

export default ProductCard
