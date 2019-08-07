import React, { Component, PropTypes } from 'react'
import update from 'immutability-helper'

import Tab from './Tab'

export default class AdminProfileContainer extends Component {

	state = {
		profile: null // main, project, product, user, sponsor. each key has prosp of list, filter, filteredList, ...
	}

	constructor(props) {
		super(props)
		this.setState({profile: this.props.profile})
	}



	render() {
		const children = this.props.children && React.cloneElement(this.props.children, {
			profile: this.props.profile
		})

		// console.log('AdminProfileContainer', this);

		return (
			<div className="profile-admin-container">
				<Tab />
				{ children }
			</div>
		)
	}

	// sortProfileByKey = (key) => this.setState(update(this.state, k, ... ))
}
