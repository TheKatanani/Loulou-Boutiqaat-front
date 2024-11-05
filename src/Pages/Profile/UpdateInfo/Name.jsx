import React from 'react'
import Input from '../../../Components/Input' 
const Name = ({ setInput, input  }) => {
  return (
    <> 
      <Input
        onChange={(e) => setInput(e.target.value)}
        id="name"
        type="text"
        placeholder="اكتب هنا"
        label="لاسم"
        value={input}
      />
    </>
  )
}

export default Name