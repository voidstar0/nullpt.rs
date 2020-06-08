import React from 'react'
import Layout from '../components/layout'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Image from "gatsby-image"

export default ({ location }) => {
    const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

    const { author, social } = data.site.siteMetadata

    return (
        <Layout location={location} title='nullpt.rs' >
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingBottom: '18px'
                }}>
                    {/* Put this in Gatsby config and traverse through it to clean this up */}
                    <a href='https://twitter.com/blastbots' style={{
                        marginRight: '10px'
                    }}>Twitter</a>
                    <a href='https://linkedin.com/in/fredir' style={{
                        marginRight: '10px'
                    }}>Linkedin</a>
                    <a href='https://github.com/char' style={{
                        marginRight: '10px'
                    }}>GitHub</a>
                    <a href='https://keybase.io/webm' style={{
                        marginRight: '10px'
                    }}>Keybase</a>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <Image
                    fixed={data.avatar.childImageSharp.fixed}
                    alt={author.name}
                    style={{
                        minWidth: 200,
                        minHeight: 200,
                        marginRight: '15px'
                    }}
                />
                <span>
                    Heyo! I'm Fredi Ramirez. I am a software engineer from the Bronx that happens to enjoy breaking software just as much as I love building it.
                    I've programmed since a young age to try and get advantages in games over my friends. From there, I attended the  
                     <a href='https://www.bronxsoftware.org/'> Bronx Academy for Software Engineering</a> where I attended numerous <a href='https://www.forbes.com/sites/levelup/2016/12/22/nyc-high-schoolers-take-on-life-hacks/#62419dc1a5c4'>hackathons</a> with a bunch of my friends.
                </span>
                </div>
            </div>
        </Layout>
    )
}