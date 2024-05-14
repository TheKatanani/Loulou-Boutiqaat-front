import { useSelector } from 'react-redux'
import { STATUS } from '../../Actions'  
// import SliderControl from '../SliderControl'
import LogoLoading from '../common/LogoLoading'
import { ProductsStyled } from './styled'
import  { selectSearchResults, selectStatus } from '../../redux/reducers/search'
import ProductCard from '../ProductCard'

const Products = ({isFull}) => {
    const { data } = useSelector(selectSearchResults) 
  const   status   = useSelector(selectStatus) 
    // try to make it work with the slider control
    // const myData=()=>{
    //     if(isFull){
    //         return products.slice(0,6);
    //     }
    //     return products.slice(0,9);
    // }
    if (status === STATUS.LOADING) {
        return <LogoLoading />
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