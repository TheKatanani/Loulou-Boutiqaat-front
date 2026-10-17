import { useSelector } from "react-redux"
import TitleSections from "../../Components/common/TitleSections"
import { StyledSaved } from "./sylted"
import { selectsaved } from "../../redux/reducers/saved"
import ProductCard from "../../Components/ProductCard"
import { selectPublishedProducts } from "../../redux/reducers/products"
import { Container } from "../../Global/components"
import { Link } from "react-router-dom"

const Saved = () => {
  const saved = useSelector(selectsaved)
  const products = useSelector(selectPublishedProducts)
  const savedData = saved.length ? (
    saved?.map((savedItem, i) => {
      const foundedItem = products?.find(product => product.id == savedItem)
      return foundedItem && <ProductCard key={i} data={foundedItem} isFull={true} />
    })
  )
    :
    <>
      <p className="noItems">لا توجد عناصر في قائمة المفضلة حالياً</p>
      <Link to={'/home/categories'}>تصفح المنتجات الآن ✨</Link>
    </>

  return (
    <StyledSaved>
      <Container>
        <TitleSections>المنتجات المفضلة</TitleSections>
        {
          savedData
        }
      </Container>
    </StyledSaved>
  )
}

export default Saved