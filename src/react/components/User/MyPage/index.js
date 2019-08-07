import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router'

import {
  Products,
  Projects,
  Users,
  Sponsors,
  Stores,

  AuthorizedProjects,
  AuthorizedProducts,
  AuthorizedStores,
  
  PurchaseList,
  PurchasecancelList,
  PurchasescsList,
  PurchasefailedList,
  PurchaseShippingList,
  
  LikeList,
  
  SharedProjects,
  
  StorePurchaseList
} from './_Common'

import { fetchProfile } from '~/src/react/api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'

if (canUseDOM) {
  window.fetchProfile = fetchProfile
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
      } = await fetchProfile(this.props.params.user_id);
      
      // console.log('profile', profile)

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

    return (
      <div>
        {
        userType === 'other' ?
        <MetaTags>
		            <title>{profile.user.display_name}님의 페이지 - 7Pictures</title>
		    </MetaTags>
		    :
        <MetaTags>
		            <title>내 페이지 - 7Pictures</title>
		    </MetaTags>
        }
        {/* profile.user is valid in case of other profile */}
        { this._renderCommon(profile.user) }
        {
          userType === 'admin' ? this._renderAdmin(profile)
          : userType === 'editor' ? this._renderEditor(profile)
          : userType === 'store' ? this._renderStore(profile)
          : userType === 'artist' ? this._renderArtist(profile)
          : userType === 'user' ?  this._renderUser(profile)
          : userType === 'other' ?  this._renderUser(profile, true)
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
					<h3>{ name }</h3>
				</div>
			</div>
    )
  }

  _renderAdmin(profile) {
    const {
      products,
      stores,
      sponsors,
    } = profile
    
    
    return (
      <div className="admin-profile-wrapper">
        <Tabs>
          <TabList>
            <Tab>프로젝트 관리</Tab>
            <Tab>예술상점 관리</Tab>
          </TabList>

          <TabPanel>
            { products && <Products products={products}/>}
          </TabPanel>
          <TabPanel>
            { stores && <Stores stores={stores}/>}
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  _renderEditor(profile) {
    const {
      products,
      project: {
        sharedProjects,
        purchasedProjects,
      },
      project: {
        purchasedProducts
      }
    } = profile

    return (
      <div className="profile-wrapper">
        <Tabs>
          <TabList>
            <Tab>프로젝트 관리</Tab>
            <Tab>후원/구매 내역</Tab>
          </TabList>

          <TabPanel>
            { products && <Products products={products}/>}
          </TabPanel>
          <TabPanel>
            <h4>공유 후원 프로젝트</h4>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}
            <h4>리워드 후원 프로젝트</h4>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects}/>}
            <h4>구매한 프로젝트</h4>
            { purchasedProducts && <PurchaseList purchases={purchasedProducts}/>}
          </TabPanel>
        </Tabs>
      </div>
    )
  }
  
  _renderStore(profile) {
    const {
      product: {
        purchasedProducts,
        authorizedProducts,
        likedProducts
      },
      store: {
        purchasedStores,
        authorizedStores,
      }
    } = profile
    
    let like_product_num = likedProducts && likedProducts.length
    
    let purchase_preparing = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'preparing') {
        purchase_preparing.push(purchasedProducts[i])
      }
    }
    let purchase_failed = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'failed') {
        purchase_failed.push(purchasedProducts[i])
      }
    }
    let purchase_success = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'scheduled') {
        purchase_success.push(purchasedProducts[i])
      }
    }
    let purchase_cancel = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'cancel-by-user') {
        purchase_cancel.push(purchasedProducts[i])
      }
    }
    let purchase_shipping = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'shipping') {
        purchase_shipping.push(purchasedProducts[i])
      }
    }

    return (
      <div className="profile-wrapper">
        
        { authorizedProducts && authorizedProducts.length > 0 
        ? authorizedProducts && <AuthorizedProducts authorizedProducts={authorizedProducts}/>
        : <div className="store-create-container">
            <Link to={`/funding-start`}><button className="store-create-button">프로젝트 개설하기</button></Link>
          </div> }
        
        { authorizedStores && authorizedStores.length > 0 
        ? authorizedStores && <AuthorizedStores authorizedStores={authorizedStores}/>
        : <div className="store-create-container">
            <Link to={`/store-apply`}><button className="store-create-button">상점 개설하기</button></Link>
          </div> }
        
        <div className="profile">
          <Tabs onSelect={this.handleSelect} selectedIndex={0}>
              
              <TabList>
                <Tab><div className="mypage_tab1">후원 내역</div></Tab>
      					<Tab><div className="mypage_tab2">구매 내역</div></Tab>
      				</TabList>
    				
      				<TabPanel>
          
                { purchasedProducts && purchasedProducts.length > 0
                ? null
                : <div>
                    <div className="purchase_empty_container">
                      <div className="purchase_empty">
                        내역이 존재하지 않습니다.
                      </div>
                    </div>
                  </div>
                }
                
                { purchase_preparing && purchase_preparing.length > 0
                ? purchasedProducts && <PurchaseList purchases={purchasedProducts} />
                : null
                }
                
                { purchase_failed && purchase_failed.length > 0
                ? purchasedProducts && <PurchasefailedList purchases={purchasedProducts} />
                : null
                }
                
                { purchase_success && purchase_success.length > 0
                ? purchasedProducts && <PurchasescsList purchases={purchasedProducts} />
                : null
                }
                
                { purchase_shipping && purchase_shipping.length > 0
                ? purchasedProducts && <PurchaseShippingList purchases={purchasedProducts}/>
                : null
                }
              
              </TabPanel>
              
              <TabPanel>
                { purchasedStores && purchasedStores.length > 0 ?
                null
                : <div>
                    <div className="purchase_empty_container">
                      <div className="purchase_empty">
                        내역이 존재하지 않습니다.
                      </div>
                    </div>
                  </div>
                }
                
                { purchasedStores && purchasedStores.length > 0
                ? purchasedStores  && <StorePurchaseList purchases={purchasedStores} />
                : null
                }
                
              </TabPanel>
            
            
            </Tabs>
        </div>
              
        
        {/*
        <h4>결제 예약 내역</h4>
        { purchasedProducts && <PurchaseList purchases={purchasedProducts} other={other}/>}
        
        <h4>결제 실패 내역</h4>
        { purchasedProducts && <PurchasefailedList purchases={purchasedProducts} other={other}/>}
        { purchasedProjects && <PurchaseList purchases={purchasedProjects} other={other}/>}
        
        <h4>결제 완료 내역</h4>
        { purchasedProducts && <PurchasescsList purchases={purchasedProducts} other={other}/>}
        { purchasedProjects && <PurchasescsList purchases={purchasedProjects} other={other}/>}
        
        <h4>결제 취소 내역</h4>
        { purchasedProducts && <PurchasecancelList purchases={purchasedProducts} other={other}/>}
        { purchasedProjects && <PurchasecancelList purchases={purchasedProjects} other={other}/>}
        
        { purchasedProjects && <PurchasecancelList purchases={purchasedProjects} other={other}/> */}
        
        
      </div>
    )
  }

  _renderArtist(profile) {
    const {
      project: {
        authorizedProjects,
        sharedProjects,
        purchasedProjects,
      },
      project: {
        purchasedProducts,
      }
    } = profile

    return (
      <div className="profile-wrapper">
        <Tabs>
          <TabList>
            <Tab>내 프로젝트</Tab>
            <Tab>후원/구매 내역</Tab>
          </TabList>

          <TabPanel>
            { authorizedProjects && <AuthorizedProjects authorizedProjects={authorizedProjects}/>}
          </TabPanel>
          <TabPanel>
            <h4>공유 후원 프로젝트</h4>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}
            <h4>리워드 후원 프로젝트</h4>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects}/>}
            <h4>구매한 프로젝트</h4>
            { purchasedProducts && <PurchaseList purchases={purchasedProducts}/>}
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  _renderUser(profile, other = false) {
    const {
      project: {
        sharedProjects,
        purchasedProjects,
        authorizedProjects,
        likedProjects
      },
      product: {
        purchasedProducts,
        authorizedProducts,
        likedProducts
      },
      store: {
        purchasedStores,
        authorizedStores
      }
    } = profile
    
    let like_project_num = likedProjects && likedProjects.length
    let like_product_num = likedProducts && likedProducts.length
    let like_num = like_project_num + like_product_num
    // console.log('like_length', like_num)
    
    let purchase_preparing = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'preparing') {
        purchase_preparing.push(purchasedProducts[i])
      }
    }
    let purchase_failed = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'failed') {
        purchase_failed.push(purchasedProducts[i])
      }
    }
    let purchase_success = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'scheduled') {
        purchase_success.push(purchasedProducts[i])
      }
    }
    let purchase_cancel = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'cancel-by-user') {
        purchase_cancel.push(purchasedProducts[i])
      }
    }
    let purchase_shipping = new Array;
    for(var i in purchasedProducts) {
      if(purchasedProducts[i].purchase_info.purchase_state == 'shipping') {
        purchase_shipping.push(purchasedProducts[i])
      }
    }

    return (
      <div className="profile-wrapper">
        {/* <h4>공유 후원 프로젝트</h4>
        { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}
        */}
        
        { authorizedProducts && authorizedProducts.length > 0 
        ? authorizedProducts && <AuthorizedProducts authorizedProducts={authorizedProducts} other={other}/>
        : <div className="store-create-container">
            <Link to={`/funding-start`}><button className="store-create-button">프로젝트 개설하기</button></Link>
          </div> }
        
        { authorizedStores && authorizedStores.length > 0 
        ? authorizedStores && <AuthorizedStores authorizedStores={authorizedStores}/>
        : <div className="store-create-container">
            <Link to={`/store-apply`}><button className="store-create-button">상점 개설하기</button></Link>
          </div> }
        
        <div className="profile">
          <Tabs onSelect={this.handleSelect} selectedIndex={0}>
              
              <TabList>
                <Tab><div className="mypage_tab1">후원 내역</div></Tab>
      					<Tab><div className="mypage_tab2">구매 내역</div></Tab>
      				</TabList>
    				
      				<TabPanel>
          
                { purchasedProducts && purchasedProducts.length > 0
                ? null
                : <div>
                    <div className="purchase_empty_container">
                      <div className="purchase_empty">
                        내역이 존재하지 않습니다.
                      </div>
                    </div>
                  </div>
                }
                
                { purchase_preparing && purchase_preparing.length > 0
                ? purchasedProducts && <PurchaseList purchases={purchasedProducts} other={other}/>
                : null
                }
                
                { purchase_failed && purchase_failed.length > 0
                ? purchasedProducts && <PurchasefailedList purchases={purchasedProducts} other={other}/>
                : null
                }
                
                { purchase_success && purchase_success.length > 0
                ? purchasedProducts && <PurchasescsList purchases={purchasedProducts} other={other}/>
                : null
                }
                
                { purchase_shipping && purchase_shipping.length > 0
                ? purchasedProducts && <PurchaseShippingList purchases={purchasedProducts} other={other}/>
                : null
                }
              
              </TabPanel>
              
              <TabPanel>
                { purchasedStores && purchasedStores.length > 0 ?
                null
                : <div>
                    <div className="purchase_empty_container">
                      <div className="purchase_empty">
                        내역이 존재하지 않습니다.
                      </div>
                    </div>
                  </div>
                }
                
                { purchasedStores && purchasedStores.length > 0
                ? purchasedStores  && <StorePurchaseList purchases={purchasedStores} other={other}/>
                : null
                }
                
              </TabPanel>
            
            
            </Tabs>
        </div>
              
        
        {/*
        <h4>결제 예약 내역</h4>
        { purchasedProducts && <PurchaseList purchases={purchasedProducts} other={other}/>}
        
        <h4>결제 실패 내역</h4>
        { purchasedProducts && <PurchasefailedList purchases={purchasedProducts} other={other}/>}
        { purchasedProjects && <PurchaseList purchases={purchasedProjects} other={other}/>}
        
        <h4>결제 완료 내역</h4>
        { purchasedProducts && <PurchasescsList purchases={purchasedProducts} other={other}/>}
        { purchasedProjects && <PurchasescsList purchases={purchasedProjects} other={other}/>}
        
        <h4>결제 취소 내역</h4>
        { purchasedProducts && <PurchasecancelList purchases={purchasedProducts} other={other}/>}
        { purchasedProjects && <PurchasecancelList purchases={purchasedProjects} other={other}/>}
        
        { purchasedProjects && <PurchasecancelList purchases={purchasedProjects} other={other}/> */}
        
        
      </div>
    )
  }
}
