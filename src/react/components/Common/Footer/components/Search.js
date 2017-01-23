import React, { Component } from 'react'
import { Link } from 'react-router'

import { search } from '~/src/react/api/AppAPI'

export default class Search extends Component {

  state = {
    q: '',
    projects: [],
    products: [],
    magazines: [],
  }

  async componentDidMount() {
    let {
      q
    } = this.props.location.query

    if (!q) return

    try {
      const {
        projects,
        products,
        magazines,
      } = await search(q)

      this.setState({
        q,
        projects,
        products,
        magazines
      })
    } catch (e) {
      console.error(e);
    }


  }

  render() {
    const {
      q,
      projects,
      products,
      magazines
    } = this.state

    console.log(this.state);

    return (
      <div className="search-container">
        <span className="search-for-keyword">{q}에 대한 검색결과...</span>

        {/* Project 검색 결과 */}
        {
          projects && projects.map(({
            imgSrc,
            postIntro,
            longTitle,
            projectName
          }, index) => (
            <Link to={`/projects/${projectName}`}>
              <div className="search-item-container">
                <div className="search-image-container">
                  <div className="search-image-centered">
                    <img className="search-image" src={imgSrc}/>
                  </div>
                </div>
                <div className="search-summary-container">
                  <h4 className="search-element-category">PROJECT</h4>
                  <h4 className="search-element-title">{longTitle}</h4>
                  <p className="search-element-description">{postIntro}</p>
                </div>
              </div>
            </Link>
          ))
        }

        {/* Product 검색 결과 */}
        {
          products && products.map(({
            imgSrc,
            postIntro,
            longTitle,
            productName
          }, index) => (
            <Link to={`/products/${productName}`}>
              <div className="search-item-container">
                <div className="search-image-container">
                  <div className="search-image-centered">
                    <img className="search-image" src={imgSrc}/>
                  </div>
                </div>
                <div className="search-summary-container">
                  <h4 className="search-element-category">Product</h4>
                  <h4 className="search-element-title">{longTitle}</h4>
                  <p className="search-element-description">{postIntro}</p>
                </div>
              </div>
            </Link>
          ))
        }

        {/* Magazine 검색 결과 */}
        {
          magazines && magazines.map(({
            imgSrc,
            postIntro,
            longTitle,
            magazineName
          }, index) => (
            <Link to={`/magazines/${magazineName}`}>
              <div className="search-item-container">
                <div className="search-image-container">
                  <div className="search-image-centered">
                    <img className="search-image" src={imgSrc}/>
                  </div>
                </div>
                <div className="search-summary-container">
                  <h4 className="search-element-category">Magazine</h4>
                  <h4 className="search-element-title">{longTitle}</h4>
                  <p className="search-element-description">{postIntro}</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    )
  }
}
