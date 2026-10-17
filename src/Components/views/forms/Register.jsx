import React, { useEffect } from 'react'
import Input from '../../Input'
import ErrorForm from '../../ErrorForm'
import useFetch from '../../../Hook/useFetch'
import Select from '../../Select'
import PhoneInputGroup from '../../common/PhoneInputGroup'
import { useDispatch, useSelector } from 'react-redux'
import { MainButton } from '../../../Global/components' 
import { API2 } from '../../../API'
import LogoLoading from '../../common/LogoLoading'
import { StyledRigisterForm } from './styled'
import { handleInputChangeReducer, reSetUser, selectMood } from '../../../redux/reducers/users'
import { MOOD, ROLES } from '../../../Actions'
import PasswordInput from '../../common/PasswordInput'
import { selectUser } from '../../../redux/reducers/auth'
import { Link } from 'react-router-dom'
import ButtonAnimation from '../../common/ButtonAnimation'

const Register = ({ setGender, isFromUserProfile, errors, status, showPasswordFunc, showPassword, formData, handleSubmit, handleInputChangeFunc }) => {
  const { data: allowedPhones, isLoading, error } = useFetch(`${API2}/countryCode`)
  const user = useSelector(selectUser)  
  const mood = useSelector(selectMood)
  const dispatch = useDispatch()
  const [showPass, setShowPass] = React.useState(false)
  const [showConfirmPass, setShowConfirmPass] = React.useState(false)

  const handleInputChange = ({id,value,event})=>{  
    event.target.value = value
    event.target.id = id 
    return handleInputChangeFunc(event)
  }
  useEffect(() => {
    if (mood === MOOD.UPDATE) {
      // to dont fill the new password input in hash password
      dispatch(handleInputChangeReducer({ id: "password", value: '' }))
    }
  }, [formData.id, dispatch, mood])
  if (isLoading) {
    return <LogoLoading />
  }
  if (error) {
    return <p style={{ textAlign: 'center', padding: 20 }}>{error}</p>
  }
  const defaultCountry = allowedPhones?.[0]?.value || '+970'

  return (
    <StyledRigisterForm onSubmit={handleSubmit}>
      {errors?.name && <ErrorForm>{errors?.name}</ErrorForm>}
      <Input
        onChange={handleInputChangeFunc}
        id="name"
        type="text"
        placeholder="الاسم الكامل"
        label="اسم المستخدم"
        value={formData.name || ''}
      />

      {errors?.phone && <ErrorForm>{errors?.phone}</ErrorForm>}
      <PhoneInputGroup
        label="رقم الجوال"
        phoneId="phone"
        selectId="selectPhone"
        phoneValue={formData.phone || ''}
        selectValue={formData.selectPhone || defaultCountry}
        options={allowedPhones}
        placeholder="59-123-4567"
        required
        onPhoneChange={(e)=>{
          handleInputChange({ id: 'phone', value: (e.target.value?.trim()), event: e })
        }}
        onSelectChange={handleInputChangeFunc}
      />

      {errors?.gender && <ErrorForm>{errors?.gender}</ErrorForm>}
      <div className="genderGroup">
        <span className="genderLabel">الجنس</span>
        <div className="genderOptions">
          <label className={formData.gender === 'female' ? 'selected' : ''}>
            <input 
              type="radio" 
              name="gender" 
              id="female"
              onChange={() => dispatch(setGender('female'))}
              checked={formData.gender === 'female'}
            />
            أنثى 🌸
          </label>
          <label className={formData.gender === 'male' ? 'selected' : ''}>
            <input 
              type="radio" 
              name="gender" 
              id="male"
              onChange={() => dispatch(setGender('male'))}
              checked={formData.gender === 'male'}
            />
            ذكر 👔
          </label>
        </div>
      </div>

      {
        user.role === ROLES.USER &&
        (
          <>
            {errors?.currentPassword && <ErrorForm>{errors?.currentPassword}</ErrorForm>}
            <PasswordInput 
              handleInputChange={handleInputChangeFunc} 
              showPasswordFunc={showPasswordFunc} 
              id={"currentPassword"} 
              label={"كلمة المرور الحالية"} 
              value={formData?.currentPassword} 
              showPassword={showPassword} 
              hideForgot={true}
            />
          </>
        )
      }

      {
        <>
          {errors?.password && <ErrorForm>{errors?.password}</ErrorForm>}
          <PasswordInput
            handleInputChange={handleInputChangeFunc}
            id="password"
            label="كلمة المرور"
            placeholder="••••••••"
            value={formData.password}
            showPassword={showPass}
            onToggle={() => setShowPass(!showPass)}
            hideForgot={true}
          />

          {errors?.confirmPassword && <ErrorForm>{errors?.confirmPassword}</ErrorForm>}
          <PasswordInput
            handleInputChange={handleInputChangeFunc}
            id="confirmPassword"
            label="تأكيد كلمة المرور"
            placeholder="••••••••"
            value={formData.confirmPassword}
            showPassword={showConfirmPass}
            onToggle={() => setShowConfirmPass(!showConfirmPass)}
            hideForgot={true}
          />
        </>
      }

      {
        user?.role === ROLES.ADMIN && (
          <div style={{ marginBottom: 14 }}>
            {errors?.role && <ErrorForm>{errors?.role}</ErrorForm>}
            <Select
              defualt={formData.role || Object.keys(ROLES)[0] || 'USER'}
              label={"صلاحية المستخدم"}
              id="role"
              value={formData.role}
              onChange={handleInputChangeFunc}
              options={
                Object.keys(ROLES).map(key => ({ value: key, label: key.toLowerCase() }))
              }
            />
          </div>
        )
      }

      {errors?.barthDay && <ErrorForm>{errors?.barthDay}</ErrorForm>}
      <div className="dateGroup">
        <label htmlFor="barthDay">تاريخ الميلاد</label>
        <input
          type="date"
          name="barthDay"
          id="barthDay"
          value={formData.barthDay || '2000-01-01'}
          onChange={handleInputChangeFunc}
        />
      </div>

      <div className="submitArea">
        <ButtonAnimation status={status}>
          {mood === MOOD.UPDATE ? "تحديث البيانات" : "إنشاء الحساب ✨"}
        </ButtonAnimation>
      </div>

      {
        mood === MOOD.UPDATE && (isFromUserProfile
          ?
          <Link to={'/home/profile'} style={{ display: 'block', marginTop: 10 }}>
            <MainButton type='button' style={{ background: '#94a3b8' }}>إلغاء</MainButton>
          </Link>
          :
          <MainButton type='button' className="cansel" style={{ background: '#94a3b8', marginTop: 10 }} onClick={() => {
            dispatch(reSetUser())
          }}>إلغاء</MainButton>)
      }
      {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
      {errors?.message && <ErrorForm>{errors?.message}</ErrorForm>}
    </StyledRigisterForm>
  )
}

export default Register