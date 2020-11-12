import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const ItemSublist = ({ pageDict, url, items, currentUrl }) => {
  return (
    <li>
      {pageDict[url] ? (
        url === currentUrl ? (
          pageDict[url].title ?? `no title (${url})`
        ) : (
          <Link to={`/${pageDict[url].slug}`}>
            {pageDict[url].title ?? `no title (${url})`}
          </Link>
        )
      ) : (
        <i>{url}</i>
      )}
      {items?.length && (
        <ul>
          {items.map(({ url: urlFraction, items }) => (
            <ItemSublist
              key={url + "/" + urlFraction}
              {...{ pageDict, url: `${url}/${urlFraction}`, items, currentUrl }}
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

  const sidebarTitle = pageDict[sidebarList.url].title

  return (
    <nav style={{ minWidth: "250px", backgroundColor: "floralwhite" }}>
      <header style={{ textTransform: "uppercase" }}>
        {locationFormatted === locationRoot ? (
          sidebarTitle
        ) : (
          <Link to={"/" + locationRoot}>{sidebarTitle}</Link>
        )}
      </header>
      {sidebarList.items && (
        <ul>
          {sidebarList.items.map(({ url, items }) => (
            <ItemSublist
              {...{
                pageDict,
                url: sidebarList.url + "/" + url,
                items,
                currentUrl: locationFormatted,
              }}
              key={url}
            />
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Sidebar
