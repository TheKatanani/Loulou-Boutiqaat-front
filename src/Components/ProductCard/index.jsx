import { ProductCardStyeld } from './styled'
import { Link } from 'react-router-dom'
import { Info } from '../../Global/components'
import Rating from '../Rating'
import AddToCartButton from '../AddToCartButton'
import SavedButton from '../SavedButton'
import ImagesSliderCard from '../common/ImagesSliderCard'
const ProductCard = ({ data: { id, description, images, name, price, prevPrice, stars }, isFull }) => {
    return (
        <ProductCardStyeld full={isFull} >
            <ImagesSliderCard images={images} />
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
                <h3 className="title">{name}</h3>
                {isFull && <p className="description">{description}</p>}
                <Link to={`/home/products/${id}`} className="ViewDetails">عرض التفاصيل</Link>
                <div className="icons">
                    <AddToCartButton  {...{ id }} />
                    <SavedButton {...{ id }} />
                </div>
            </div>
        </ProductCardStyeld>
    )
}

export default ProductCard