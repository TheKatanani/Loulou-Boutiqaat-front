import React, { Component } from 'react';
import { PageNotFoundStyled } from './styles';
class PageNotFound extends Component {
  render() {
    return (
      <PageNotFoundStyled>
        <h1 className="title">404: Page Not Found</h1>
        <p className="message">Sorry, the page you were looking for could not be found.</p>
      </PageNotFoundStyled>
    );
  }
}

export default PageNotFound;
