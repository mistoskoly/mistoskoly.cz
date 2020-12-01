import React from "react"
import { Link, useStaticQuery } from "gatsby"
import { css } from "styled-components"
import styled from "styled-components"

/**
 * A bottom navigation on page
 * has Back and Next buttons
 */

const NeighbourNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 0 -1rem -1rem -1rem;
`

const StyledLink = styled(Link)`
  border: 2px solid #e0bb20;
  padding: 0.5em;
  border-radius: 0.5em;
  text-decoration: none;
  color: black;
  align-items: center;

  &:hover {
    background-color: #e0bb20;
  }
  display: flex;

  ${({ back }) =>
    !back &&
    css`
      & > span {
        text-align: right;
      }
    `}

  // add arrow to the button
  &:before,
  &:after {
    // line-height: 0;
  }
  ${({ back }) =>
    back
      ? css`
          &:before {
            content: "\\2190";
          }
        `
      : css`
          &:after {
            content: "\\2192";
          }
        `}

  // style a direction text
  &  .page-nav-direction-text {
    font-size: 0.7em;
    color: gray;
  }
`

const PageNavigationLink = ({ back = false, to, children }) => (
  <StyledLink to={to} back={back}>
    <span>
      <span class="page-nav-direction-text">{back ? "Zpět" : "Dál"}</span>
      <br />
      {children}
    </span>
  </StyledLink>
)

export default function Navigation({ location }) {
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
          items {
            url
            items {
              url
            }
          }
          url
        }
      }
    }
  `)

  // get traversal of the page tree (in content.yml)
  const sequence = traversal({ items: data.contentYaml.content, url: "" })
  const locationPath = location.split("/").filter(a => !!a)
  const currentPagePosition = sequence.findIndex(
    path => path.join() === locationPath.join()
  )

  if (currentPagePosition < 0) return null

  const pageDict = {}
  data.allMdx.edges.forEach(({ node: { slug, headings } }) => {
    slug = slug
      .split("/")
      .filter(a => a)
      .join("/")
    pageDict[slug] = { slug, title: headings[0]?.value }
  })

  return (
    <NeighbourNav>
      {currentPagePosition > 0 ? (
        <PageNavigationLink
          to={`/${sequence[currentPagePosition - 1].join("/")}`}
          back
        >
          {pageDict[sequence[currentPagePosition - 1].join("/")]?.title}
        </PageNavigationLink>
      ) : (
        <i />
      )}
      {currentPagePosition < sequence.length - 1 && (
        <PageNavigationLink
          to={`/${sequence[currentPagePosition + 1].join("/")}`}
        >
          {pageDict[sequence[currentPagePosition + 1].join("/")]?.title}
        </PageNavigationLink>
      )}
    </NeighbourNav>
  )
}

function traverse(tree, way, store) {
  store.push([...way, tree.url])
  for (const subtree of tree?.items ?? []) {
    traverse(subtree, [...way, tree.url], store)
  }
}

function traversal(tree) {
  const way = []
  let store = []
  traverse(tree, way, store)
  store = store.map(item => item.filter(a => !!a)).filter(item => item.length)
  return store
}
