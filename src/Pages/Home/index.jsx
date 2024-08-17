import React, { useEffect } from 'react'
import Hero from '../../Components/views/Hero';
import Categories from '../../Components/views/Categories';
import TransitionOne from '../../Components/UI/TansitionOne';
import { useDispatch, useSelector } from 'react-redux';
import { selectPublishedCategoryies } from '../../redux/reducers/categories';
import { setStatusIdle } from '../../redux/reducers/orders';

const Home = () => {
  const categories = useSelector(selectPublishedCategoryies)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setStatusIdle())
  }, [dispatch])
  return (
    <>
      <Hero />
      {
        !!categories.length &&
        <>
          <TransitionOne card="two" title="الأقسام" />
          <Categories />
        </>
      }
    </>
  )
}
export default Home;