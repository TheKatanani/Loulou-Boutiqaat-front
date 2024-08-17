import { StyeldCard } from "./styled"
import AddToCartButton from "../../../AddToCartButton"
import SavedButton from "../../../SavedButton"
import { Link } from "react-router-dom"
import ImagesSliderCard from "../../../common/ImagesSliderCard"
import Rating from "../../../Rating"

const Card = ({ data: { id, description, stars, images, name, price, prevPrice }, display, index }) => {
    return (
        <>
            {
                <StyeldCard {...{ display, index }}>
                    <ImagesSliderCard images={images} />
                    <div className="content">
                        <p className="price">{price}₪
                            {
                                prevPrice > 0 &&
                                <span className="prevCost">{prevPrice}₪</span>
                            }
                        </p>
                        <h3>{name}</h3>
                        <Rating num={stars} />
                        <p className="description">{description.slice(0, 50)}...
                            <Link to={`/home/products/${id}`}>
                                <span>المزيد</span>
                            </Link>
                        </p>
                        <div className="icons">
                            <AddToCartButton  {...{ id }} />
                            <SavedButton {...{ id }} />
                        </div>
                    </div>
                </StyeldCard>
            }
        </>
    )
}

export default Card