import React, { Component, PropTypes } from 'react'
import { fetchUserProfile, updateUserProfile } from '../../../api/AppAPI'



/**
 * AdminProfile, ArtistProfile, EditorProfile, UserProfile 컴포넌트와 서버의 연결을 담당
 * 데이터 가져오기:
 * 	- /profile/:user-type/​:tab 이 로드될 때
 * 	- tab이 변경될 때
 *
 * TODO: state.profile.user 가 너무 늘어날 경우 데이터 한번에 가져오는게 느릴 수 있음...
 *  1. fetch data whenever window.location.search changed
 */
export default class SuperProfileContainer extends Component {
	render() {
		return (
			<div className="super-profile-container">
				{ this.props.children }
			</div>
		)
	}
}
