import { Container } from '../../Global/components'
import { FaceBook, Instagram, Telegram, TikTok, Twitter, WhatsApp } from '../../Icons'
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
    let facebook = 'https://facebook.com/loulou.boutiqaat',
        X = '',
        instagram = 'https://www.instagram.com/loulou.boutiqaat/',
        tikTok = 'https://tiktok.com/@loulou.boutiqaat',
        telegram = '',
        whatsApp = '972597229340';
    if (socialStatus === STATUS.SUCCEEDED && Array.isArray(social)) {
        const fb = social.find(el => el?.name?.toLowerCase() === 'facebook')?.value
        if (fb) facebook = fb
        const xVal = social.find(el => el?.name?.toLowerCase() === 'x' || el?.name?.toLowerCase() === 'twitter')?.value
        if (xVal) X = xVal
        const insta = social.find(el => el?.name?.toLowerCase() === 'instagram')?.value
        if (insta) instagram = insta
        const wa = social.find(el => el?.name?.toLowerCase() === 'whatsapp')?.value
        if (wa) whatsApp = wa
        const tt = social.find(el => el?.name?.toLowerCase() === 'tiktok')?.value
        if (tt) tikTok = tt
        const tg = social.find(el => el?.name?.toLowerCase() === 'telegram')?.value
        if (tg) telegram = tg
    }

    const waUrl = whatsApp.startsWith('http') 
        ? whatsApp 
        : `https://wa.me/${whatsApp.replace(/[^0-9]/g, '') || '972597229340'}`;

    useEffect(() => {
        dispatch(setSocial())
    }, [dispatch])
    return (
        <FooterStyled>
            <Container className='container'>
                <div className='logoBox'>
                    <Logo />
                    <p className="brandDesc">
                        بوتيك لولو للجمال والأناقة في قطاع غزة. نوفر لكِ تشكيلة راقية من أشهر ماركات المكياج والعناية بالبشرة والشعر، العطور الفاخرة، والإكسسوارات مع تجهيز وتغليف هدايا ملكية لجميع مناسباتك.
                    </p>
                    <div className="icons">
                        <Link to={facebook} target='_blank' rel="noopener noreferrer" title='facebook' className="facebook">
                            <FaceBook />
                        </Link>
                        {X ? (
                            <Link to={X} target='_blank' rel="noopener noreferrer" title='X' className="x">
                                <Twitter />
                            </Link> 
                        ) : null}
                        <Link to={instagram} target='_blank' rel="noopener noreferrer" title='instagram' className="instagram">
                            <Instagram />
                        </Link> 
                        <Link to={tikTok} target='_blank' rel="noopener noreferrer" title='TikTok' className="TikTok">
                            <TikTok />
                        </Link> 
                        {telegram ? (
                            <Link to={telegram} target='_blank' rel="noopener noreferrer" title='telegram' className="Telegram">
                                <Telegram />
                            </Link> 
                        ) : null}
                        <Link to={waUrl} target='_blank' rel="noopener noreferrer" title='whatsApp' className="whatsApp">
                            <WhatsApp />
                        </Link> 
                    </div>
                </div>
                <div className='uls'>
                    {footerData(categories).map((el, i) => (
                        <FooterList key={i} title={el.title} data={el.data} />
                    ))}
                </div>
                <div className="contactColumn">
                    <h4>خدمة العملاء والطلبات</h4>
                    <p className="contactText">
                        استقبال الطلبات يومياً (من 11:00 صباحاً حتى 11:00 مساءً) مع خدمة التوصيل السريع لكافة مناطق قطاع غزة.
                    </p>
                    <Link to={waUrl} className="whatsAppButton" target="_blank" rel="noopener noreferrer">
                        <span>💬 اطلبي عبر واتساب (0597229340)</span>
                    </Link>
                </div>
            </Container>
            <Copy />
        </FooterStyled>
    )
}

export default Footer