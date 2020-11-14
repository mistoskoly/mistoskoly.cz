import React from "react"
import callitschoolVideo from "../images/callitschool.mp4"
import callitschoolThumbnail from "../images/callitschool.png"
import { Link } from "gatsby"
import styled from "styled-components"

const Title = styled.header`
  position: relative;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
  line-height: 1;
  text-transform: uppercase;
`

const StartButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  z-index: 10;
`

const StartButton = styled(Link)`
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  &:hover {
    color: black;
    background-color: white;
  }
  font-size: 6rem;
  text-decoration: none;
  line-height: 0;

  height: 3rem;
  display: flex;
  align-items: center;
  padding-bottom: 2.2rem;
  border-radius: 1rem;
`

const BackgroundVideo = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  background-image: url("${callitschoolThumbnail}");
  background-size: cover;
  background-position: center;
`

const Content = styled.main`
  background-color: white;
  color: black;
  position: relative;
  min-height: 100vh;
`
const ContentList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  margin: -1rem 0;
  flex-wrap: wrap;
`
const ContentItem = styled.li`
  width: 20vw;
  height: 20vw;
  position: relative;
  margin: 1rem 0;
  line-height: 1.2;
  @media (max-width: 900px) {
    width: 40vw;
    height: 40vw;
  }

  @media (max-width: 600px) {
    width: 60vw;
    height: 60vw;
  }
`

const ContentLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  background-color: darkgrey;
  color: white;
  font-size: 2rem;
`

const ContentIntro = styled.div`
  padding: 2rem;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`

const Index = () => {
  return (
    <>
      <BackgroundVideo
        playsInline
        autoPlay
        muted
        loop
        poster={callitschoolThumbnail}
      >
        <source src={callitschoolVideo} type="video/mp4" />
      </BackgroundVideo>
      <Title>Můžeš odejít ze školy!</Title>
      <StartButtonContainer>
        <StartButton to="#uvod-obsah">&#x2304;</StartButton>
      </StartButtonContainer>

      <Content id="uvod-obsah">
        <ContentIntro>tady se dozvíš</ContentIntro>
        <ContentList>
          <ContentItem>
            <ContentLink to="/proc">proč odejít ze školy</ContentLink>
          </ContentItem>
          <ContentItem>
            <ContentLink to="/jak">jak odejít ze školy</ContentLink>
          </ContentItem>
          <ContentItem>
            <ContentLink to="/venku">co dělat až budeš venku</ContentLink>
          </ContentItem>
          <ContentItem>
            <ContentLink to="/spolecne">jak na to společně</ContentLink>
          </ContentItem>
        </ContentList>
      </Content>
    </>
  )
}

export default Index
