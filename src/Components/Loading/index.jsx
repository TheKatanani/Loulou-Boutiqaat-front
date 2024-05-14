import React, { Component } from 'react';
import { LoadingStyled } from './styles';

class Loading extends Component {
  render() {
    return (
      <LoadingStyled>
        <div className="loading-spinner"></div>
        <p className="loading-message">Loading...</p>
      </LoadingStyled>
    );
  }
}

export default Loading;
