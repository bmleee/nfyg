import React, { Component } from 'react'

import { fetchProfile } from '~/src/react/api/AppAPI'

// /user/me
export default class OtherProfile extends Component {
  state = {
    profile: {
      project: {},
      product: {},
      user: {},
    }
  }

  async componentDidMount() {
    try {
      const {
        user,
        data: {
          profile
        }
      } = await fetchProfile(this.props.params.user_id);

      this.props.appUtils.setUser(user);
      this.setState({
        profile
      })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div>
        후원한 프로젝트
      </div>
    )
  }
}
