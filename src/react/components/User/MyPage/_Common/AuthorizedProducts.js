import React, { Component } from 'react'
import { Link } from 'react-router'

import Progress from 'react-progressbar';

export default class AuthorizedProducts extends Component {
  render() {
    const {
      authorizedProducts, // raw project model
      other
    } = this.props
    
    const today = new Date();
    
    return (
      <div>
      { !other 
      ? <h4 className="purcahse-list-title">나의 프로젝트</h4>
      : <h4 className="purcahse-list-title">개설 프로젝트</h4>
      }
      <div className="authorized-project-container">
        {
          !!authorizedProducts
            ? authorizedProducts.map(({
              category,
              created_at,
              dateFrom,
              dateTo,
              remainingDays = ((new Date(dateTo).getTime() + 86400000) - today.getTime() ) / 1000 / 60 / 60 / 24,
              imgSrc,
              shortTitle,
              productName,
              state,
              numValidPurchases_sub,
              currentMoney_sub,
              currentMoney_sub2,
              targetMoney,
              postIntro
            }, index) => (
              !other ?
                <div className="purchase-list-item" key={index}>
                  <div className="purchase-list-item-margin">
                    {/* TODO: correct summary url */}
                    <Link to={`/products/${productName}`}>
                    <div className="pr-thumbnail">
    								  <div className="ex-centered">  
                        <img className="home-exhibition-image" src={imgSrc} alt=""/>
                      </div>
                    </div>
                    </Link>
                    <div className="present-project-list-item-caption">
                      <div className="present-project-list-item-caption-top">
                        <Link to={`/products/${productName}`}>
                          <h4>{shortTitle}</h4>
                        </Link>
                      </div>
                      <div className="present-project-list-item-caption-bottom">
                        <Link to={`/products/${productName}/summary`}>
                          <button className="purchase-cancel-button">후원내역</button>
                        </Link>
                        <a href={`https://netflix-salon.co.kr/products/${productName}/edit/abstract`}>
                          <button className="my-project-edit-button">수정하기</button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="purchase-list-item" key={index}>
                  <div className="purchase-list-item-margin">
                    {/* TODO: correct summary url */}
                    <Link to={`/products/${productName}`}>
                    <div className="pr-thumbnail">
    								  <div className="ex-centered">  
                        <img className="home-exhibition-image" src={imgSrc} alt=""/>
                      </div>
                    </div>
                    </Link>
                    <div className="present-project-list-item-caption">
                      <Link to={`/products/${productName}`}>
                      <div className="like-project-list-item-caption-top">
                        
                        <h4 className="present-project-list-item-title">{shortTitle}</h4>
                        
                        <div className="present-project-list-item-sub3">{postIntro}</div>
                        {	Math.ceil(remainingDays) > 0 ?
                        <div className="present-project-list-item-sub2">{Math.ceil(remainingDays)}일 남음</div>
                        :
                        <div className="present-project-list-item-sub2">주문 마감</div>
                        }
                      </div>
                      <div className="like-project-list-item-caption-bottom">
                        <div className="like-project-list-item-caption-bottom-left">{(currentMoney_sub + currentMoney_sub2).toLocaleString()}원</div>
                        <div className="like-project-list-item-caption-bottom-right">{Math.ceil((currentMoney_sub + currentMoney_sub2) / targetMoney * 100)}%</div>
                        <Progress completed={Math.ceil((currentMoney_sub + currentMoney_sub2) / targetMoney * 100)} />
                      </div>
                      </Link>
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
