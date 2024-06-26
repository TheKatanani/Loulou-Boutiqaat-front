import { NavLink } from 'react-router-dom'
import { CategoryStyled } from './styles'
import LogoLoading from '../common/LogoLoading'
import { STATUS } from '../../Actions'
import { useSelector } from 'react-redux'
import { selectPublishedCategoryies } from '../../redux/reducers/categories'
import { selectStatus } from '../../redux/reducers/categories'
import { selectPublishedProducts } from '../../redux/reducers/products'

const Category = () => {
    const categories = useSelector(selectPublishedCategoryies)
    const products = useSelector(selectPublishedProducts)
    const status = useSelector(selectStatus)
    if (status === STATUS.LOADING) {
        return <LogoLoading />
    }

    return (
        <CategoryStyled >
            <ul>
                {
                    categories?.map((category) => {
                        return products.find(product => {
                            if (product.categoryId == category.id)
                                if (product.count > 0 ) {
                                    return product
                                }
                            return undefined
                        }) && <li key={category.id}>
                                <NavLink to={`/home/categories/${category.id}`}>{category.name}</NavLink>
                            </li>
                    }
                    )
                }
            </ul>

        </CategoryStyled >
    );
};

export default Category;