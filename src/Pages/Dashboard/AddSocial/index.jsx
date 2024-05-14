import React, { useEffect, useState } from 'react'
import Input from '../../../Components/Input'
import { handleInputChange, saveSocial, selectFormData, selectStatus, setSocial } from '../../../redux/reducers/social'
import { useDispatch, useSelector } from 'react-redux'
import { MainButton } from '../../../Global/components'
import { StyledForm } from '../sytled'
import { STATUS } from '../../../Actions'
import ButtonAnimation from '../../../Components/common/ButtonAnimation'

const AddSocial = () => {
  const formData = useSelector(selectFormData)
  const status = useSelector(selectStatus)
  const dispatch = useDispatch()
  const [changed, setChaged] = useState(false)

  const handleInputChangeFunc = (e) => {
    const { id, value } = e.target
    setChaged(true)
    dispatch(handleInputChange({ id, value }))
  }
  const handelSubmit = (e) => {
    e.preventDefault()
    if (changed) {
      dispatch(saveSocial({ social: formData }))
      if (status === STATUS.SUCCEEDED) {
        setChaged(false)
      }
    }
  }
  useEffect(() => {
    dispatch(setSocial())
  }, [dispatch])
  return (
    <StyledForm onSubmit={handelSubmit}>
      <Input
        id="instagram"
        type="text"
        placeholder="instagram"
        label='instagram'
        onChange={handleInputChangeFunc}
        value={formData.instagram}
      />
      <Input
        id="facebook"
        type="text"
        placeholder="facebook"
        label='facebook'
        onChange={handleInputChangeFunc}
        value={formData.facebook}
      />
      <Input
        id="tiktok"
        type="text"
        placeholder="tiktok"
        label='tiktok'
        onChange={handleInputChangeFunc}
        value={formData.tiktok}
      />
      <ButtonAnimation className={!changed ? `disabled` : undefined} disabled={!changed} status={status}>
        save
      </ButtonAnimation>
    </StyledForm>
  )
}

export default AddSocial