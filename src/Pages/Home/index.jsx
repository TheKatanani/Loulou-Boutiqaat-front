import React from 'react' 
import Hero from '../../Components/views/Hero';
import Catigories from '../../Components/views/Catigories';
import TransitionOne from '../../Components/UI/TansitionOne';

const Home = () => {
  return (
    <> 
        <Hero/>  
        <TransitionOne card="two" title="Catigories"/> 
        <Catigories/> 
    </>
  )
}
export default Home;