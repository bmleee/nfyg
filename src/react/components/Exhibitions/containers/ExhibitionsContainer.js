import React, { Component, PropTypes } from 'react'
import { fetchJSONFile } from '../../../api/AppAPI'

import { Exhibitions } from '../components'

import 'babel-polyfill'

class ExhibitionsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			exhibitions: [],
			filteredExhibitions: [],
			listFilter: '',

			loaded: false,
		}

		this._onChangeFilter = this._onChangeFilter.bind(this)
	}

	async componentDidMount() {
		const newExhibitions = await fetchJSONFile('exhibitions')

		this.setState({
			exhibition: newExhibitions,
			filteredExhibitions: newExhibitions,
			loaded: true
		})
	}

	_onChangeFilter(filter) {
		let newList = [];

		if (filter.length > 0) newList = this.state.exhibitions.filter( s => s.state === filter)
		else newList = Object.assign([], this.state.exhibitions)

		this.setState({
			filteredExhibitions: newList,
			listFilter: filter
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
}

export default ExhibitionsContainer
