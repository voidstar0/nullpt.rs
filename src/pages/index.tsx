// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from 'gatsby-image';
import BlogPreview from "../components/blogpreview"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          featuredImage: {
            childImageSharp: {

            }
          }
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <BlogPreview url={node.fields.slug} preview={node.frontmatter.featuredImage.childImageSharp.fluid}>
          <article key={node.fields.slug} style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '0.5em',
            paddingTop: '0.5em',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            fontFamily: `Libre Franklin, sans-serif`
          }}>
              <span>
                <Link style={{ boxShadow: `none`, color: 'rgba(0,0,0,0.8)' }} to={node.fields.slug}>
                  {title}
                </Link>
              </span>
              <Img fluid={node.frontmatter.featuredImage.childImageSharp.fluid} />
              <small style={{
                color: 'rgba(0,0,0,0.5)'
              }}>{node.frontmatter.date}</small>
          </article>
          </BlogPreview>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 630) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
