import React, { Component } from 'react'
import { Link } from 'react-router'
import MetaTags from 'react-meta-tags';

import { search } from '~/src/react/api/AppAPI'

export default class Search extends Component {

  state = {
    q: '',
    projects: [],
    products: [],
    magazines: [],
    stores: []
  }

  async componentDidMount() {
    let {
      q
    } = this.props.location.query

    if (!q) return

    try {
      const {
        user,
        projects,
        products,
        magazines,
        stores,
      } = await search(q)
      
      this.props.appUtils.setUser(user)
      this.setState({
        q,
        projects,
        products,
        magazines,
        stores
      })
    } catch (e) {
      // console.error(e);
    }


  }

  render() {
    const {
      q,
      projects,
      products,
      magazines,
      stores
    } = this.state

    // console.log(this.state);

    return (
      <div className="search-container">
        <MetaTags>
		            <title>{q}에 대한 검색결과 - 7Pictures</title>
		    </MetaTags>
        <span className="search-for-keyword">{q}에 대한 검색결과...</span>

        {/* Project 검색 결과 */}
        {/* projects && projects.length == 0 ? null : (
          <div className="search-result-project">
            <div className="search-small-title">공유 프로젝트</div>
        {
          projects && projects.map(({
            imgSrc,
            postIntro,
            longTitle,
            projectName
          }, index) => (
            <div className="Link_sub_div2"><Link to={`/projects/${projectName}`}>
              <div className="search-item-container">
                <div className="search-image-container">
                  <div className="search-image-centered">
                    <img className="search-image" src={imgSrc}/>
                  </div>
                </div>
                <div className="search-summary-container">
                  <h4 className="search-element-title">{longTitle}</h4>
                  <p className="search-element-description">{postIntro}</p>
                </div>
              </div>
            </Link></div>
          ))
        }
        </div> ) */}

        {/* Product 검색 결과 */}
        { products && products.length == 0 ? null : (
        <div className="search-result-product">
          <div className="search-small-title-sub">프로젝트</div>
        {
          products && products.map(({
            imgSrc,
            postIntro,
            longTitle,
            productName
          }, index) => (
            <div className="Link_sub_div2"><Link to={`/products/${productName}`}>
              <div className="search-item-container">
                <div className="search-image-container">
                  <div className="search-image-centered">
                    <img className="search-image" src={imgSrc}/>
                  </div>
                </div>
                <div className="search-summary-container">
                  <h4 className="search-element-title">{longTitle}</h4>
                  <p className="search-element-description">{postIntro}</p>
                </div>
              </div>
            </Link></div>
          ))
        }
        </div> )}
        
        {/* Stores 검색 결과 */}
        { stores && stores.length == 0 ? null : (
        <div className="search-result-product">
          <div className="search-small-title-sub">예술상점</div>
        {
          stores && stores.map(({
            main_img,
            description,
            title,
            storeLink
          }, index) => (
            <div className="Link_sub_div2"><Link to={`/store/${storeLink}`}>
              <div className="search-item-container">
                <div className="search-image-container">
                  <div className="search-image-centered">
                    <img className="search-image" src={main_img}/>
                  </div>
                </div>
                <div className="search-summary-container">
                  <h4 className="search-element-title">{title}</h4>
                  <p className="search-element-description">{description}</p>
                </div>
              </div>
            </Link></div>
          ))
        }
        </div> )}

        {/* Magazine 검색 결과 */}
        { magazines && magazines.length == 0 ? null : (
        <div className="search-result-magazine">
          <div className="search-small-title-sub">매거진</div>
        {
          magazines && magazines.map(({
            imgSrc,
            postIntro,
            description,
            longTitle,
            magazineName
          }, index) => (
            <div className="Link_sub_div2"><Link to={`/magazines/${magazineName}`}>
              <div className="search-item-container">
                <div className="search-image-container">
                  <div className="search-image-centered">
                    <img className="search-image" src={imgSrc}/>
                  </div>
                </div>
                <div className="search-summary-container">
                  <h4 className="search-element-title">{longTitle}</h4>
                  <p className="search-element-description">{description}</p>
                </div>
              </div>
            </Link></div>
          ))
        }
        </div> )}
        
      </div>
    )
  }
}
