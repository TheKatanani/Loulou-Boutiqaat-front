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

  const savedProducts = saved?.map(savedId => 
    products?.find(product => product.id === Number(savedId) || product.id === savedId)
  ).filter(Boolean) || [];

  return (
    <StyledSaved>
      <Container>
        <TitleSections>❤️ المنتجات المفضلة</TitleSections>
        {savedProducts.length > 0 ? (
          <div className="savedGrid">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} data={product} isFull={true} />
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: 16 }}>🤍</span>
            <p className="noItems">قائمة المفضلة فارغة حالياً</p>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: 20 }}>
              احفظي منتجاتكِ وعطوركِ المفضلة للعودة إليها وشرائها في أي وقت
            </p>
            <Link to={'/home/categories'} className="exploreBtn">
              اكتشفي الأقسام والمنتجات الآن ✨
            </Link>
          </div>
        )}
      </Container>
    </StyledSaved>
  )
}

export default Saved