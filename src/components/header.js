import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import logo from "../images/logo.png"

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
      <nav
        style={{
          width: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          padding: "0 1rem",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ height: "2rem", width: "2rem", marginRight: "0.5rem" }}
          />{" "}
          místoškoly.cz
        </Link>
      </nav>
      <nav
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "yellow",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {headerItems.map(({ url, title }) =>
          url === locationRoot ? (
            <span key={url}>{title}</span>
          ) : (
            <Link to={`/${url}`} key={url}>
              {title}
            </Link>
          )
        )}
      </nav>
    </header>
  )
}

export default Header
