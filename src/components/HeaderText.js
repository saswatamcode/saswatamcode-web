import React from "react"
import Typing from "react-typing-animation"
import styled from "styled-components/macro"

const Text = styled.div`
  color: white;
  font-weight: 900;
  font-size: 55px;
  margin-top: 20px;
  margin-left: 5%;
`

function HeaderText() {
  return (
    <>
      <Typing cursor="|">
        <br />
        <Text>Hey there,</Text>
        <Text>I'm Saswata! </Text>
        <Text>A web developer.</Text>
      </Typing>
    </>
  )
}
export default HeaderText
