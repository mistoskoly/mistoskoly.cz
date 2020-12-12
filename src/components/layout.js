import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import TableOfContents from "./sidebar"
import ArticleContents from "./article-contents"
import Header from "./header"
import Navigation from "./navigation"
import styled from "styled-components"
import * as colors from "../styles/colors"

const StyledArticleContents = styled(ArticleContents)`
  @media (max-width: 900px) {
    display: none;
  }
`

const StyledTOC = styled(TableOfContents)`
  @media (max-width: 600px) {
    display: none;
  }
`

const ContentWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  h1 {
    color: ${colors.accent};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    a {
      margin-left: -1rem;
      display: inline-block;
      width: 1rem;
      visibility: hidden;
      svg {
        fill: ${colors.accent};
      }
    }
    &:hover {
      a {
        visibility: visible;
      }
    }
  }
`

const shortcodes = { Link }

export default function PageTemplate({ data: { mdx }, location }) {
  return (
    <div>
      <Header location={location.pathname} />
      <div style={{ display: "flex" }}>
        <StyledTOC location={location.pathname} />
        <ContentWrapper>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <Navigation location={location.pathname} />
        </ContentWrapper>
        <StyledArticleContents toc={mdx.tableOfContents} />
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
      tableOfContents
    }
  }
`
