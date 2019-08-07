import React, { Component } from 'react'
import { Link } from 'react-router'

import { DeletelikeProfile } from '~/src/react/api/AppAPI'

import Progress from 'react-progressbar';

export default class LikeList extends Component {
  render() {
    const {
      likes
    } = this.props
    
    let shippingStartBackground = (day) => ({
			backgroundColor : day == "월요일" ? 'rgba(238, 155, 17, 1)' : 
							  day == "화요일" ? 'rgba(227, 13, 64, 1)' :
							  day == "수요일" ? 'rgba(41, 22, 111, 1)' :
							  day == "목요일" ? 'rgba(0, 146, 63, 1)' :
							  day == "금요일" ? 'rgba(114, 28, 117, 1)' :
							  day == "매일" ? 'rgba(68, 68, 68, 1)' :
							  'transparent',
			marginTop : 6
		})
    
    return (
      <div className="purcahse-list-container">
        {
          likes.map(({
              _id,
              store,
              storeInfo,
              storeisItemNew,
              storeShippingCycle
            }, index) => {
              let {
                title,
                description,
                main_img,
                storeLink
              } = store
              
              let {
                orderEnd,
                shippingStart
              } = storeShippingCycle

              return (
                <div className="purchase-list-item" key={index}>
                  <div className="purchase-list-item-margin">
                    
                    <Link to={`/store/${storeLink}`}>
                    <div className="pr-thumbnail">
                      { !!storeisItemNew ? <div className="likelist-new-notice">NEW</div> : null }
								      <div className="ex-centered">
                      <img className="home-exhibition-image" src={main_img} alt=""/>
                      </div>
                    </div>
                    </Link>
                    
                    <div className="present-project-list-item-caption">
                      <Link to={`/store/${storeLink}`}>
                      
                        <div className="like-project-list-item-caption-top">
                          <h4 className="present-project-list-item-title">{title}</h4>
                          <div className="present-project-list-item-sub3">{description}</div>
                          {	storeShippingCycle.shipping_array && storeShippingCycle.shipping_array.map(({
              							}, index) => (
              							<div className="store-overview-shippingStart" style={shippingStartBackground(storeShippingCycle.shipping_array[index])}>{storeShippingCycle.shipping_array[index]}</div>
              							))
              						}
                        </div>
                        
                        <div className="like-project-list-item-caption-bottom">
                          {/*
                          <div className="like-project-list-item-caption-bottom-left">{(currentMoney_sub + currentMoney_sub2).toLocaleString()}원</div>
                          <div className="like-project-list-item-caption-bottom-right">{Math.ceil((currentMoney_sub + currentMoney_sub2) / targetMoney * 100)}%</div>
                          <Progress completed={Math.ceil((currentMoney_sub + currentMoney_sub2) / targetMoney * 100)} />
                          */}
                        </div>
                        
                      </Link>
                    </div>
                    
                  </div>
                </div>
              )
            })
        }
      </div>
    )
  }

}
