import React from 'react'
import Input from '../../../Components/Input'
import ErrorForm from '../../../Components/ErrorForm'

const BarthDay = ({ setInput, input, errors }) => {
  return (
    <>
      {errors?.barthDay && <ErrorForm>{errors?.barthDay}</ErrorForm>}
      <Input
        onChange={(e) => setInput(e.target.value)}
        id="barthDay"
        type="date"
        placeholder="Type here"
        label="BarthDay"
        value={input}
      />
    </>
  )
}

export default BarthDay