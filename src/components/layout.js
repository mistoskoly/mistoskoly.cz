import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Sidebar from "./sidebar"
import Header from "./header"
import Navigation from "./navigation"
import "./layout.css"
import styled from "styled-components"

const ContentWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  h1 {
    color: #e0bb20;
  }
`

const shortcodes = { Link }

export default function PageTemplate({ data: { mdx }, location }) {
  return (
    <div>
      <Header location={location.pathname} />
      <div style={{ display: "flex" }}>
        <Sidebar location={location.pathname} />
        <ContentWrapper>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <Navigation location={location.pathname} />
        </ContentWrapper>
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
