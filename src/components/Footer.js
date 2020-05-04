import React from "react"
import styled from "styled-components/macro"
import { breakpoints } from "./Media"
import Collab from "../images/Collab.svg"

const FooterCont = styled.div`
  margin-top: -150px;
  height: auto;
  background-color: #d3d3d3;
  border: 1px solid transparent;
  a {
    text-align: left;
    color: black;
  }

  left: 0px;
  right: 0px;
  margin-bottom: 0px;
`

const FooterLogoImg = styled.div`
  font-size: 24px;
  padding-left: 5%;
  font-weight: 600;
  color: black;
  margin-bottom: 40px;
`

const Email = styled.div`
  color: black;
  font-weight: 700;
  padding-bottom: 5px;
  border-bottom: 2px solid black;
  display: inline-block;
  transition: border-bottom 0.2s;
  margin-left: 10%;
  margin-bottom: 60px;
  bottom: 10px;

  :hover {
    border-bottom: 2px solid transparent;
  }
`
const FooterHeading = styled.h1`
  font-style: normal;
  font-weight: 900;
  font-size: 33px;
  line-height: 129.69%;
  letter-spacing: 0.03em;
  margin-left: 20px;

  @media (min-width: ${breakpoints.mobileMax}) {
    font-size: 40px;
    transform: scale(1);
  }

  > span {
    color: #b4e0e8;
  }
`
const FooterPara = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 184.69%;
  letter-spacing: 0.03em;
  width: 30%;
  margin-left: 30px;
  @media only screen and (max-width: 600px) {
    width: 300px;
  }
`
const FooterImg = styled.img`
  height: 300px;
  width: 300px;
  float: right;
  margin-top: -175px;
  margin-right: 100px;
  @media only screen and (max-width: 600px) {
    display: none;
    visibility: hidden;
  }
`

export default function Footer() {
  return (
    <FooterCont>
      <FooterHeading>Let's build something together</FooterHeading>
      <FooterPara>
        Looking for a developer or have an interesting idea? Feel free to reach
        out via email or any of my other socials
      </FooterPara>
      <a href="mailto: saswataminsta@yahoo.com">
        <Email>saswataminsta@yahoo.com</Email>
      </a>
      <FooterImg src={Collab} alt="Collaboration"/>
      <FooterLogoImg href="">SM.</FooterLogoImg>
    </FooterCont>
  )
}
