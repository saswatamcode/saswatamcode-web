import React from "react"
import styled from "styled-components/macro"

const LogoImg = styled.div`
    font-size: 24px;
    padding-top: 20px;
    padding-left: 5%;
    font-weight: 600;
`;

export default function LogoImage({color}) {
    return(
        <LogoImg style={{color: color}}>SM.</LogoImg>
    );
}