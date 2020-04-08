import styled from "styled-components/macro";

const Paragraph = styled.p`
width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 184.69%;
  letter-spacing: 0.03em;

  a {
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    color: black;
    text-decoration: none;
    font-weight: bold;
    
    :hover {
      border-bottom: 2px solid black;
    }
  }
`;

export default Paragraph;
