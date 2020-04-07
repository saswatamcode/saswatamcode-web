import React from "react"
import styled, { keyframes } from "styled-components/macro"

const Gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Header = styled.div`
  width: 100%;
  background: rgb(246, 3, 24);
  background: linear-gradient(
    324deg,
    rgba(246, 3, 24, 1) 1%,
    rgba(0, 52, 254, 1) 98%
  );
  background-size: 400% 400%;
  animation: ${Gradient} 15s ease infinite;
  height: 700px;
  position: relative;
  
`
export default Header
