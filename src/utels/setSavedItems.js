import {
  setSaved
} from "../redux/reducers/products"

const setSavedStorage = (userID,dispatch) => { 
  const saved = JSON.parse(localStorage.getItem('save'))
  if (saved) { 
    const foundedUserData = saved?.find(el => el.id === userID)
    // foundedUserData &&
    //   dispatch(setSaved(foundedUserData))
  }
}
export default setSavedStorage;