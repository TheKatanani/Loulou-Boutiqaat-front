import { StyeldCard } from "./styled"
import AddToCartButton from "../../../AddToCartButton"
import LikeButton from "../../../LikeButton"
import { Link } from "react-router-dom"
import ImagesSliderCard from "../../../common/ImagesSliderCard"
import Rating from "../../../Rating"

const Card = ({ data: { id, description, stars, images, name, price, prevPrice, isVisibile = 0, count = 1 }, display, index }) => {
    return (
        <>
            {
                !(parseInt(isVisibile) === 0 || count <= 0) &&
                <StyeldCard {...{ display, index }}>
                    <ImagesSliderCard images={images} />
                    <div className="content">
                        <p className="price">{price}₪ <span className="prevCost">{prevPrice}₪</span>   </p>
                        <h3>{name}</h3>
                        <Rating num={stars} />
                        <p className="description">{description.slice(0, 50)}...
                            <Link to={`/home/products/${id}`}>
                                <span>more</span>
                            </Link>
                        </p>
                        <div className="icons">
                            <AddToCartButton  {...{ id }} />
                            <LikeButton {...{ id }} />
                        </div>
                    </div>
                </StyeldCard>
            }
        </>
    )
}

export default Card