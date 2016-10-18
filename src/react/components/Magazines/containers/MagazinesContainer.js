import React, { Component, PropTypes } from 'react'
import { fetchJSONFile } from '../../../api/AppAPI'

import { Magazines } from '../components'

import 'babel-polyfill'

class MagazinesContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			magazines: [],
			categories: [],
			filteredMagazines: [],
			currentCategory: '',

			loaded: false,
		}

		this._onChangeCategory = this._onChangeCategory.bind(this);
	}

	async componentDidMount() {
		const res = await fetchJSONFile('magazines')

		this.setState({
			magazines: res.magazines,
			categories: res.categories,
			filteredMagazines: res.magazines,
			currentCategory: res.categories[0],

			loaded: true,
		})
	}

	_onChangeCategory(category) {
		let newList = [];

		if (category === categories[0]) newList = Object.assign([], this.state.magazines)
		else newList = this.state.magazines.filter( s => s.category === category)

		this.setState({
			filteredMagazines: newList,
			currentCategory: category,
		})
	}

	render() {
		const { magazines, filteredMagazines, categories, currentCategory } = this.state;

		return this.state.loaded
		?
			<Magazines
				magazines={magazines}
				filteredMagazines={filteredMagazines}
				categories={categories}
				currentCategory={currentCategory}
				_onChangeCategory={this._onChangeCategory} />
		:
			<div></div>
	}
}

export default MagazinesContainer
