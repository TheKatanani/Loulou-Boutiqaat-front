import React, { useState } from 'react'
import Input from '../../../Components/Input'
import { handleInputChange, selectFormData, selectStatus, updateSocial } from '../../../redux/reducers/social'
import { useDispatch, useSelector } from 'react-redux'
import { StyledForm } from '../sytled'
import { STATUS } from '../../../Actions'
import ButtonAnimation from '../../../Components/common/ButtonAnimation'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'

const AddSocial = () => {
  const formData = useSelector(selectFormData)
  const status = useSelector(selectStatus)
  const dispatch = useDispatch()
  const [changed, setChaged] = useState([]) 
  const axiosPrivate = useAxiosPrivate()
  const handleInputChangeFunc = (e) => {
    const { id, value } = e.target
    setChaged(prev =>([...(new Set([...prev, id]))])) 
    dispatch(handleInputChange({ id, value }))
  }
  const handelSubmit = (e, name) => {
    e.preventDefault()
    if (changed) {
      const social = formData.find(el => el.name === name)
      dispatch(updateSocial({ social, axiosPrivate }))
      if (status === STATUS.SUCCEEDED) {
        setChaged(null)
      }
    }
  }

  return (
    formData?.map(social => (
      <StyledForm key={social.name} onSubmit={(e) => handelSubmit(e, social.name)}>
        <Input
          id={social.name}
          type="text"
          placeholder={social.name}
          label={social.name}
          onChange={handleInputChangeFunc}
          value={formData.find(el => el.name === social.name).value}
        />
        <ButtonAnimation className={!changed?.find(el => el === social.name) ? `disabled` : undefined} disabled={!changed?.find(el => el === social.name)} status={
          () => {
            const itemStatus = status?.find(el => el.name === social.name)
            if (itemStatus) {
              return itemStatus.status
            } else {
              return STATUS.IDLE
            }
          }
        }>
          save
        </ButtonAnimation>
      </StyledForm>
    ))
  )
}
export default AddSocial 