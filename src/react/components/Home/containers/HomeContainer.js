import React, { Component, PropTypes } from 'react'
import { fetchHome } from '../../../api/AppAPI'

import { Home } from '../components'

import 'babel-polyfill'

class HomeContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			home: {},
			loaded: false
		}
	}

	async componentDidMount() {
		const newHome = await fetchHome()

		this.setState({ home: newHome, loaded: true })
	}

	render() {
		const { home, loaded } = this.state

		return loaded
			? <Home {...home} />
			: <div>Home is loading</div>
	}
}

export default HomeContainer