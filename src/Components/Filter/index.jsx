// import React, { useState } from 'react'
import { Menu, Menu2 } from '../../Icons';
import { Input } from "../Input/style";
import SearchComponent from '../Search';
import { FilterStyled } from './Styled';

const Filter = ({ setIsFull, isFull }) => {  
    return (
        <FilterStyled>
            {/* <p>12,911 items in <span>Mobile accessory</span></p> */}
            <SearchComponent isOnChangeRequest={false}/>
            <div>  
                <Input as="div" className='mood'>
                    <div onClick={()=>setIsFull(false)} className={!isFull ? 'active' : ""} >
                        <Menu />
                    </div>
                    <div onClick={()=>setIsFull(true)} className={isFull ? 'active' : ""} >
                        <Menu2 />
                    </div>
                </Input>
            </div>
        </FilterStyled>
    )
}

export default Filter