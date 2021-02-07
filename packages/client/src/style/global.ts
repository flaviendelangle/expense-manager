import { createGlobalStyle } from 'styled-components'

import { theme } from '@habx/ui-core'

export const GlobalStyle = createGlobalStyle`
  html {
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${theme.font()};
  }
  
  html, body, #root {
    margin: 0;
    padding: 0;
    color: ${theme.textColor()};
  }
  
  #root {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;  
  }
  
  * {
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;    
  }
  
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
  
  a {
    text-decoration: none;
    font-weight: 500;
    color: inherit;
    
    &:visited {
      color: inherit;
    }
  }
  
  .dg.ac {
    display: none;
  }
`
