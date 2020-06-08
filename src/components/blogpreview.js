import React, { useState } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { PageProps, Link, graphql } from "gatsby"
import Img from 'gatsby-image';

const BlogPreview = (props) => {
    const [hovered, setHovered] = useState(false);
    const [coords, setCoords] = useState({x: -1, y: -1})
    return (
        <Link style={{ boxShadow: `none`, color: 'rgba(0,0,0,0.8)' }} to={props.url} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onMouseMove={(e) => {
            setCoords({x: e.pageX, y: e.pageY})
        }}>
            {props.children}
            { hovered ? <Img fluid={props.preview} style={{ position: 'absolute', width: '200px', left: coords.x + 'px', top: coords.y + 'px', opacity: '0.7' }} /> : null}
        </Link>
    );
};

export default BlogPreview;