import React, { Fragment } from 'react'
import styled from 'styled-components';
import { StarGray, StarYellow } from '../../Icons';
const StyleRating = styled.div`
  span{
    color: #FF9017;
    margin:0 5px;
    font-size:${(props) => props.theme.fontSizes.body}rem;
    font-weight: 400;
  }
`
const Rating = ({ num, num2 }) => {
  const yellowStars = Array.from({ length: num }, (_, i) => i);
  const grayStars = Array.from({ length: 5 - num }, (_, i) => i + num);

  return (
    <StyleRating>
      {yellowStars.map((_, i) => (
        <Fragment key={i}>
          <StarYellow />
        </Fragment>
      ))}
      {grayStars.map((_, i) => (
        <Fragment key={i}>
          <StarGray />
        </Fragment>
      ))}
      <span>{num2}</span>
    </StyleRating>
  );
};

export default Rating;
