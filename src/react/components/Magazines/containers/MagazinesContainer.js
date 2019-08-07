import React, { Component, PropTypes } from 'react'
import { Magazines } from '../components'

import { fetchUserAndData, } from '../../../api/AppAPI'
import { label2value } from '~/src/react/lib/utils'

import { SelectOptions } from '../../../constants'




const selectOptions = SelectOptions.MagazineCategory
const categories = selectOptions.map(v => v.label)

class MagazinesContainer extends Component {

	state = {
		magazines: [],
		categories: categories,
		filteredMagazines: [], // TODO: filter magazine by category? what API do
		currentCategory: categories[0],

		loaded: false,
	}

	async componentDidMount() {
		try {
			const {
				user,
				data: { magazines }
			} = await fetchUserAndData()

			// console.log('fetchUserAndData', magazines);

			appUtils.setUser(user)
			this.setState({
				magazines: magazines,
				filteredMagazines: magazines,
				loaded: true,
			})
		} catch (e) {
			// console.error(e);
		}
	}

	_onChangeCategory = (category) => {
		const { categories } = this.state


		// console.log('category', category);
		let newList = []

		if (category === categories[0]) newList = Object.assign([], this.state.magazines)
		else newList = this.state.magazines.filter( s => s.category === label2value(selectOptions, category) )

		this.setState({
			filteredMagazines: newList,
			currentCategory: category,
		})
	}

	render() {
		const { magazines, filteredMagazines, categories, currentCategory } = this.state;

		// console.log('MagazinesContainer', this);

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
