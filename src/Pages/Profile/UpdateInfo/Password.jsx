import React from 'react'
import ErrorForm from '../../../Components/ErrorForm'
import Input from '../../../Components/Input'

const Password = ({ errors, newPassword, confirmPassword, setNewPassword, setConfirmPassword }) => {

  return (
    <>
        {errors?.password && <ErrorForm>{errors?.password}</ErrorForm>}
      <Input
        onChange={(e) => setNewPassword(e.target.value)}
        id="newPassword"
        type="password"
        placeholder="اكتب هنا"
        label="كلمة مرور جديدة"
        value={newPassword}
      /> 
      {errors?.confirmPassword && <ErrorForm>{errors?.confirmPassword}</ErrorForm>}
      <Input
        onChange={(e) => setConfirmPassword(e.target.value)}
        id="confirmPassword"
        type="password"
        placeholder="اكتب هنا"
        label="تاكيد كلمة المرور"
        value={confirmPassword}
      />
    </>
  )
}

export default Password