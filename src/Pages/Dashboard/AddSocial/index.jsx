import React, { useState } from 'react'
import Input from '../../../Components/Input'
import { handleInputChange, selectFormData, selectStatus, updateSocial, setSocial } from '../../../redux/reducers/social'
import { useDispatch, useSelector } from 'react-redux'
import { StyledForm } from '../sytled'
import { STATUS } from '../../../Actions'
import ButtonAnimation from '../../../Components/common/ButtonAnimation'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import toast from 'react-hot-toast'

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

  const socialList = Array.isArray(formData) ? formData : [];

  const handleInputChangeFunc = (e) => {
    const { id, value } = e.target
    setChanged(prev => ([...(new Set([...prev, id]))])) 
    dispatch(handleInputChange({ id, value }))
  }

  const handelSubmit = async (e, name) => {
    e.preventDefault()
    if (changed.includes(name)) {
      const social = socialList.find(el => el.name === name)
      if (social) {
        await dispatch(updateSocial({ social, axiosPrivate }))
        setChanged(prev => prev.filter(item => item !== name))
        toast.success(`تم حفظ ${socialLabels[name] || name} بنجاح!`);
        dispatch(setSocial());
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

      {socialList.length > 0 ? (
        socialList.map(social => {
          const isChanged = changed?.includes(social.name);
          const label = socialLabels[social.name] || `رابط ${social.name}`;
          const itemStatusObj = Array.isArray(status) ? status.find(el => el.name === social.name) : null;
          const currentItemStatus = itemStatusObj ? itemStatusObj.status : STATUS.IDLE;

          return (
            <StyledForm key={social.name} onSubmit={(e) => handelSubmit(e, social.name)}>
              <Input
                id={social.name}
                type="text"
                placeholder={`أدخل رابط أو معرف ${social.name}...`}
                label={label}
                onChange={handleInputChangeFunc}
                value={socialList.find(el => el.name === social.name)?.value || ''}
              />
              <div style={{ marginTop: 14 }}>
                <ButtonAnimation 
                  className={!isChanged ? `disabled` : undefined} 
                  disabled={!isChanged} 
                  status={currentItemStatus}
                >
                  {isChanged ? 'حفظ التعديل ✨' : 'تم الحفظ ✓'}
                </ButtonAnimation>
              </div>
            </StyledForm>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          جاري تحميل وسائل التواصل...
        </div>
      )}
    </div>
  )
}

export default AddSocial