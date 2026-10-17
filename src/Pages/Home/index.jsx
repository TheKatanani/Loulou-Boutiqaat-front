import React, { useEffect, useRef } from 'react'
import Hero from '../../Components/views/Hero';
import Features from '../../Components/views/Features';
import Categories from '../../Components/views/Categories';
import TransitionOne from '../../Components/UI/TansitionOne';
import { useDispatch, useSelector } from 'react-redux';
import { selectPublishedCategoryies } from '../../redux/reducers/categories';
import { setStatusIdle } from '../../redux/reducers/orders';

const Home = () => {
  const elementRefs = {
    hero: useRef(null),
    categories: useRef(null),
  }
  const categories = useSelector(selectPublishedCategoryies)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setStatusIdle())
  }, [dispatch])
  return (
    <>
      <Hero {...{ elementRefs }} />
      <Features />
      {
        !!categories.length &&
        <>
          <TransitionOne {...{ elementRefs }} title="تسوقي حسب الأقسام" />
          <Categories />
        </>
      }
    </>
  )
}
export default Home;