import React from 'react'
import { Link } from 'react-router-dom'
import Payments from '../Payments'
import { Footer } from './styles'

const index = () => {
  return (
    <Footer>
        <Payments/>
        <ul>
            <li>
                <Link to="/Support">Support</Link>
            </li>
            <li>
                <Link to="/Privacy&Cookies">Privacy & Cookies</Link>
            </li>
            <li>
                <Link to="/Accessibility">Accessibility</Link>
            </li>
        </ul>
    </Footer>
  )
}


export default index