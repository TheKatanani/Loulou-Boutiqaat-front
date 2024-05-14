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
import { selectCatigories } from '../../redux/reducers/catigories'
import { selectProducts } from '../../redux/reducers/products'
const Footer = () => {
    const dispatch = useDispatch()
    const social = useSelector(selectSocial)
    const catigories = useSelector(selectCatigories)
    const products = useSelector(selectProducts)
    const validCatigories =  catigories?.map((catigory) => {
        return products.find(product => {
            if (product.catigoryId == catigory.id)
                if (product.count > 0 && parseInt(product.isVisibile) === 1) {
                    return product
                }
            return undefined
        }) && catigory
    }) 
    const footerData = [
        {
            title: 'categories',
            data:
                validCatigories.map(catigory => {
                    return ( 
                        {
                            'text': catigory.name,
                            'link': `/home/catigories/${catigory.id}`
                        }
                    )
                })
        },
        {
            title:'sections',
            data:[
                {
                    text:'home',
                    link:'/home'
                },
                {
                    text:'cart',
                    link:'/home/cart'
                },
                {
                    text:'saved',
                    link:'/home/saved'
                },
                {
                    text:'profile',
                    link:'/home/profile'
                } 
            ]
        },
        {
            title:'more links',
            data:[ 
                {
                    text:'catigories',
                    link:'/home/catigories'
                },
                {
                    text:'search',
                    link:'/home/search'
                },
                {
                    text:'update information',
                    link:'/home/updateInfo'
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