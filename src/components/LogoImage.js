import React from "react"
import styled from "styled-components/macro"

const LogoImg = styled.div`
    font-size: 24px;
    padding-top: 20px;
    padding-left: 5%;
    font-weight: 600;
    color: white;
`;

export default function LogoImage() {
    return(
        <LogoImg>SM.</LogoImg>
    );
}