import {
  createGlobalStyle
} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  scroll-behavior: smooth;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
td {
    overflow: auto;
}
body {
  background-color: ${(props) => props.theme.palette.page};
  color: ${(props) => props.theme.palette.font};
  font-family: 'Cairo', 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  li,
  ul,
  a {
    direction: rtl;
  }
}
input, button, select, textarea {
  font-family: 'Cairo', 'Tajawal', sans-serif;
}

/* Universal rule: Numbers and numeric inputs are always LTR */
input[type="tel"],
input[type="number"],
input[type="date"],
input[type="time"] {
  direction: ltr !important;
  text-align: left;
}

td.phone,
span.phone,
.phone-number,
.ltr-number {
  direction: ltr !important;
  display: inline-block;
  unicode-bidi: embed;
}
/* Modern Luxury Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: ${(props) => props.theme.palette.main};
}
::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.palette.ColorApp.primary_light};
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.palette.ColorApp.primary};
}

a {
    text-decoration: none;
    transition: all 0.2s ease-in-out;
}
ul {
  list-style: none;
}
button.disabled, button:disabled {
  background-color: ${(props) => props.theme.palette.ColorApp.gray_100}!important;
  color: ${(props) => props.theme.palette.ColorApp.gray_400}!important;
  cursor: not-allowed !important;
}
/* Small */
@media (max-width: 576px) {   
  html {
    font-size: 72.5%;
  }
}
`;