const Gender = ({ setInput, input }) => {
  return (
    <>
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