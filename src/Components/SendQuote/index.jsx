import React from 'react'
import styled from 'styled-components'
import { NewsletterButton } from '../../Global/components'
import img from '../../Images/image102.png'
import SendQuoteForm from '../SendQuoteForm'
const SendQuoteStyled=styled.div`
    display: flex;
    flex-wrap: wrap;
    gap:30px;
    justify-content:space-between;
    border-radius: 6px;
    padding:40px 30px 60px 50px;
    background-image: url(${props=>props.src});
    background-size: cover;
    position:relative;
    ::before{
        content:"";
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: linear-gradient(94.99deg, #2C7CF1 7.19%, rgba(0, 209, 255, 0.5) 89.49%);
    }
    .text{
        width:390px;
        position:relative;
        h3{
            margin-bottom: 13px;
            color:${(props) =>  props.theme.palette.ColorApp.white};
            font-size:${(props) => props.theme.fontSizes.h3}rem;
        }
        p{
        color:${(props) =>  props.theme.palette.ColorApp.white};
        font-size:${(props) => props.theme.fontSizes.body}rem;
    }
}
form + button{
    position:relative;
    display: none;
}
/* Small */
@media (max-width: 576px) {
    form,p{
        display: none;
    }
    form + button{
        display: block;
    }
        }
`
const SendQuote = () => {
  return (
    <SendQuoteStyled src={img}>
        <div className="text">
            <h3>An easy way to send requests to all suppliers</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
        </div>
        <SendQuoteForm/>
        <NewsletterButton>Send inquiry</NewsletterButton>
    </SendQuoteStyled>
  )
}

export default SendQuote