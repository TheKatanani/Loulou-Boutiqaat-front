import { NavLink } from 'react-router-dom'
import { CategoryStyled } from './styles'
import LogoLoading from '../common/LogoLoading'
import { STATUS } from '../../Actions'
import { useSelector } from 'react-redux'
import { selectPublishedCategoryies } from '../../redux/reducers/categories'
import { selectStatus } from '../../redux/reducers/categories'

const Category = () => {
    const categories = useSelector(selectPublishedCategoryies)
    const status = useSelector(selectStatus)
    if (status === STATUS.LOADING) {
        return <LogoLoading />
    }

    return (
        <CategoryStyled >
            <ul>
                {
                    categories?.map((category) =>
                        <li key={category.id}>
                            <NavLink to={`/home/الأقسام/${category.id}`}>{category.name}</NavLink>
                        </li>
                    )
                }
            </ul>

        </CategoryStyled >
    );
};

export default Category;