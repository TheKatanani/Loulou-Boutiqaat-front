import React, { useEffect, useState } from 'react'
import PhoneInputGroup from '../../../Components/common/PhoneInputGroup'
import LogoLoading from '../../../Components/common/LogoLoading'
import ErrorForm from '../../../Components/ErrorForm'
import useFetch from '../../../Hook/useFetch'
import { API2 } from '../../../API'

const Phone = ({ setInput, errors }) => {
  const { data: allowedPhones, error, isLoading } = useFetch(`${API2}/countryCode`)
  const [selectPhone, setSelectPhone] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    setInput(`${selectPhone}${phone}`)
  }, [selectPhone, phone, setInput])

  useEffect(() => {
    if (!isLoading && allowedPhones?.length) {
      setSelectPhone(allowedPhones[0].value)
    }
  }, [isLoading, allowedPhones])

  if (isLoading) {
    return <LogoLoading />
  }
  if (error) {
    return <p style={{ textAlign: 'center', padding: 20 }}>{error}</p>
  }

  return (
    <div>
      {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
      <PhoneInputGroup
        label="رقم الجوال"
        phoneId="phone"
        selectId="selectPhone"
        phoneValue={phone}
        selectValue={selectPhone}
        options={allowedPhones}
        placeholder="59-123-4567"
        onPhoneChange={(e) => setPhone(e.target.value?.trim())}
        onSelectChange={(e) => setSelectPhone(e.target.value)}
      />
    </div>
  )
}

export default Phone