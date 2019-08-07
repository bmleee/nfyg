import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AuthorizedStores extends Component {
  render() {
    const {
      authorizedStores
    } = this.props

    return (
      <div>
      <div className="my-store">나의 상점</div>
      <div className="authorized-store-container">
        {
          !!authorizedStores
            ? authorizedStores.map(({
              category,
              main_img,
              title,
              storeLink,
              state,
            }, index) => (
              <div className="purchase-list-item" key={index}>
                <div className="purchase-list-item-margin">
                  <Link to={`/store/${storeLink}`}>
                  <div className="pr-thumbnail">
  								  <div className="ex-centered">  
                      <img className="home-exhibition-image" src={main_img} alt=""/>
                    </div>
                  </div>
                  </Link>
                  <div className="present-project-list-item-caption">
                    <div className="present-project-list-item-caption-top">
                      <Link to={`/store/${storeLink}`}>
                        <h4 className="present-project-list-item-title">{title}</h4>
                      </Link>
                    </div>
                    <div className="present-project-list-item-caption-bottom">
                      <Link to={`/store/${storeLink}/summary`}>
                        <button className="purchase-cancel-button">판매내역</button>
                      </Link>
                      <a href={`https://netflix-salon.co.kr/store/${storeLink}/edit/abstract`}>
                        <button className="purchase-cancel-button2">수정하기</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : ''
        }
      </div>
      </div>
    )
  }
}
