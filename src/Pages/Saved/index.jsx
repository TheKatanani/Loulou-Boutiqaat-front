import { useSelector } from "react-redux"
import TitleSections from "../../Components/common/TitleSections"
import { StyledSaved } from "./sylted"
import { selectsaved } from "../../redux/reducers/saved"
import ProductCard from "../../Components/ProductCard"
import { selectProducts } from "../../redux/reducers/products"
import { Container } from "../../Global/components"
import { Link } from "react-router-dom"

const Saved = () => {
  const saved = useSelector(selectsaved)
  const products = useSelector(selectProducts)
  const savedData = saved.length ? (
    saved?.map((savedItem, i) => {
      const foundedItem = products?.find(product => product.id === savedItem)
      return foundedItem && <ProductCard key={i} data={foundedItem} isFull={true} />
    })
  )
    :
    <>
      <p className="noItems">No Saved Items :)</p>
      <Link to={'/home/catigories'}>See more Products 👀</Link>
    </>

  return (
    <StyledSaved>
      <Container>
        <TitleSections>Saved Products</TitleSections>
        {
          savedData
        }
      </Container>
    </StyledSaved>
  )
}

export default Saved