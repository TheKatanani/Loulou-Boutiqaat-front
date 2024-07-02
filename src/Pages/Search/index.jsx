import React from 'react'
import Aside from '../../Components/Aside'
import Main from '../../Components/Main' 
// import Path from '../../Components/Path'
import { Container } from '../../Global/components'
import styled from 'styled-components'
// const path = ["Home", "Clothings", "Men's wear", "Summer clothing"]
const PageStyled = styled.div`
    .content1{
        display: flex;
        min-height:50dvh;
    }
`
const Search = () => {
  return (
    <PageStyled> 
      <Container>
          {/* add this feture later to show the path */}
        {/* <Path path={path} /> */}
        <div className="content1">
          {/* add this feture later to filter the results */}
          {/* <Aside /> */}
          <Main />
        </div>
      </Container>  
    </PageStyled>
  )
}

export default Search