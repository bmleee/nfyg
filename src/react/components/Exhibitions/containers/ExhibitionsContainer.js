import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../../api/AppAPI'

import { Exhibitions } from '../components'

 

class ExhibitionsContainer extends Component {
	state = {
		exhibitions: [],
		filteredExhibitions: [],
		listFilter: '',

		loaded: false,
	}

	async componentDidMount() {

		const {
			user,
			data: {
				exhibitions
			}
		} = await fetchUserAndData()

		console.log('fetchUserAndData.exhibitions', exhibitions);

		// const newExhibitions = await fetchJSONFile('exhibitions')

		this.props.setUser(user)

		this.setState({
			exhibitions,
			filteredExhibitions: exhibitions,
			loaded: true
		})
	}

	render() {
		const { exhibitions, filteredExhibitions, listFilter } = this.state

		return this.state.loaded
		?
			<Exhibitions
				_onChangeFilter={this._onChangeFilter}
				exhibitions={exhibitions}
				filteredExhibitions={filteredExhibitions}
				listFilter={listFilter} />
		:
			<div></div>
	}

	_onChangeFilter = (filter) => {
		let newList = [];

		if (filter.length > 0) newList = this.state.exhibitions.filter( s => s.state === filter)
		else newList = Object.assign([], this.state.exhibitions)

		this.setState({
			filteredExhibitions: newList,
			listFilter: filter
		})
	}
}

export default ExhibitionsContainer
