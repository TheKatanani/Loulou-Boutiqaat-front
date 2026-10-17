import { useSelector } from 'react-redux'
import { STATUS } from '../../Actions'  
// import SliderControl from '../SliderControl'
import ProductSkeleton from '../common/ProductSkeleton'
import { ProductsStyled } from './styled'
import  { selectSearchResults, selectStatus } from '../../redux/reducers/search'
import ProductCard from '../ProductCard'

const Products = ({isFull}) => {
    const { data } = useSelector(selectSearchResults) 
    const status = useSelector(selectStatus) 
    
    if (status === STATUS.LOADING) {
        return <ProductSkeleton count={isFull ? 6 : 9} />
    } 
  return (
    <ProductsStyled full={isFull}>
        <div className="content2">
            {data?.map((el,i)=>( 
                <ProductCard key={i} data={el} isFull={isFull}/>
            ))}
        </div>
        {/* <SliderControl/> */}
    </ProductsStyled>
  )
}

export default Products