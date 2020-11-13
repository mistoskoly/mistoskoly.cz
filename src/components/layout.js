import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Sidebar from "./sidebar"
import Header from "./header"
import Navigation from "./navigation"
import "./layout.css"

const shortcodes = { Link }

export default function PageTemplate({ data: { mdx }, location }) {
  return (
    <div>
      <Header location={location.pathname} />
      <div style={{ display: "flex" }}>
        <Sidebar location={location.pathname} />
        <div style={{ flex: 1, backgroundColor: "pink", padding: "1rem" }}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <Navigation location={location.pathname} />
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      slug
      frontmatter {
        title
      }
    }
  }
`
