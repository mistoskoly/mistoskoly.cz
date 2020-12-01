import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import logo from "../images/logo.svg"
import styled from "styled-components"

const HomeLink = styled(Link)`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  .header-logo {
    height: 2rem;
    width: 2rem;
    margin-right: 0.5rem;
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
  background-color: #e0bb20;
  &,
  & a {
    color: black;
  }
  a {
    text-decoration: none;
    &:hover {
      font-weight: bold;
    }
  }

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
    <header style={{ display: "flex" }}>
      <HomeNav>
        <HomeLink to="/">
          <img src={logo} alt="logo" className="header-logo" /> místoškoly.cz
        </HomeLink>
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
    </header>
  )
}

export default Header
