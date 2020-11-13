import React from "react"
import { Link, useStaticQuery } from "gatsby"

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
    <nav
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        margin: "0 -1rem -1rem -1rem",
      }}
    >
      {currentPagePosition > 0 ? (
        <Link to={`/${sequence[currentPagePosition - 1].join("/")}`}>
          &lsaquo;
          {pageDict[sequence[currentPagePosition - 1].join("/")]?.title}
        </Link>
      ) : (
        <i />
      )}
      {currentPagePosition < sequence.length - 1 && (
        <Link to={`/${sequence[currentPagePosition + 1].join("/")}`}>
          {pageDict[sequence[currentPagePosition + 1].join("/")]?.title}
          &rsaquo;
        </Link>
      )}
    </nav>
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
