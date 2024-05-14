import React from 'react' 
import {  OrdersNull } from '../../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { StyledSaved } from './styled'; 
import { addToSaved, addTosavedLocal, removeFromSaved, removeFromsavedLocal, selectsaved } from '../../redux/reducers/saved';
import { selectUser } from '../../redux/reducers/auth';
const LikeButton = ({id}) => {
  const dispatch = useDispatch()
  let saved = useSelector(selectsaved) 
  let user = useSelector(selectUser)
   
  const foundedSaved = saved?.find(el=>el===id)  
  const isInSaved = !!foundedSaved;
  const handleSaveForLater = ()=>{ 
    if(user.id){ 
    if(!isInSaved){
      dispatch(addToSaved({userId:user.id,productId:id,saved}))
    }else{
      dispatch(removeFromSaved({userId:user.id,productId:id,saved}))
    } 
  }else{
    if(!isInSaved){
      dispatch(addTosavedLocal({productId:id}))
    }else{
      dispatch(removeFromsavedLocal({productId:id}))
    }
  }   
}  
  return (
    <StyledSaved {...{ isInSaved}} className='saved' onClick={handleSaveForLater}> 
        <OrdersNull/>
    </StyledSaved>
  )
}

export default LikeButton