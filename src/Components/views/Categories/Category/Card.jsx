import { StyeldCard } from "./styled"
import AddToCartButton from "../../../AddToCartButton"
import SavedButton from "../../../SavedButton"
import { Link } from "react-router-dom"
import ImagesSliderCard from "../../../common/ImagesSliderCard"
import Rating from "../../../Rating"

const Card = ({ data: { id, description, stars, images, name, price, prevPrice }, display, index }) => {
    const hasDiscount = prevPrice > price;
    const discount = hasDiscount ? Math.round(((prevPrice - price) / prevPrice) * 100) : 0;
    const productLink = `/home/products/${id}`;

    return (
        <StyeldCard {...{ display, index }}>
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
                <Link to={productLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="title">{name}</h3>
                </Link>
                <Rating num={stars} />
                <p className="description">
                    <Link to={productLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {description?.slice(0, 55)}...
                        <span style={{ fontWeight: 700, marginRight: 4 }}>المزيد</span>
                    </Link>
                </p>
                <div className="icons">
                    <AddToCartButton {...{ id }} />
                    <SavedButton {...{ id }} />
                </div>
            </div>
        </StyeldCard>
    )
}

export default Card
