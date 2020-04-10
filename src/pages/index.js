import React, { useEffect } from "react"
import styled from "styled-components/macro"
import { Helmet } from "react-helmet"
import LandingImage from "../images/LandingImage.png"
import RainbowScrollbar from "../images/RainbowScrollbar.png"
import ReactJobBoard from "../images/ReactJobBoard.png"
import DataScience from "../images/DataScience.jpg"
import InstaBot from "../images/InstaBot.png"
import ReactPokedex from "../images/ReactPokedex.png"
import CpuActivity from "../images/CpuActivity.png"
import Layout from "../components/Layout"
import Header from "../components/Header"
import "../index.css"
import HeaderText from "../components/HeaderText"
import LogoImage from "../components/LogoImage"
import HeaderImage from "../components/Headerimage"
import Heading from "../components/Heading"
import Socials from "../components/Socials"
import Paragraph from "../components/Paragraph"
import Project from "../components/Project"
import { breakpoints } from "../components/Media"
import Footer from "../components/Footer"
import Resume from "../assets/Resume.pdf"

const SVGContainer = styled.div`
  bottom: 0;
  position: absolute;
  margin: 0;
  display: block;
  width: 100%;
  height: auto;
  padding: 0;
`
const ResumeBtn = styled.button`
  width: 200px;
  height: 70px;
  border-radius: 50px;
  color: white;
  font-size: 24px;
  font-weight: 600;
  background-image: linear-gradient(
    to right,
    #6253e1,
    #852d91,
    #a3a1ff,
    #f24645
  );
  box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
  background-size: 300% 100%;

  transition: all 0.4s ease-in-out;
  :hover {
    background-position: 100% 0;

    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
`

const Container = styled.div`
  display: block;
  width: 90%;
  margin: 30px;
  padding-bottom: 170px;
`

const SubContainer = styled.div`
  margin: 0px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media (min-width: ${breakpoints.mobileMax}) {
    flex-wrap: nowrap;
  }
`

const SkillTable = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (min-width: ${breakpoints.mobileMax}) {
    flex-wrap: nowrap;
  }

  p {
    color: black;
    font-weight: 700;
    min-width: 200px;
    margin: 20px 0 0 0;

    @media (min-width: ${breakpoints.mobileMax}) {
      min-width: unset;
      margin: 30px 0;
    }

    span {
      font-size: 20px;
      margin-right: 5px;
      color: #b4e1e7;
    }
  }
`

export default function IndexPage() {
  useEffect(() => {
    console.log(`
