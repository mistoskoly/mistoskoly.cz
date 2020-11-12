import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"

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
    <header style={{ backgroundColor: "yellow", padding: "1rem" }}>
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to="/">místoškoly.cz</Link>
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
