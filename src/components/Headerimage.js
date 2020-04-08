import React from "react"
import styled from "styled-components/macro"
import Image from "../images/HeaderImage.svg"

const HeadImg = styled.img`
  height: 350px;
  width: 350px;
  float: right;
  margin-right: 10%;
  @media only screen and (max-width: 600px) {
    height: 100px;
    width: 100px;
    margin-top: 100px;
  }
`

export default function HeaderImage() {
  return <HeadImg src={Image} />
}
