import React from 'react' 
import ErrorForm from '../../../Components/ErrorForm'

const Gender = ({ setInput, input, errors }) => {
  return (
    <>
      {errors?.gender && <ErrorForm>{errors?.gender}</ErrorForm>} 
      <div className="gender">
        <label htmlFor="male">
          <input type="radio" name="gender" id="male"
            onChange={() => setInput('male')}
            checked={input === 'male'}
          />
          ذكر</label>
        <label htmlFor="male">
          <input type="radio" name="gender" id="female"
              onChange={() => setInput('female')}
              checked={input === 'female'}
          />
          انثى</label>
      </div>
    </>
  )
}

export default Gender