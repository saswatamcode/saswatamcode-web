import React from "react"
import styled from "styled-components/macro"
import { breakpoints } from "./Media"

const ProjectBox = styled.div`
    border: 1px solid blue;
    width: 400px;
    margin: 50px;
    text-align: left;
    transition: 0.3s;
    :hover {
        transform: scale(1.05);
    }
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 300px;
    border-radius: 4px;
    transition-duration: 0.3s;

`;

const ProjectName = styled.h2`
font-style: normal;
  font-weight: 900;
  font-size: 28px;
  line-height: 129.69%;
  letter-spacing: 0.03em;

  @media (min-width: ${breakpoints.mobileMax}) {
    font-size: 36px;
    transform: scale(1);
  }

  > span {
    color: #b4e0e8;
  }
`;

const ProjectDesc = styled.p`
    width: 100%;
    text-align: left;
`;

export default function Project({image, name, desc}) {
    return(
        <ProjectBox>
            <ProjectImage src={image}/>

            <ProjectName>
                {name}
            </ProjectName>
            <ProjectDesc>
                {desc}
            </ProjectDesc>
        </ProjectBox>
    );
}