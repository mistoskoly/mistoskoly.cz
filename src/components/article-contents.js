import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import * as colors from "../styles/colors"

const getLinkSize = (depth, h1 = 1, h6 = 0.5) => {
  const a = (6 * (h1 - h6)) / 5
  const b = (6 * h6 - h1) / 5
  return a / (depth + 1) + b
}

/*
const getLinkSize = (depth, h1=1, h6=0.5) => {
  const a = (h6 - h1) / 5
  const b = (6 * h1 - h6) / 5
  return a * depth + b;
}
*/

const NestedLink = styled(Link)`
  color: #555;
  display: block;
  padding-left: ${({ depth }) => depth / 2}rem;
  padding-right: 0.5rem;
  color: #555;
  font-size: ${({ depth }) => getLinkSize(depth, 2, 0.8)}em;
  margin: 0.5em 0;
`

const ArticleNavigation = styled.nav`
  margin: 1em 0;
  width: 200px;
  line-height: 1.05em;

  .close-nav,
  .open-nav {
    position: absolute;
    right: 0;
  }

  &.navigation-fixed {
    position: fixed;
  }

  ${NestedLink} {
    color: #555;
    text-decoration: none;
    &:hover {
      color: ${colors.accent};
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
    }
  }

  & > ul {
    border-left: 2px solid lightgrey;
    padding: 0.1px;
  }
`

const ContentsItem = ({ children, url, depth }) => (
  <NestedLink to={url} depth={depth}>
    {children}
  </NestedLink>
)

const NestedList = ({ url, title, items, depth = 0 }) => (
  <>
    {url && title && (
      <ContentsItem url={url} depth={depth}>
        {title}
      </ContentsItem>
    )}
    <ul>
      {items?.map(item => (
        <li key={item.url}>
          <NestedList {...item} depth={depth + 1} />
        </li>
      ))}
    </ul>
  </>
)

const ArticleContents = ({ toc, ...rest }) => (
  <ArticleNavigation {...rest}>
    <NestedList {...toc} />
  </ArticleNavigation>
)
export default ArticleContents
