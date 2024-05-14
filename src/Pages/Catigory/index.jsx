import React from 'react'
import { useParams } from 'react-router-dom'
import LogoLoading from '../../Components/common/LogoLoading'
import CatigoryComp from '../../Components/views/Catigories/Catigory'
import { selectCatigories } from '../../redux/reducers/catigories'
import { useSelector } from 'react-redux'
import { selectStatus } from '../../redux/reducers/catigories'
import { STATUS } from '../../Actions'

const Catigory = () => {
  const { catigory: catigoryId } = useParams()
  const catigories = useSelector(selectCatigories)
  const status = useSelector(selectStatus)
  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }
  const catigory = catigories?.find((catigory) => catigory.id == catigoryId)

  return (
    <div style={{ minHeight: '100dvh' }}>
      {
        catigory?.isVisibile &&
        <CatigoryComp key={catigoryId} {...catigory} />
      }
    </div>
  )
}

export default Catigory