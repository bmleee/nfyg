import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../../../api/AppAPI'

import Tab from './Tab'

export default class AdminProfileMain extends Component {

	async componentDidMount() {
		const r = await fetchUserAndData()
		console.log('fetchUserAndData.r', r);
		// TODO: let r.user, r.data is authenticated!
	}

	render() {
		return (
			<div className="profile-admin-container">
			</div>
		)
	}
}
