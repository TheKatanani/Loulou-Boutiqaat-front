import { ProductCardStyeld } from './styled'
import { Link } from 'react-router-dom'
import { Info } from '../../Global/components'
import Rating from '../Rating'
import AddToCartButton from '../AddToCartButton'
import SavedButton from '../SavedButton'
import ImagesSliderCard from '../common/ImagesSliderCard'
const ProductCard = ({ data: { id, description, images, name, price, prevPrice }, isFull }) => {
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
                    <div className="rating"><Rating num="4" num2="7.5" /></div>
                </Info>
                {isFull && <p className="description">{description}</p>}
                {isFull && <Link to={`/home/products/${id}`} className="ViewDetails">عرض التفاصيل</Link>}
                <h3 className="title">{name}</h3>
                <div className="icons">
                    <AddToCartButton  {...{ id }} />
                    <SavedButton {...{ id }} />
                </div>
            </div>
        </ProductCardStyeld>
    )
}

export default ProductCard