import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../../api/AppAPI'



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
	state = {
		prePathname: '',
		curPathname: '',
		profile: {
			main: {},
			project: {},
			product: {},
			user: {},
			sponsor: {}
		}
	}

	async componentDidMount() {
		const r = await fetchUserAndData()
		console.log('fetchUserAndData.r', r);
		// TODO: let r.user, r.data is authenticated!

		// only for client-standalone version
		const userType = window.location.pathname.split('/')[2]

		this.setState({
			prePathname: window.location.pathname,
			curPathname: window.location.pathname,
			profile: profiles[userType]
		})
	}

	async componentWillReceiveProps(next) {
		let prePathname = this.state.curPathname
		let curPathname = window.location.pathname

		// tab is switched
		if (prePathname !== curPathname) {
			// TODO: let r.user, r.data is authenticated!
			console.log('fetchUserAndData required');
		}

		this.setState({
			prePathname,
			curPathname,
		})
	}


	render() {
		const children = this.props.children && React.cloneElement(this.props.children, {
			profile: this.state.profile,
		})

		return (
			<div className="super-profile-container">
				{ children }
			</div>
		)
	}

}

const profiles = {
	/**
	 *  Admin Profile
	 */
	admin: {
		main: {

		},
		project: {
			list: [ // { state, projectName, longTitle, dateFrom, dateTo, currentMoney, targetMoney, numSupporters, numBuyers, numSharers, editLink, }
				{ id: 1, projectName:'7pictures', state: 'in-progress', longTitle: '목욕탕에서 일어나는 일1', dateFrom: '2016-10-20', dateTo: '2016-11-21', currentMoney: 2010200, targetMoney: 300000, numSupporters: 300, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 2, projectName:'7pictures', state: 'in-progress', longTitle: '목욕탕에서 일어나는 일2', dateFrom: '2016-12-20', dateTo: '2016-12-31', currentMoney: 2010200, targetMoney: 300000, numSupporters: 234, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 3, projectName:'7pictures', state: 'completed', longTitle: '목욕탕에서 일어나는 일3', dateFrom: '2016-10-20', dateTo: '2016-11-21', currentMoney: 2010200, targetMoney: 300000, numSupporters: 124, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 4, projectName:'7pictures', state: 'completed', longTitle: '목욕탕에서 일어나는 일4', dateFrom: '2016-12-20', dateTo: '2016-12-31', currentMoney: 2010200, targetMoney: 300000, numSupporters: 352, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 5, projectName:'7pictures', state: 'preparing', longTitle: '목욕탕에서 일어나는 일5', dateFrom: '2016-10-20', dateTo: '2016-11-21', currentMoney: 2010200, targetMoney: 300000, numSupporters: 452, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 6, projectName:'7pictures', state: 'preparing', longTitle: '목욕탕에서 일어나는 일6', dateFrom: '2016-12-20', dateTo: '2016-12-31', currentMoney: 2010200, targetMoney: 300000, numSupporters: 345, numBuyers: 14, numSharers: 50, editLink: '' },
			]
		},
		product: {
			list: [ // { state, productName, longTitle, dateFrom, dateTo, currentMoney, targetMoney, numSupporters, numBuyers, numSharers, editLink, }
				{ id: 1, productName:'7pictures', state: 'in-progress', longTitle: '목욕탕에서 일어나는 일1', dateFrom: '2016-10-20', dateTo: '2016-11-21', currentMoney: 2010200, targetMoney: 300000, numSupporters: 300, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 2, productName:'7pictures', state: 'in-progress', longTitle: '목욕탕에서 일어나는 일2', dateFrom: '2016-12-20', dateTo: '2016-12-31', currentMoney: 2010200, targetMoney: 300000, numSupporters: 234, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 3, productName:'7pictures', state: 'completed', longTitle: '목욕탕에서 일어나는 일3', dateFrom: '2016-10-20', dateTo: '2016-11-21', currentMoney: 2010200, targetMoney: 300000, numSupporters: 124, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 4, productName:'7pictures', state: 'completed', longTitle: '목욕탕에서 일어나는 일4', dateFrom: '2016-12-20', dateTo: '2016-12-31', currentMoney: 2010200, targetMoney: 300000, numSupporters: 352, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 5, productName:'7pictures', state: 'preparing', longTitle: '목욕탕에서 일어나는 일5', dateFrom: '2016-10-20', dateTo: '2016-11-21', currentMoney: 2010200, targetMoney: 300000, numSupporters: 452, numBuyers: 14, numSharers: 50, editLink: '' },
				{ id: 6, productName:'7pictures', state: 'preparing', longTitle: '목욕탕에서 일어나는 일6', dateFrom: '2016-12-20', dateTo: '2016-12-31', currentMoney: 2010200, targetMoney: 300000, numSupporters: 345, numBuyers: 14, numSharers: 50, editLink: '' },
			]
		},
		user: {
			list: [ // {role, displanName, email, id,}
				{role: 'admin', displanName: '이병만', email: 'lee@7pictures.co.kr', id: 1},
				{role: 'editor', displanName: '전희재', email: 'lee@7pictures.co.kr', id: 2},
				{role: 'artist', displanName: '이민지', email: 'lee@7pictures.co.kr', id: 3},
				{role: 'user', displanName: '김태현', email: 'lee@7pictures.co.kr', id: 4},
			]
		},
		sponsor: {
			list: [ // {displayName, sponsorName, money, }
				{id: 1, displayName: '7pictures', sponsorName: '7pictures', money: 300000},
				{id: 2, displayName: 'hopp', sponsorName: 'hopp', money: 500000},
				{id: 3, displayName: '시민 박주형', sponsorName: 'citizen_pjh', money: 300000},
			]
		}
	},

	/**
	 * Editor Profile
	 */
	editor: {
		main: {

		},
		project: {

		},
		product: {

		},
	},


	/**
	 * Artist Profile
	 */
	artist: {
		main: {

		},
		project: {

		},
		product: {

		},
	},


	/**
	 * User Profile
	 */
	user: {
		main: {

		},
		project: {

		},
		product: {

		},
	},
}
