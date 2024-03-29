import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../../api/AppAPI'

import { Homeprojects } from '../components'



class HomeContainerprojects extends Component {
	constructor(props) {
		super(props)

		this.state = {
			home: {},
			loaded: false
		}
	}

	async componentDidMount() {

		try {
			const {
				user,
				data: {
					home
				}
			} = await fetchUserAndData()

			this.props.appUtils.setUser(user)
			this.setState({ home, loaded: true })
		} catch (e) {
			// console.error(e);
		}

	}

	render() {
		const { home, loaded } = this.state

		return loaded
			? <Homeprojects {...home} />
			: <div className="home-is-loading"></div>
	}
}

export default HomeContainerprojects
