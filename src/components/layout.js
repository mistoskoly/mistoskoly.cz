import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Sidebar from "./sidebar"
import Header from "./header"
import "./layout.css"

const shortcodes = { Link }

export default function PageTemplate({ data: { mdx } }) {
  return (
    <div>
      <Header location={mdx.slug} />
      <div style={{ display: "flex" }}>
        <Sidebar location={mdx.slug} />
        <div style={{ flex: 1, backgroundColor: "pink" }}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </div>
  )
}
/*
.container {
  display: -webkit-flex;
  display: flex;
}
nav {
  width: 200px;
}
.flex-column {
  -webkit-flex: 1;
          flex: 1;
}
*/

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
