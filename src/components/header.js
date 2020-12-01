import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Logo from './logo';

const HeaderContainer = styled.header`
  display: flex;
  background-color: #e0bb20;
  & a {
    color: black;
  }
  a {
    text-decoration: none;
    &:hover {
      font-weight: bold;
    }
  }
`


const HomeNav = styled.nav`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 1rem;
`

const ContentNav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: space-around;

  .selected {
    font-weight: bold;
  }

  align-items: center;
  padding: 1rem;
`

const Header = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            slug
            headings(depth: h1) {
              value
            }
          }
        }
      }
      contentYaml {
        content {
          url
        }
      }
    }
  `)

  const locationRoot = location.split("/").filter(a => !!a)[0]

  if (!locationRoot) return null

  const pageDict = {}

  data.allMdx.edges.forEach(({ node: { slug, headings } }) => {
    slug = slug
      .split("/")
      .filter(a => a)
      .join("/")
    pageDict[slug] = { slug, title: headings[0]?.value }
  })

  const headerItems = data.contentYaml.content.map(({ url }) => ({
    url,
    title: pageDict[url].title,
  }))

  return (
    <HeaderContainer>
      <HomeNav>
        <Link to="/#uvod-obsah">
          <Logo />
        </Link>
      </HomeNav>
      <ContentNav>
        {headerItems.map(({ url, title }) =>
          url === locationRoot ? (
            <span className="selected" key={url}>
              {title}
            </span>
          ) : (
            <Link to={`/${url}`} key={url}>
              {title}
            </Link>
          )
        )}
      </ContentNav>
    </HeaderContainer>
  )
}

export default Header
