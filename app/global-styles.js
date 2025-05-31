import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Cairo', sans-serif !important;
  }

  body {
    font-family: 'Cairo', sans-serif !important;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
    font-display: swap;
  }

  body.fontLoaded {
    font-family: 'Cairo', sans-serif !important;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.2;
    font-family: 'Cairo', sans-serif !important;
  }

  p {
    margin: 0;
    font-family: 'Cairo', sans-serif !important;
  }

  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease;
    font-family: 'Cairo', sans-serif !important;

    &:hover {
      color: #0056b3;
    }
  }

  button {
    font-family: 'Cairo', sans-serif !important;
    font-size: inherit;
  }

  input,
  textarea,
  select {
    font-family: 'Cairo', sans-serif !important;
    font-size: inherit;
  }

  span,
  div,
  li,
  ul,
  ol,
  nav,
  header,
  footer,
  section,
  article,
  aside {
    font-family: 'Cairo', sans-serif !important;
  }

  ::selection {
    background-color: #007bff;
    color: white;
  }
`;

export default GlobalStyle;
