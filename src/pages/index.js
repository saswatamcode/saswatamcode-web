import React from "react"
import { Link } from "gatsby"
import styled, { keyframes } from "styled-components/macro"
import { Helmet } from "react-helmet"
import LandingImage from "../images/LandingImage.png"
import Layout from "../components/Layout"
import Header from "../components/Header"
import "../index.css"
import HeaderText from "../components/HeaderText"
import LogoImage from "../components/LogoImage"
import HeaderImage from "../components/Headerimage"
import Heading from "../components/Heading"
import Socials from "../components/Socials"
import Paragraph from "../components/Paragraph"
import { breakpoints } from "../components/Media"

const SVGContainer = styled.div`
  bottom: 0;
  position: absolute;
  margin: 0;
  display: block;
  width: 100%;
  height: auto;
  padding: 0;
`;
const Container = styled.div` 
  border: 1px solid red;
  width: 100%;
  margin: 30px;
`;

export default function IndexPage() {
  return (
    <>
      <Layout>
        <Helmet>
          <title>Saswata Mukherjee - Web Developer - saswatamcode</title>
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossorigin="anonymous"
          />

          <meta
            name="title"
            content="Saswata Mukherjee - Web Developer - saswatamcode"
          />
          <meta
            name="description"
            content="Technology has always piqued my interest. Ever since I started learning how to code, I've loved the idea of building something new that people can experience all around the web."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://saswatamcode.github.io/" />
          <meta
            property="og:title"
            content="Saswata Mukherjee - Web Developer - saswatamcode"
          />
          <meta
            property="og:description"
            content="Technology has always piqued my interest. Ever since I started learning how to code, I've loved the idea of building something new that people can experience all around the web."
          />
          <meta property="og:image" content={LandingImage} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://saswatamcode.github.io/"
          />
          <meta
            property="twitter:title"
            content="Saswata Mukherjee - Web Developer - saswatamcode"
          />
          <meta
            property="twitter:description"
            content="Technology has always piqued my interest. Ever since I started learning how to code, I've loved the idea of building something new that people can experience all around the web."
          />
          <meta property="twitter:image" content={LandingImage} />
          <html lang="en" />
        </Helmet>

        <Header>
          <LogoImage />
          <HeaderImage />
          <Socials />
          <HeaderText />
          <SVGContainer>
            <svg
              style={{ display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#fff"
                fill-opacity="1"
                d="M0,256L40,245.3C80,235,160,213,240,192C320,171,400,149,480,122.7C560,96,640,64,720,69.3C800,75,880,117,960,165.3C1040,213,1120,267,1200,245.3C1280,224,1360,128,1400,80L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              ></path>
            </svg>
          </SVGContainer>
        </Header>
        
      </Layout>
    </>
  )
}