# #  #       #  #                #  
# #         ### ### ### ### ###  #  
###  #       #  # # ##  #   ##   #  
# #  ##      ## # # ### #   ###     
# #                              #  
    
    `)
    console.log("This website was designed and built by Saswata Mukherjee.")
  })
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
          <meta property="og:url" content="https://saswatamcode.tech/" />
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
          <meta property="twitter:url" content="https://saswatamcode.tech/" />
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
          <LogoImage color="white" />
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
                fillOpacity="1"
                d="M0,256L40,245.3C80,235,160,213,240,192C320,171,400,149,480,122.7C560,96,640,64,720,69.3C800,75,880,117,960,165.3C1040,213,1120,267,1200,245.3C1280,224,1360,128,1400,80L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              ></path>
            </svg>
          </SVGContainer>
        </Header>
        <br />
        <br />
        <br />

        <Container>
          <Heading>About Me</Heading>
          <Paragraph>
            I'm a 19 year old student at Kalinga Institute of Industrial
            Technology currently studying Computer Science and Engineering.
            <br />
            <br />
            As I've learnt how to code, I've found that I love building new
            applications for the web. And as I'm also a web developer for the{" "}
            <a
              title="DSCKIIT"
              target="_blank"
              rel="noopener noreferrer"
              href="https://dsckiit.github.io/"
            >
              Developer Student Clubs, KIIT{" "}
            </a>
            and
            <a
              title="Mozilla BBSR"
              target="_blank"
              rel="noopener noreferrer"
              href="https://mozillabbsr.me/"
            >
              {" "}
              Mozilla Club BBSR
            </a>
            , it has raised my standards of what is expected from a web app. I'm
            also interested in learning new technologies that allow me to craft
            new experiences.
          </Paragraph>
          <a href={Resume} rel="noopener noreferrer" target="_blank">
            <ResumeBtn>
              <i
                class="fa fa-download"
                style={{ color: "white", transform: "scale(1)" }}
              ></i>{" "}
              Get Resume
            </ResumeBtn>
          </a>
        </Container>

        <Container>
          <Heading>My Skills</Heading>
          <Paragraph>
            As a full-stack web developer I take special interest in various JS
            frameworks. Apart from my college curriculum, I've taken a number of
            online courses which have helped me advance my skills such as{" "}
            <a
              title="The Complete 2020 Web Development Bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.udemy.com/course/the-complete-web-development-bootcamp/"
            >
              The Complete 2020 Web Development Bootcamp
            </a>
            ,{" "}
            <a
              title="Complete Python3 Bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.udemy.com/course/complete-python-bootcamp/"
            >
              Complete Python3 Bootcamp
            </a>
            ,{" "}
            <a
              title="React: The Complete Guide"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.udemy.com/react-the-complete-guide-incl-redux/"
            >
              React: the Complete Guide
            </a>
            , and I'm currently taking{" "}
            <a
              title="Flutter Bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.udemy.com/course/flutter-bootcamp-with-dart/"
            >
              Flutter Bootcamp with Dart
            </a>{" "}
            and{" "}
            <a
              title="iOS 13 App Development"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.udemy.com/course/ios-13-app-development-bootcamp/"
            >
              iOS 13 App Development Bootcamp
            </a>
          </Paragraph>
          <SkillTable>
            <row>
              <Paragraph>
                <span>&#9675;</span> HTML5/CSS3
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Styled-Components
              </Paragraph>
            </row>
            <row>
              <Paragraph>
                <span>&#9675;</span> Javascript ES6
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Python3
              </Paragraph>
            </row>
            <row>
              <Paragraph>
                <span>&#9675;</span> Node.js
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> Flask
              </Paragraph>
            </row>
            <row>
              <Paragraph>
                <span>&#9675;</span> React
              </Paragraph>
              <Paragraph>
                <span>&#9675;</span> NoSQL/SQL
              </Paragraph>
            </row>
          </SkillTable>
        </Container>
        <Container>
          <Heading>What I've Been Working On</Heading>
          <Paragraph>
            I like to learn new things by doing projects using them. I also love
            writing technical articles about topics I'm passionate about on{" "}
            <a
              title="Medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@saswatamcode"
            >
              Medium
            </a>
            . Take a look at the stuff I've worked on.
          </Paragraph>
          <SubContainer>
            <Project
              image={RainbowScrollbar}
              name="React Rainbow ScrollBar"
              desc="A simple npm package to get an animated rainbow scrollbar for your React app."
              link="https://github.com/saswatamcode/react-rainbow-scrollbar"
            ></Project>
            <Project
              image={ReactJobBoard}
              name="React Job Board"
              desc="A web application which lists various jobs using the Github Jobs API. Built using React, Node.js, Express and Redis."
              link="https://github.com/saswatamcode/react_job_board"
            ></Project>
            <Project
              image={DataScience}
              name="Data Science API"
              desc="This is a RESTful API built using Flask and Scikit-Learn. It provides a host of Classification and Regression algorithms."
              link="https://github.com/saswatamcode/DataScienceAPI"
            ></Project>
          </SubContainer>
          <SubContainer>
            <Project
              image={ReactPokedex}
              name="React Pokédex"
              desc="A web application which lists pokémon data from PokeAPI.co. Made using React and material-ui."
              link="https://github.com/saswatamcode/ReactPokedex"
            ></Project>
            <Project
              image={InstaBot}
              name="InstaBOT"
              desc="A simple Instagram bot which gives you the list of people you follow and aren't followed by. Made using Selenium."
              link="https://github.com/saswatamcode/InstaBOT"
            ></Project>
            <Project
              image={CpuActivity}
              name="CPU Activity Monitor"
              desc="A simple cross-platform desktop app made using Electron the shows a chart about your CPU activity."
              link="https://github.com/saswatamcode/CPU-activity-monitor"
            ></Project>
          </SubContainer>
        </Container>
        <Footer />
      </Layout>
    </>
  )
}
