import { NavLink } from 'react-router-dom'
import { CatigoryStyled } from './styles'
import LogoLoading from '../common/LogoLoading'
import { STATUS } from '../../Actions'
import { useSelector } from 'react-redux'
import { selectCatigories } from '../../redux/reducers/catigories'
import { selectStatus } from '../../redux/reducers/catigories'
import { selectProducts } from '../../redux/reducers/products'

const Category = () => {
    const catigories = useSelector(selectCatigories)
    const products = useSelector(selectProducts) 
    const status = useSelector(selectStatus)
    if (status === STATUS.LOADING) {
        return <LogoLoading />
    }

    return (
        <CatigoryStyled >
            <ul>
                {
                    catigories?.map((catigory) => {
                        return products.find(product => {
                            if (product.catigoryId == catigory.id)
                                if (product.count > 0 && parseInt(product.isVisibile) === 1) {
                                    return product
                                }
                            return undefined
                        }) && <li key={catigory.id}>
                                <NavLink to={`/home/catigories/${catigory.id}`}>{catigory.name}</NavLink>
                            </li>
                    }
                    )
                }
            </ul>

        </CatigoryStyled >
    );
};

export default Category;