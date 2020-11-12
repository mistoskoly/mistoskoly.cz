import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const ItemSublist = ({ pageDict, url, items }) => {
  return (
    <li>
      {pageDict[url] ? (
        <Link to={`/${pageDict[url].slug}`}>
          {pageDict[url].title ?? `no title (${url})`}
        </Link>
      ) : (
        `page ${url} doesn't exist`
      )}
      {items?.length && (
        <ul>
          {items.map(({ url: urlFraction, items }) => (
            <ItemSublist
              key={url + "/" + urlFraction}
              {...{ pageDict, url: `${url}/${urlFraction}`, items }}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

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
            items {
              url
            }
            url
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

  const sidebarList = data.contentYaml.content.find(
    ({ url }) => url.split("/")[0] === locationRoot
  )

  if (!sidebarList) return null

  const sidebarTitle = pageDict[sidebarList.url].title

  return (
    <nav style={{ minWidth: "250px", backgroundColor: "floralwhite" }}>
      <header style={{ textTransform: "uppercase" }}>
        <Link to={"/" + locationRoot}>{sidebarTitle}</Link>
      </header>
      <ul>
        {sidebarList.items.map(({ url, items }) => (
          <ItemSublist
            {...{ pageDict, url: sidebarList.url + "/" + url, items }}
            key={url}
          />
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
