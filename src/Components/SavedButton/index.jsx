import React from 'react'
import {
  OrdersNull
} from '../../Icons';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  StyledSaved
} from './styled';
import {
  addToSaved,
  addTosavedLocal,
  removeFromSaved,
  removeFromsavedLocal,
  selectsaved
} from '../../redux/reducers/saved';
import {
  SelectIsAuthenticated
} from '../../redux/reducers/auth';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';
import toast from 'react-hot-toast';
const SavedButton = ({
  id
}) => {
  const dispatch = useDispatch()
  const saved = useSelector(selectsaved)
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const axiosPrivate = useAxiosPrivate()
  const foundedSaved = saved?.find(el => el == id)
  const isInSaved = !!foundedSaved;
  const handleSaveForLater = () => {
    if (isAuthenticated) {
      if (!isInSaved) {
        dispatch(addToSaved({
          productId: id,
          axiosPrivate
        }))
        toast.success('تمت إضافة المنتج إلى المفضلة ❤️')
      } else {
        dispatch(removeFromSaved({
          productId: id,
          axiosPrivate
        }))
        toast('تمت إزالة المنتج من المفضلة', { icon: '🤍' })
      }
    } else {
      if (!isInSaved) {
        dispatch(addTosavedLocal({
          productId: id
        }))
        toast.success('تمت إضافة المنتج إلى المفضلة ❤️')
      } else {
        dispatch(removeFromsavedLocal({
          productId: id
        }))
        toast('تمت إزالة المنتج من المفضلة', { icon: '🤍' })
      }
    }
  }
  return (<StyledSaved {
    ...{
      isInSaved
    }
  }
    className='saved'
    onClick={
      handleSaveForLater
    } >
    <OrdersNull />
  </StyledSaved>
  )
}

export default SavedButton