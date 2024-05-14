import React from 'react'
import {CheckStyled} from './style.js'
 const Checkbox =(props)=>{
    return (
        <CheckStyled className="checkbox">
            <input type="checkbox" id={props.id} onChange={props.onChange} checked={props.checked}/>
            <label htmlFor={props.id}>{props.label}<span className='primary'>{props.primary}</span></label>
      </CheckStyled>
    )
}
export default Checkbox;