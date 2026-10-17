import React, { useState } from 'react'
import Input from '../../../Components/Input'
import { handleInputChange, selectFormData, selectStatus, updateSocial } from '../../../redux/reducers/social'
import { useDispatch, useSelector } from 'react-redux'
import { StyledForm } from '../sytled'
import { STATUS } from '../../../Actions'
import ButtonAnimation from '../../../Components/common/ButtonAnimation'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'

const socialLabels = {
  whatsapp: '💬 رقم أو رابط الواتساب (WhatsApp)',
  whatsApp: '💬 رقم أو رابط الواتساب (WhatsApp)',
  instagram: '📸 حساب الانستغرام (Instagram)',
  facebook: '🔵 صفحة الفيسبوك (Facebook)',
  tiktok: '🎵 حساب التيك توك (TikTok)',
  snapchat: '👻 حساب السناب شات (Snapchat)',
  twitter: '🐦 حساب منصة إكس (Twitter/X)',
  x: '🐦 حساب منصة إكس (Twitter/X)',
  telegram: '✈️ قناة أو حساب التليجرام (Telegram)'
};

const AddSocial = () => {
  const formData = useSelector(selectFormData)
  const status = useSelector(selectStatus)
  const dispatch = useDispatch()
  const [changed, setChanged] = useState([]) 
  const axiosPrivate = useAxiosPrivate()

  const handleInputChangeFunc = (e) => {
    const { id, value } = e.target
    setChanged(prev => ([...(new Set([...prev, id]))])) 
    dispatch(handleInputChange({ id, value }))
  }

  const handelSubmit = (e, name) => {
    e.preventDefault()
    if (changed) {
      const social = formData.find(el => el.name === name)
      dispatch(updateSocial({ social, axiosPrivate }))
      if (status === STATUS.SUCCEEDED) {
        setChanged(prev => prev.filter(item => item !== name))
      }
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
          يمكنك هنا تعديل أرقام وروابط قنوات التواصل والدعم الفني الخاصة بالمتجر لتظهر فورياً لجميع الزبائن.
        </p>
      </div>

      {formData?.map(social => {
        const isChanged = changed?.includes(social.name);
        const label = socialLabels[social.name] || `رابط ${social.name}`;
        const itemStatusObj = status?.find(el => el.name === social.name);
        const currentItemStatus = itemStatusObj ? itemStatusObj.status : STATUS.IDLE;

        return (
          <StyledForm key={social.name} onSubmit={(e) => handelSubmit(e, social.name)}>
            <Input
              id={social.name}
              type="text"
              placeholder={`أدخل رابط أو معرف ${social.name}...`}
              label={label}
              onChange={handleInputChangeFunc}
              value={formData.find(el => el.name === social.name)?.value || ''}
            />
            <div style={{ marginTop: 14 }}>
              <ButtonAnimation 
                className={!isChanged ? `disabled` : undefined} 
                disabled={!isChanged} 
                status={() => currentItemStatus}
              >
                {isChanged ? 'حفظ التعديل' : 'تم الحفظ'}
              </ButtonAnimation>
            </div>
          </StyledForm>
        );
      })}
    </div>
  )
}

export default AddSocial