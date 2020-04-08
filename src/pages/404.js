import React from "react"
import Oops from "../images/404.svg"
import styled from "styled-components/macro"
import Heading from "../components/Heading"
import { Link } from "gatsby"

const OopsImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  width: 50%;
`

const NotFoundPage = () => (
  <>
    <OopsImg src={Oops} />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Heading>
      Whoops! I don't know how you made it here, but I haven't built anything at
      that url. Go back to <Link>known</Link> territory?
    </Heading>
  </>
)

export default NotFoundPage
