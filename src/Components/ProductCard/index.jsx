import { ProductCardStyeld } from './styled'
import { Link } from 'react-router-dom'
import { Info } from '../../Global/components'
import Rating from '../Rating'
import AddToCartButton from '../AddToCartButton'
import LikeButton from '../LikeButton'
import ImagesSliderCard from '../common/ImagesSliderCard'
const ProductCard = ({ data: { id, discription, images, name, price, prevPrice, isVisibile = 0 }, isFull }) => {
    return (
        <>
            {
                parseInt(isVisibile) === 1 && 
                <ProductCardStyeld full={isFull} >
                    <ImagesSliderCard images={images } />
                    <div className="content">
                        <p className="price">{price}₪ <span className="prevCost">{prevPrice}₪</span>   </p>
                        <Info>
                            <div className="rating"><Rating num="4" num2="7.5" /></div>
                        </Info>
                        {isFull && <p className="description">{discription}</p>}
                        {isFull && <Link to={`/home/products/${id}`} className="ViewDetails">View details</Link>}
                        <h3 className="title">{name}</h3>
                        <div className="icons">
                            <AddToCartButton  {...{ id }} />
                            <LikeButton {...{ id }} />
                        </div>
                    </div>
                </ProductCardStyeld>
            }
        </>
    )
}

export default ProductCard