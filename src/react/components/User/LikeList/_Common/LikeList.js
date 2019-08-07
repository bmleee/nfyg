import React, { Component } from 'react'
import { Link } from 'react-router'

import { DeletelikeProfile } from '~/src/react/api/AppAPI'

import Progress from 'react-progressbar';

export default class LikeList extends Component {
  render() {
    const {
      likes,
      other = false,
    } = this.props
    
    return (
      <div className="purcahse-list-container">
        {
          likes.map(({
              _id,
              project,
              product,
              project_funding,
              product_funding,
            }, index) => {
              let p = project || product // abstract!
              let p_funding = project_funding || product_funding
              let pName = p.projectName || p.productName
              let {
                shortTitle,
                imgSrc
              } = p
              
              let {
                dateTo,
                currentMoney,
                currentMoney_sub,
                currentMoney_sub2,
                numValidPurchases_sub,
                targetMoney,
              } = p_funding
              
              
              const today = new Date();
              let remainingDays = ((new Date(dateTo).getTime() + 86400000) - today.getTime() ) / 1000 / 60 / 60 / 24
              //console.log('p_funding', p_funding)

              return (
                <div className="purchase-list-item" key={index}>
                  <div className="purchase-list-item-margin">
                    {/* TODO: correct summary url */}
                    { !product ?
                    <Link to={`/projects/${pName}`}>
                    <div className="pr-thumbnail">
								      <div className="ex-centered">
                      <img className="home-exhibition-image" src={imgSrc} alt=""/>
                      </div>
                    </div>
                    </Link>
                    :
                    <Link to={`/products/${pName}`}>
                    <div className="pr-thumbnail">
                      { Math.ceil(remainingDays) > 0 && Math.ceil(remainingDays) < 5 ? <div className="likelist-endsoon-notice">마감임박</div> : null }
								      <div className="ex-centered">
                      <img className="home-exhibition-image" src={imgSrc} alt=""/>
                      </div>
                    </div>
                    </Link>
                    }
                    
                    { !product ?
                    <div className="present-project-list-item-caption">
                      <Link to={`/projects/${pName}`}>
                      <div className="like-project-list-item-caption-top">
                        
                        <h4 className="present-project-list-item-title">{shortTitle}</h4>
                        
                        <div className="present-project-list-item-sub3">{numValidPurchases_sub}명 주문중</div>
                        {	Math.ceil(remainingDays) > 0 ?
                        <div className="present-project-list-item-sub2">
                          {Math.ceil(remainingDays)}일 남음
                        </div>
                        :
                        <div className="present-project-list-item-sub2">프로젝트 마감</div>
                        }
                      </div>
                      <div className="like-project-list-item-caption-bottom">
                        <div className="like-project-list-item-caption-bottom-left">{currentMoney.toLocaleString()}원</div>
                        <div className="like-project-list-item-caption-bottom-right">{Math.ceil(currentMoney / targetMoney * 100)}%</div>
                        <Progress completed={Math.ceil(currentMoney / targetMoney * 100)} />
                      </div>
                      </Link>
                      {/* !other && <button className="purchase-cancel-button" onClick={this._onClickCancel(`/projects/${pName}`, _id)}>취 소 오</button> */}
                    </div>
                    :
                    <div className="present-project-list-item-caption">
                      <Link to={`/products/${pName}`}>
                      <div className="like-project-list-item-caption-top">
                        
                        <h4 className="present-project-list-item-title">{shortTitle}</h4>
                        
                        <div className="present-project-list-item-sub3">{numValidPurchases_sub}명 주문중</div>
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
                      {/* !other && <button className="purchase-cancel-button" onClick={this._onClickCancel(`/products/${pName}`, _id)}>취 소 오</button> */}
                    </div>
                    }
                  </div>
                </div>
              )
            })
        }
      </div>
    )
  }

  _onClickCancel = (p_Name, like_id) => {
    return async () => {
      try {
        const r = await DeletelikeProfile(p_Name, like_id)
        console.log(`Purchase ${like_id} cancel result`)
        console.log(r)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
