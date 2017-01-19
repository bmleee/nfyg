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
} from '../_Common'

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
      } = await fetchProfile();

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
        { this._renderCommon() }
        {
          userType === 'admin' ? this._renderAdmin(profile)
            : userType === 'editor' ? this._renderEditor(profile)
            : userType === 'artist' ? this._renderArtist(profile)
            : userType === 'user' ?  this._renderUser(profile)
            : 'Loading...'
        }
      </div>
    )


  }

  _renderCommon() {
    const {
      displayName,
      image,
    } = appUtils.getUser()

    return displayName && (
      <div className="profile-user-container">
        { displayName }
        <img src={ image } alt=""/>
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
            <Tab>Projects</Tab>
            <Tab>Products</Tab>
            <Tab>Useres</Tab>
            <Tab>Sponsors</Tab>
          </TabList>

          <TabPanel>
            { project && <Projects projects={projects}/>}
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
            <Tab>Projects</Tab>
            <Tab>Products</Tab>
            <Tab>Shared Projects</Tab>
            <Tab>Purchased Projects</Tab>
            <Tab>Purchased Products</Tab>
          </TabList>

          <TabPanel>
            { project && <Projects projects={projects}/>}
          </TabPanel>
          <TabPanel>
            { products && <Products products={products}/>}
          </TabPanel>
          <TabPanel>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}
          </TabPanel>
          <TabPanel>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects}/>}
          </TabPanel>
          <TabPanel>
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
            <Tab>Authorized Projects</Tab>
            <Tab>Shared Projects</Tab>
            <Tab>Purchased Projects</Tab>
            <Tab>Purchased Products</Tab>
          </TabList>

          <TabPanel>
            { authorizedProjects && <AuthorizedProjects authorizedProjects={authorizedProjects}/>}
          </TabPanel>
          <TabPanel>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}
          </TabPanel>
          <TabPanel>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects}/>}
          </TabPanel>
          <TabPanel>
            { purchasedProducts && <PurchaseList purchases={purchasedProducts}/>}
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  _renderUser(profile) {
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
        <Tabs>
          <TabList>
            <Tab>Shared Projects</Tab>
            <Tab>Purchased Projects</Tab>
            <Tab>Purchased Products</Tab>
          </TabList>

          <TabPanel>
            { sharedProjects && <SharedProjects sharedProjects={sharedProjects}/>}
          </TabPanel>
          <TabPanel>
            { purchasedProjects && <PurchaseList purchases={purchasedProjects}/>}
          </TabPanel>
          <TabPanel>
            { purchasedProducts && <PurchaseList purchases={purchasedProducts}/>}
          </TabPanel>
        </Tabs>
      </div>
    )
  }

}
