import Input from '../../../Components/Input/index.jsx'
import { Input as InputStyle, Label } from '../../../Components/Input/style.js'
import Select from '../../../Components/Select/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, setCategories } from '../../../redux/reducers/categories.js'
import FileHandler from '../../../Components/common/FileHandler/index.jsx'
import { useEffect } from 'react'
import { addNewProduct, cancelUpdate, handleInputChangeReducer, selectAddProductsState, selectError, selectMood, selectStatus, setStatusFailed, setStatusIdle, setStatusLoading, updateProduct } from '../../../redux/reducers/products.js'
import { MOOD } from '../../../Actions/index.js'
import { StyledForm } from '../sytled.js'
import ButtonAnimation from '../../../Components/common/ButtonAnimation/index.jsx'
import { validationSchema } from './validation.js'
import ErrorForm from '../../../Components/ErrorForm/index.jsx'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet.js'
import { MainButton } from '../../../Global/components.js' 

const Form = () => {
  const dispatch = useDispatch()
  const catitories = useSelector(selectCategories)
  const formData = useSelector(selectAddProductsState)
  const status = useSelector(selectStatus)
  const mood = useSelector(selectMood)
  const errors = useSelector(selectError);
  const axiosPrivate = useAxiosPrivate()

  const handleInputChange = (e) => {
    const { id, value } = e.target
    dispatch(handleInputChangeReducer({ id, value }))
  }

  const setImages = (value) => {
    dispatch(handleInputChangeReducer({ id: 'images', value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(setStatusLoading())
      await validationSchema.validate(formData, { abortEarly: false });
      if (mood === MOOD.ADD) {
        dispatch(addNewProduct({ newProduct: formData, axiosPrivate }))
      } else {
        dispatch(updateProduct({ product: formData, axiosPrivate }))
      }
    } catch (e) {
      const errors = e.inner?.reduce((acc, { path, message }) => {
        acc[path] = message;
        return acc;
      }, {});
      dispatch(setStatusFailed({ ...{ errors } }));
    }
  }

  useEffect(() => {
    dispatch(setCategories())
    dispatch(setStatusIdle())
  }, [dispatch])

  useEffect(() => {
    if (catitories?.length && !formData.categoryId) {
      dispatch(handleInputChangeReducer({ id: 'categoryId', value: catitories[0].id }))
    }
  }, [catitories, dispatch, formData.categoryId])

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3 className="formTitle">
        {mood === MOOD.ADD ? '✨ إضافة منتج جديد إلى المتجر' : '✏️ تعديل بيانات المنتج'}
      </h3>

      {errors?.name && <ErrorForm>{errors?.name}</ErrorForm>}
      <Input
        onChange={handleInputChange}
        id="name"
        type="text"
        placeholder="مثال: عطر رويال عود الملكي - 100 مل"
        label="اسم المنتج"
        required
        value={formData.name || ''}
      />

      {errors?.description && <ErrorForm>{errors?.description}</ErrorForm>}
      <div className="input" style={{ marginTop: 14 }}>
        <Label htmlFor='description'>وصف ومميزات المنتج</Label>
        <InputStyle
          as='textarea'
          onChange={handleInputChange}
          id="description"
          placeholder="اكتبي تفاصيل المنتج ونفحات العطر أو طريقة الاستخدام..."
          value={formData.description || ''}
        />
      </div>

      <div className="d-flex">
        <div>
          {errors?.price && <ErrorForm>{errors?.price}</ErrorForm>}
          <Input
            id="price"
            type="number"
            placeholder="0.00"
            label='السعر الحالي (₪)'
            required
            onChange={handleInputChange}
            value={formData.price || ''}
          />
        </div>
        <div>
          {errors?.prevPrice && <ErrorForm>{errors?.prevPrice}</ErrorForm>}
          <Input
            id="prevPrice"
            type="number"
            placeholder="0.00"
            label='السعر السابق قبل الخصم (₪)'
            onChange={handleInputChange}
            value={formData.prevPrice || ''}
          />
        </div> 
      </div>

      <div className="d-flex">
        <Select 
          id="published"
          value={formData.published} 
          onChange={handleInputChange}
          label={'حالة النشر في المتجر'}
          options={[
            { value: true, label: 'منشور ومتاح للشراء' },
            { value: false, label: 'مسودة (مخفي مؤقتاً)' }
          ]}
          defualt
        />

        <Select 
          id="stars"
          value={formData.stars} 
          onChange={handleInputChange}
          label={'التقييم الافتراضي'}
          options={[
            { value: '5', label: '⭐⭐⭐⭐⭐ (5 نجوم)' },
            { value: '4', label: '⭐⭐⭐⭐ (4 نجوم)' },
            { value: '3', label: '⭐⭐⭐ (3 نجوم)' },
            { value: '2', label: '⭐⭐ (نجمتان)' },
            { value: '1', label: '⭐ (نجمة واحدة)' },
          ]}
          defualt
        />

        <Select 
          id="categoryId"
          value={formData.categoryId} 
          onChange={handleInputChange}
          label={'القسم التابع له'}
          options={
            catitories?.map((category) => ({ value: category.id, label: category.name }))
          }
          defualt
        />
      </div>

      {errors?.images && <ErrorForm>{errors?.images}</ErrorForm>}
      <div style={{ marginTop: 16 }}>
        <Label>روابط صور المنتج</Label>
        <FileHandler 
          images={formData?.images && typeof (formData.images) === 'string' ? JSON.parse(formData.images) : (formData.images || [])} 
          setImages={setImages} 
        />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
        <ButtonAnimation status={status}>
          {mood === MOOD.ADD ? 'حفظ وإضافة المنتج' : 'تحديث بيانات المنتج'}
        </ButtonAnimation>

        {mood === MOOD.UPDATE && (
          <MainButton type="button" className="cansel" onClick={() => dispatch(cancelUpdate())}>
            إلغاء التعديل
          </MainButton>
        )}
      </div>

      {errors?.isAxiosError && <ErrorForm>{errors?.isAxiosError}</ErrorForm>}
    </StyledForm>
  )
}

export default Form