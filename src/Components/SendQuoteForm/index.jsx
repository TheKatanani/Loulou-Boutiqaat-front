import React, { useState } from 'react'
import { NewsletterButton } from '../../Global/components';
import Input from '../Input'
import {Input as InputStyeld} from '../Input/style.js'
import { SendFormStyle } from './styled';

const SendQuoteForm = () => {
    const [formData, setFormData] = useState({ itemName: '', details: '', Quantity: "" });
    const [Ship, setShip] = useState("")

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };
    return (
        <SendFormStyle>
            <h6>Send quote to suppliers</h6>
            <Input
                onChange={handleInputChange}
                id="itemName"
                type="text"
                placeholder="What item you need?"
                value={formData.itemName}
            />
            <InputStyeld as="textarea"onChange={handleInputChange} id="details" placeholder="Type more details" value={formData.details}></InputStyeld>

            <div className='box'>
                <Input
                    onChange={handleInputChange}
                    id="Quantity"
                    type="text"
                    placeholder="Quantity"
                    value={formData.Quantity}
                />
                <select value={Ship} onChange={(e) => setShip(e.target.value)}>
                    <option value="">Pcs </option>
                    <option value="Ship1">Ship 1</option>
                    <option value="Ship2">Ship 2</option>
                    <option value="Ship3">Ship 3</option>
                </select>
            </div>
            <NewsletterButton>Send inquiry</NewsletterButton>
        </SendFormStyle>
    )
}

export default SendQuoteForm