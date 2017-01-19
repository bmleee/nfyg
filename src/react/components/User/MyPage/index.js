import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {
  Products,
  Projects,
  Users,
  Sponsors,

  AuthorizedProjects,
  PurchaseList,
  SharedProjects,
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
    /*
      admin.profile: {
        projects,
        products,
        users,
        sponsors,
      }

      editor.profile: {
        projects,
        products,
        project: {
          sharedProjects: [],
          purchasedProjects: [],
        },
        project: {
          purchasedProducts: []
        }
      }

      artist.profile: {
        project: {
          sharedProjects: [],
          purchasedProjects: [],
          authorizedProjects: [],
        },
        project: {
          purchasedProducts: []
        }
      }

      user.profile: {
        project: {
          sharedProjects: [],
          purchasedProjects: [],
        },
        product: {
          purchasedProducts: []
        }
      }
    */
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

      this.props.appUtils.setUser(user);
      this.setState({
        userType,
        profile
      })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let {
      userType,
      profile
    } = this.state

    console.log('profile', profile);

    return (
      <div>
        {/* profile.user is valid in case of other profile */}
        { this._renderCommon(profile.user) }
        {
          userType === 'admin' ? this._renderAdmin(profile)
            : userType === 'editor' ? this._renderEditor(profile)
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
      projects,
      products,
      users,
      sponsors,
    } = profile

    return (
      <div className="profile-wrapper">
        <Tabs>
          <TabList>
            <Tab>프로젝트 관리</Tab>
            <Tab>미술소품 관리</Tab>
            <Tab>사용자 관리</Tab>
            <Tab>스폰서 관리</Tab>
          </TabList>

          <TabPanel>
            { projects && <Projects projects={projects}/>}
          </TabPanel>
          <TabPanel>
            { products && <Products products={products}/>}
          </TabPanel>
          <TabPanel>
            { users && <Users users={users}/>}
          </TabPanel>
          <TabPanel>
            { sponsors && <Sponsors sponsors={sponsors}/>}
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  _renderEditor(profile) {
    const {
      projects,
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
            <Tab>미술소품 관리</Tab>
            <Tab>후원/구매 내역</Tab>
          </TabList>

          <TabPanel>
            { project && <Projects projects={projects}/>}
          </TabPanel>
          <TabPanel>
            { products && <Products products={products}/>}
          </TabPanel>
          <TabPanel>
            <h4>공유 후원 프로젝트</h4>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}
            <h4>리워드 후원 프로젝트</h4>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects}/>}
            <h4>구매한 미술소품</h4>
            { purchasedProducts && <PurchaseList purchases={purchasedProducts}/>}
          </TabPanel>
        </Tabs>
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
            <h4>구매한 미술소품</h4>
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
      },
      product: {
        purchasedProducts,
      }
    } = profile

    return (
      <div className="profile-wrapper">
<<<<<<< 46fea2b9b218cdc017da6c86601cef5f03ed6d46:src/react/components/User/Profile/MyProfile/index.js

            <h4>공유 후원 프로젝트</h4>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}

            <h4>리워드 후원 프로젝트</h4>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects}/>}

            <h4>구매한 미술소품</h4>
            { purchasedProducts && <PurchaseList purchases={purchasedProducts}/>}

=======
        <Tabs>
          <TabList>
            <Tab>Shared Projects</Tab>
            <Tab>Purchased Projects</Tab>
            <Tab>Purchased Products</Tab>
          </TabList>

          <TabPanel>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects} other={other}/>}
          </TabPanel>
          <TabPanel>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects} other={other}/>}
          </TabPanel>
          <TabPanel>
            { purchasedProducts && <PurchaseList purchases={purchasedProducts} other={other}/>}
          </TabPanel>
        </Tabs>
>>>>>>> sup:src/react/components/User/MyPage/index.js
      </div>
    )
  }
}
