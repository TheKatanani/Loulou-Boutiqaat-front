import { Container } from '../../Global/components'
import { FaceBook, Instagram, LinkedIn, Twitter, Youtube } from '../../Icons'
import FooterList from '../FooterList'
import Logo from '../Logo'
import { FooterStyled } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectSocial, selectStatus, setSocial } from '../../redux/reducers/social'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Copy from '../UI/Copy'
import { selectPublishedCategoryies } from '../../redux/reducers/categories'
import { STATUS } from '../../Actions'
import { footerData } from './footerData'
// import { selectPublishedProducts } from '../../redux/reducers/products'
const Footer = () => {
    const dispatch = useDispatch()
    const social = useSelector(selectSocial)
    const socialStatus = useSelector(selectStatus)
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
  
    let facebook = '',
        X = '',
        instagram = '',
        whatsApp;
    if (socialStatus === STATUS.SUCCEEDED) {
        facebook = social?.find(el => el?.name === 'facebook')?.value || ''
        X = social?.find(el => el?.name === 'x')?.value || ''
        instagram = social?.find(el => el?.name === 'instagram')?.value || ''
        whatsApp = social?.find(el => el?.name === 'whatsApp')?.value || ''
    }
    useEffect(() => {
        dispatch(setSocial())
    }, [dispatch])
    return (
        <FooterStyled>
            <Container className='container'>
                <div className='logoBox'>
                    <Logo />
                    <p>
                        Online boutique ♾️<br /> 📍 Gaza <br />
                        Skincare, Cosmetics and more...<br />🧖‍♀️💅💄
                    </p>
                    <div className="icons">
                        <Link to={facebook} target='_blank' className="facebook">
                            <FaceBook />
                        </Link>
                        <Link to={X} target='_blank' className="x">
                            <Twitter />
                        </Link>
                        <LinkedIn />
                        <Link to={instagram} target='_blank' className="instagram">
                            <Instagram />
                        </Link>
                        <Youtube />
                    </div>
                </div>
                <div className='uls'>
                    {footerData(categories).map((el, i) => (
                        <FooterList key={i} title={el.title} data={el.data} />
                    ))}
                </div>
                <div>
                    <h4>Contact Us</h4>
                    <p>{whatsApp}</p>
                </div>
            </Container>
            <Copy />
        </FooterStyled>
    )
}

export default Footer