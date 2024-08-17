import React from 'react'
import Input from '../../../Components/Input'
import ErrorForm from '../../../Components/ErrorForm'

const Name = ({ setInput, input, errors }) => {
  return (
    <>
      {errors?.name && <ErrorForm>{errors?.name}</ErrorForm>}
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