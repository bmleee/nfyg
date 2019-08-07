import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router'

import {
  LikeList,
  LikeListStores
} from './_Common'

import { fetchProfileLikes } from '~/src/react/api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'

if (canUseDOM) {
  window.fetchProfileLikes = fetchProfileLikes
}

// /user/me
export default class MyProfile extends Component {
  state = {
    userType: '', // one of 'admin', 'artist', 'editor', 'user',
    profile: {}
  }

  async componentDidMount() {
    try {
      const {
        user,
        data: {
          userType,
          profile
        }
      } = await fetchProfileLikes(this.props.params.user_id);

      this.props.appUtils.setUser(user);
      this.setState({
        userType,
        profile
      })
    } catch (e) {
      // console.error(e);
    }
    window.scrollTo(0, 0)
  }

  render() {
    let {
      userType,
      profile
    } = this.state
    
    console.log('likelist.state', profile)
    
    return (
      <div>
        <MetaTags>
		            <title>좋아요 - 7Pictures</title>
		    </MetaTags>
        {/* profile.user is valid in case of other profile */}
        { this._renderCommon(profile.user) }
        {
          userType === 'admin' ? this._renderLikeList(profile)
          : userType === 'editor' ? this._renderLikeList(profile)
          : userType === 'store' ? this._renderLikeList(profile)
          : userType === 'artist' ? this._renderLikeList(profile)
          : userType === 'user' ?  this._renderLikeList(profile)
          : userType === 'other' ?  'Loading...'
          : 'Loading...'
        }
      </div>
    )  }

  _renderCommon(otherUser) {
    const {
      displayName,
      display_name,
      image,
    } = otherUser || appUtils.getUser()

    let name = displayName || display_name

    return name && (
      <div className="mypage-info-container">
				<div className="mypage-thumbnail-container">
					<img className="profile-user-thumbnail" src={ image } alt=""/>
					<h3>{ name }님의 좋아요</h3>
				</div>
			</div>
    )
  }

  _renderLikeList(profile) {
    const {
      product: {
        likedProducts
      },
      store: {
        likedStores
      }
    } = profile
    
    likedProducts.sort(function(a, b) {
			return a.product_funding.dateFrom > b.product_funding.dateFrom ? -1 : a.product_funding.dateFrom < b.product_funding.dateFrom ? 1 : 0		
		})
		
		let z = 0;
    for(var i in likedProducts) {
      if(Math.ceil(likedProducts[i].remainingDays) > 0 && Math.ceil(likedProducts[i].remainingDays) < 5) {
        let temporary = likedProducts[i];
        likedProducts[i] = likedProducts[z];
        likedProducts[z] = temporary;
        z++;
      }
    }
    
    let k = 0;
    for(var i in likedStores) {
      if(likedStores[i].storeisItemNew == true) {
        let temporary2 = likedStores[i];
        likedStores[i] = likedStores[k];
        likedStores[k] = temporary2;
        k++;
      }
    }
		
    
    return (
      <div className="profile">
        <div className="admin-profile-wrapper">
          <Tabs>
            <TabList>
              <Tab>펀딩프로젝트</Tab>
              <Tab>월요예술상점</Tab>
            </TabList>
  
            <TabPanel>
              { likedProducts && likedProducts.length > 0 ?
              null
              : <div>
                  <div className="purchase_empty_container">
                    <div className="purchase_empty">
                      내역이 존재하지 않습니다.
                    </div>
                  </div>
                </div>
              }
              
              { likedProducts && likedProducts.length > 0 ?
              <LikeList likes={likedProducts} />
              : null }
              
            </TabPanel>
            <TabPanel>
            
              { likedStores && likedStores.length > 0 ?
              null
              : <div>
                  <div className="purchase_empty_container">
                    <div className="purchase_empty">
                      내역이 존재하지 않습니다.
                    </div>
                  </div>
                </div>
              }
              
              { likedStores && likedStores.length > 0 ?
              <LikeListStores likes={likedStores} />
              : null }
              
            </TabPanel>
            
          </Tabs>
        </div>
      </div>
    )
  }

}
