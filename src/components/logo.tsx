import React from "react"
import styled from "styled-components"
import logo from "../images/logo.svg"

const LogoContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  img {
    height: 2rem;
    width: 2rem;
    margin-right: 0.5rem;
  }
`
const Logo = () => (
  <LogoContainer>
    <img src={logo} alt="logo" /> místoškoly.cz
  </LogoContainer>
)

export default Logo
