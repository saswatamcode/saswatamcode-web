import React from "react"
import styled from "styled-components/macro"
import { breakpoints } from "./Media"

const ProjectBox = styled.div`
  width: 400px;
  height: 500px;
  margin: 50px;
  text-align: left;
  transition: 0.3s;
  :hover {
    transform: scale(1.05);
    a {
      border-bottom: 2px solid black;
    }
    
  }
  @media only screen and (max-width: 600px) {
    height: 350px;
}
  
`

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  transition-duration: 0.3s;
`

const ProjectName = styled.h2`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 129.69%;
  letter-spacing: 0.03em;
  margin-left: 10px;
  @media (min-width: ${breakpoints.mobileMax}) {
    font-size: 36px;
    transform: scale(1);
  }

  > span {
    color: #b4e0e8;
  }
`

const ProjectDesc = styled.p`
  width: 100%;
  text-align: left;
  color: grey;
`

const ProjectLink = styled.a`
  border-bottom: 2px solid transparent;
  transition: 0.3s;
  color: black;
  text-decoration: none;
  font-weight: bold;
`

export default function Project({ image, name, desc, link }) {
  return (
    <ProjectBox>
      <ProjectImage src={image} />

      <ProjectName>{name}</ProjectName>
      <ProjectDesc>{desc}</ProjectDesc>
      <ProjectLink target="_blank" rel="noreferrer" href={link}>
        View repository>
      </ProjectLink>
    </ProjectBox>
  )
}
