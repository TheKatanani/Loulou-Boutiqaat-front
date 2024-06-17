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
  SelectIsAuthenticated,
  selectUser
} from '../../redux/reducers/auth';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';
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
      } else {
        dispatch(removeFromSaved({
          productId: id,
          axiosPrivate
        }))
      }
    } else {
      if (!isInSaved) {
        dispatch(addTosavedLocal({
          productId: id
        }))
      } else {
        dispatch(removeFromsavedLocal({
          productId: id
        }))
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