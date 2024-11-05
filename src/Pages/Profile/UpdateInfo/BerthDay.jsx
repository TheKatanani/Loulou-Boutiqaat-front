import Input from '../../../Components/Input' 

const BarthDay = ({ setInput, input, errors }) => {
  return (
    <>
      <Input
        onChange={(e) => setInput(e.target.value)}
        id="barthDay"
        type="date"
        placeholder="اكتب هنا"
        label="تاريخ الميلاد"
        value={input}
      />
    </>
  )
}

export default BarthDay