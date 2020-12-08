import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled, { css } from "styled-components"

const ListTreeHeader = ({ url, children, className }) => (
  <header className={className}>
    <Link to={url}>{children}</Link>
  </header>
)

const StyledListTreeHeader = styled(ListTreeHeader)`
  a {
    text-decoration: none;
    display: block;
    color: #555;
    padding: 0.2rem;
  }
  ${({ depth }) =>
    depth === 0 &&
    css`
      text-transform: uppercase;
      margin-top: 1em;
    `}
  ${({ depth }) =>
    css`
      a {
        padding-left: ${depth * 1.5 + 1}em;
      }
    `}
  ${({ exists }) =>
    !exists &&
    css`
      font-style: italic;
    `}
  ${({ selected }) =>
    selected &&
    css`
      background-color: #fafafa;
      font-weight: bold;
      && a {
        color: #e0bb20;
      }
    `}
  &:hover a {
    color: #e0bb20;
  }
`

const StyledListTree = styled.div`
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin: 0;
    padding: 0;
  }
`

const ListTree = ({ pageDict, url, items, currentUrl, depth = 0 }) => (
  <StyledListTree depth={depth}>
    <StyledListTreeHeader
      exists={!!pageDict[url]}
      selected={url === currentUrl}
      depth={depth}
      url={pageDict[url] ? `/${pageDict[url]?.slug}` : "/" + url}
    >
      {pageDict[url]?.title ?? `(${url})`}
    </StyledListTreeHeader>
    {items?.length && (
      <ul>
        {items.map(({ url: urlFraction, items }) => (
          <li key={url + "/" + urlFraction}>
            <ListTree
              url={url + "/" + urlFraction}
              depth={depth + 1}
              {...{ pageDict, items, currentUrl }}
            />
          </li>
        ))}
      </ul>
    )}
  </StyledListTree>
)

const Sidebar = ({ location }) => {
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

  const pageDict = {}

  data.allMdx.edges.forEach(({ node: { slug, headings } }) => {
    slug = slug
      .split("/")
      .filter(a => a)
      .join("/")
    pageDict[slug] = { slug, title: headings[0]?.value }
  })

  const locationRoot = location.split("/").filter(a => !!a)[0]
  const locationFormatted = location
    .split("/")
    .filter(a => !!a)
    .join("/")

  const sidebarList = data.contentYaml.content.find(
    ({ url }) => url.split("/")[0] === locationRoot
  )

  if (!sidebarList) return null

  return (
    <nav
      style={{
        width: "250px",
      }}
    >
      <ListTree
        items={sidebarList.items}
        pageDict={pageDict}
        currentUrl={locationFormatted}
        url={sidebarList.url}
      />
    </nav>
  )
}

export default Sidebar
