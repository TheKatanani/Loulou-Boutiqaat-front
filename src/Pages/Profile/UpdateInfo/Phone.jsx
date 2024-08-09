import React, { useEffect, useState } from 'react'
import Select from '../../../Components/Select'
import LogoLoading from '../../../Components/common/LogoLoading'
import ErrorForm from '../../../Components/ErrorForm'
import Input from '../../../Components/Input'
import useFetch from '../../../Hook/useFetch'
import { API2 } from '../../../API'

const Phone = ({ setInput, errors }) => {
  const { data: allowedPhones, error, isLoading } = useFetch(`${API2}/countryCode`)
  const [selectPhone, setSelectPhone] = useState()
  const [phone, setPhone] = useState('')
  useEffect(() => {
    setInput(`${selectPhone}${phone}`)
  }, [selectPhone, phone, setInput])
  useEffect(() => { 
    if (!isLoading) {
      setSelectPhone(allowedPhones?.[0].value)
    }
  }, [isLoading, allowedPhones])
  if (isLoading) {
    return <LogoLoading />
  }
  if (error) {
    return <p>{error}</p>
  } 
  return (
    <>
      {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
      <div className="phone">
        <label htmlFor="Phone">Phone</label>
        <div>
          <Select
            defualt={allowedPhones[0].value}
            id="selectPhone"
            value={selectPhone}
            onChange={(e) => setSelectPhone(e.target.value)}
            options={allowedPhones}
          />
          <Input
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            type="text"
            placeholder="00-000-00-00"
            value={phone}
          />
        </div>
      </div>
    </>
  )
}

export default Phone