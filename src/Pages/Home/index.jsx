import React from 'react'
import Hero from '../../Components/views/Hero';
import Categories from '../../Components/views/Categories';
import TransitionOne from '../../Components/UI/TansitionOne';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/reducers/categories';
import useRefreshToken from '../../Hook/useRefreshToken';

const Home = () => {
  const categories = useSelector(selectCategories)
  const refresh = useRefreshToken()
  const handleRefresh =async ()=>{
  const token = await refresh()
  console.log(token)
  }
  return (
    <>
      <Hero />
      {
        !!categories.length &&
        <>
          <TransitionOne card="two" title="categories" />
          <Categories />
          <button onClick={handleRefresh}>refresh</button>
        </>
      }
    </>
  )
}
export default Home;