import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router'

import {
  Users
} from './_Common'

import { fetchUserlist } from '~/src/react/api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'

if (canUseDOM) {
  window.fetchUserlist = fetchUserlist
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
      } = await fetchUserlist(this.props.params.user_id);
      
      this.props.appUtils.setUser(user);
      this.setState({
        userType,
        profile
      })
    } catch (e) {
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
        <MetaTags>
		            <title>사용자관리 - 7Pictures</title>
		    </MetaTags>
        {/* profile.user is valid in case of other profile */}
        { this._renderCommon(profile.user) }
        {
          userType === 'admin' ? this._renderAdmin(profile)
          : userType === 'editor' ? 'Loading...'
          : userType === 'store' ? 'Loading...'
          : userType === 'artist' ? 'Loading...'
          : userType === 'user' ?  'Loading...'
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
					<h3>사용자관리</h3>
				</div>
			</div>
    )
  }

  _renderAdmin(profile) {
    const {
      userlist
    } = profile

    return (
      <div className="admin-profile-wrapper">
          { userlist && <Users users={userlist}/>}
      </div>
    )
  }
  
}
