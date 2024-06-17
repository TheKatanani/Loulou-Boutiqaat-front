import React from 'react'
import Hero from '../../Components/views/Hero';
import Categories from '../../Components/views/Categories';
import TransitionOne from '../../Components/UI/TansitionOne';
import { useSelector } from 'react-redux';
import { selectPublishedCategoryies } from '../../redux/reducers/categories';

const Home = () => {
  const categories = useSelector(selectPublishedCategoryies)
  return (
    <>
      <Hero />
      {
        !!categories.length &&
        <>
          <TransitionOne card="two" title="categories" />
          <Categories />
        </>
      }
    </>
  )
}
export default Home;