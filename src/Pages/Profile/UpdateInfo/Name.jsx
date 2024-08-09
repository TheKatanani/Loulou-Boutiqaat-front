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
        placeholder="Type here"
        label="Name"
        value={input}
      />
    </>
  )
}

export default Name