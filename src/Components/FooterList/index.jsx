import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoxStyled = styled.div`
  h4 {
    font-size: 1.05rem;
    font-weight: 800;
    margin-bottom: 16px;
    color: ${(props) => props.theme.palette.font};
    letter-spacing: 0.2px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  li {
    margin: 0;
    padding: 0;

    a {
      color: ${(props) => props.theme.palette.ColorApp.gray_600 || '#64748b'} !important;
      font-size: 0.95rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-block;
      transition: all 0.25s ease;
      width: 100%;

      &:visited {
        color: ${(props) => props.theme.palette.ColorApp.gray_600 || '#64748b'} !important;
      }

      &:hover {
        color: ${(props) => props.theme.palette.ColorApp.primary} !important;
        transform: translateX(-4px);
      }
    }
  }
`;

const FooterList = ({ title, data }) => {
  return (
    <BoxStyled>
      <h4>{title}</h4>
      <ul>
        {data.map((el, i) => (
          <li key={i}>
            <Link to={el?.link}>{el?.text}</Link>
          </li>
        ))}
      </ul>
    </BoxStyled>
  );
};

export default FooterList;
