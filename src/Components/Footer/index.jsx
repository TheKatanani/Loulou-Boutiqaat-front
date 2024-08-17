import { Container } from '../../Global/components'
import { FaceBook, Instagram, LinkedIn, Telegram, TikTok, Twitter, WhatsApp, Youtube } from '../../Icons'
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
const Footer = () => {
    const dispatch = useDispatch()
    const social = useSelector(selectSocial)
    const socialStatus = useSelector(selectStatus)
    const categories = useSelector(selectPublishedCategoryies)
    let facebook = '',
        X = '',
        instagram = '',
        tikTok = '',
        telegram = '',
        whatsApp;
    if (socialStatus === STATUS.SUCCEEDED) {
        facebook = social?.find(el => el?.name === 'facebook')?.value || ''
        X = social?.find(el => el?.name === 'x')?.value || ''
        instagram = social?.find(el => el?.name === 'instagram')?.value || ''
        whatsApp = social?.find(el => el?.name === 'whatsApp')?.value || ''
        tikTok = social?.find(el => el?.name === 'tikTok')?.value || ''
        telegram = social?.find(el => el?.name === 'telegram')?.value || ''
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
                        <Link to={facebook} target='_blank' title='facebook' className="facebook">
                            <FaceBook />
                        </Link>
                        <Link to={X} target='_blank' title='X' className="x">
                            <Twitter />
                        </Link> 
                        <Link to={instagram} target='_blank' title='instagram' className="instagram">
                            <Instagram />
                        </Link> 
                        <Link to={tikTok} target='_blank' title='TikTok' className="TikTok">
                            <TikTok />
                        </Link> 
                        <Link to={telegram} target='_blank' title='telegram' className="Telegram">
                            <Telegram />
                        </Link> 
                        <Link to={`https://wa.me/${whatsApp}`} target='_blank' title='whatsApp' className="whatsApp">
                            <WhatsApp />
                        </Link> 
                    </div>
                </div>
                <div className='uls'>
                    {footerData(categories).map((el, i) => (
                        <FooterList key={i} title={el.title} data={el.data} />
                    ))}
                </div>
                <div>
                    <h4>تواصل معنا</h4>
                    <Link to={`https://wa.me/${whatsApp}`} title='whats app' aria-label='whats app' target="_blank">
                        <p>{whatsApp}</p>
                    </Link>
                </div>
            </Container>
            <Copy />
        </FooterStyled>
    )
}

export default Footer