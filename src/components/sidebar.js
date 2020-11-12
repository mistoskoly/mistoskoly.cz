import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const ItemSublist = ({ pageDict, url, items, topUrls=[] }) => {
  console.log(pageDict, url, items);
  const slug = [...topUrls, url].join('/')
  return (
  <li>
    {pageDict[slug] ? <Link to={`/${pageDict[slug].slug}`}>{pageDict[slug].title ?? `no title (${slug})`}</Link> : `page ${slug} doesn't exist`}
    {items?.length && (
      <ul>
        {items.map(({ url: subUrl, items }) => (
          <ItemSublist {...{pageDict, url: subUrl, items, topUrls: [...topUrls, url] }} />
        ))}
      </ul>
    )}
  </li>
  );
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
    }`)

  const pageDict = {};

  data.allMdx.edges.forEach(({ node: { slug, headings } }) => {
    slug = slug.split('/').filter(a => a).join('/');
    pageDict[slug] = {slug, title: headings[0]?.value}
  });

  console.log(pageDict);

  return (
    <div>
      <i>{location}</i>
      <ul>
        {data.contentYaml.content.map(({ url, items }) => <ItemSublist{...{pageDict, url, items}} />)}
      </ul>
    </div>
  );
}

export default Sidebar;
