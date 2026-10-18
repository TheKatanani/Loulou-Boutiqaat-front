import styled from 'styled-components';

export const Container = styled.div `
    padding: 0;
    margin: 0 auto;

    /* Mobile screens: Global 10px margin for main UI */
    @media (max-width: 767.9px) {
        width: calc(100% - 20px);
        margin: 0 10px;
        box-sizing: border-box;
    }

/* Small */
@media (min-width: 768px) {
    width: min(100%,750px);
    margin: 0 auto;
}
/* Medium */
@media (min-width: 992px) {
    width: min(100%,970px);
    margin: 0 auto;
}
/* Large */
@media (min-width: 1200px) {
    width: min(100%,1170px);
    margin: 0 auto;
}
`;
export const MainButton = styled.button`
    width: 100%;
    height: 46px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    font-family: 'Cairo', 'Tajawal', sans-serif;
    color: #ffffff;
    background: ${(props) => props.theme.palette.ColorApp.primary_gradient};
    box-shadow: 0 4px 14px rgba(109, 40, 217, 0.25);
    text-align: center;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(109, 40, 217, 0.35);
        background: linear-gradient(135deg, #5b21b6, #7c3aed);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`
export const ButtonUpadte = styled.button `
    padding: 5px 7px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    color:${({theme})=>theme.palette.ColorApp.white};
    text-decoration: none!important;;
    display:block;
    background-color:${({theme})=>theme.palette.ColorApp.primary_light};
    ${({theme:{media}})=>media.xs}{
        font-weight: normal;
        padding: 2px 4px;
        font-size: 1rem;
  }
`
export const LogInButton = styled(MainButton)
`
    background-color: ${(props)=>props.theme.palette.ColorApp.primary};
    color:${(props)=>props.theme.palette.ColorApp.white};
`
export const PrimaryButton = styled(MainButton)
`
    background-color:${props=>props.theme.palette.ColorApp.primary};
    color:${props=>props.theme.palette.ColorApp.white};
`

export const WhitePrimaryButton = styled(MainButton)
`
    border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
    background-color:${props=>props.theme.palette.ColorApp.white};
    color:${props=>props.theme.palette.ColorApp.primary};
`
export const NewsletterButton = styled(LogInButton)
`
    width:fit-content;
    padding:10px;
`
export const Info = styled.div `
            display: flex;
            justify-content:flex-start;
            align-items:baseline;
            margin:7px 0;
            > div , > p{
                position:relative;
                margin:5px 25px 5px 0;
            }
            *:not(:last-child)::after{
                content:"";
                position: absolute;
                width:8px;
                height:8px;
                right:-15px;
                top:50%;
                border-radius: 50%;
                transform:translateY(-50%);
                background-color:${(props) =>  props.theme.palette.ColorApp.gray_300};
            }
`
export const IconButton = styled.div `
    position:relative;
    margin:10px 0;
    img{
        position:absolute;
        left:11px;
        top:9px;
        width:22px
    }
`
export const GoogleButton = styled(MainButton)
`
    background-color: ${(props)=>props.theme.palette.ColorApp.gray_200};
    color:${(props)=>props.theme.palette.ColorApp.gray_800};
    box-shadow: 0px 1px 3px rgba(56, 56, 56, 0.1);
`
export const FaceButton = styled(MainButton)
`
    background-color: #4267B2;
    color:${(props)=>props.theme.palette.ColorApp.white};
`
export const LiSignIn = styled.li `
    background-color:${(props)=>props.theme.palette.ColorApp.white};
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    padding:2px;
    width:35px;
    text-align:center;
`