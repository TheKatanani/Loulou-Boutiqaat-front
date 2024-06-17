import { Container } from '../../Global/components'
import { FaceBook, Instagram, LinkedIn, Twitter, Youtube } from '../../Icons'
import FooterList from '../FooterList'
import Logo from '../Logo'
import { FooterStyled } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectSocial, setSocial } from '../../redux/reducers/social'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Copy from '../UI/Copy'
import { selectPublishedCategoryies } from '../../redux/reducers/categories'
// import { selectPublishedProducts } from '../../redux/reducers/products'
const Footer = () => {
    const dispatch = useDispatch()
    const social = useSelector(selectSocial)
    const categories = useSelector(selectPublishedCategoryies)
    // const products = useSelector(selectPublishedProducts)
    // const validcategories = categories?.map((category) => {
    //     return products.find(product => {
    //         if (product.categoryId == category.id)
    //             if (product.count > 0) {
    //                 return product
    //             }
    //         return undefined
    //     }) && category
    // })
    const footerData = [
        {
            title: 'categories',
            data:
                categories.map(category => {
                    return (
                        {
                            'text': category?.name,
                            'link': `/home/categories/${category?.id}`
                        }
                    )
                })
        },
        {
            title: 'sections',
            data: [
                {
                    text: 'home',
                    link: '/home'
                },
                {
                    text: 'cart',
                    link: '/home/cart'
                },
                {
                    text: 'saved',
                    link: '/home/saved'
                },
                {
                    text: 'profile',
                    link: '/home/profile'
                }
            ]
        },
        {
            title: 'more links',
            data: [
                {
                    text: 'categories',
                    link: '/home/categories'
                },
                {
                    text: 'search',
                    link: '/home/search'
                },
                {
                    text: 'update information',
                    link: '/home/updateInfo'
                },
            ]
        }
    ]
    useEffect(() => {
        dispatch(setSocial())
    }, [dispatch])
    return (
        <FooterStyled>
            <Container className='container'>
                <div className='logoBox'>
                    <Logo />
                    <p>Best information about the company gies here but now lorem ipsum is </p>
                    <div className="icons">
                        <Link to={social?.facebook || ''} target='_blank' className="facebook">
                            <FaceBook />
                        </Link>
                        <Twitter />
                        <LinkedIn />
                        <Link to={social?.instagram || ''} target='_blank' className="facebook">
                            <Instagram />
                        </Link>
                        <Youtube />
                    </div>
                </div>
                <div className='uls'>
                    {footerData.map((el, i) => (
                        <FooterList key={i} title={el.title} data={el.data} />
                    ))}
                </div>
            </Container>
            <Copy />
        </FooterStyled>
    )
}

export default Footer