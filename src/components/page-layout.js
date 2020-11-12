import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Sidebar from "./sidebar"

const shortcodes = { Link }

export default function PageTemplate({ data: { mdx } }) {
  return (
    <div>
      <Sidebar location={mdx.slug} />
      <div>Hello there</div>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
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
