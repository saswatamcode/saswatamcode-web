import styled, { keyframes } from "styled-components/macro"

const FadeOut = keyframes`
  0%{
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`

const Layout = styled.div`
  padding: 0px;
  margin: 0px;
  opacity: 0;
  animation: ${FadeOut} 0.6s 0.3s ease-in-out forwards;
`

export default Layout
