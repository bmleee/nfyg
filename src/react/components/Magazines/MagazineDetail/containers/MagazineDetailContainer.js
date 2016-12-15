import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../../../api/AppAPI'

import { MagazineDetail } from '../components'

class MagazineDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			relatedMagazines: [],
			relatedExhibitions: [],
			magazine: [],

			loaded: false,
		}

	}

	async componentDidMount() {
		const {
			user,
			data: {
				magazine,
				relatedMagazines,
				relatedExhibitions
			}
		} = await fetchUserAndData()

		// console.log('fetchUserAndData.r', r);

		this.props.setUser(user)
		this.setState({
			relatedMagazines: relatedMagazines,
			relatedExhibitions: relatedExhibitions,
			magazine: magazine,

			loaded: true,
		})
	}

	render() {
		const { relatedMagazines, relatedExhibitions, magazine } = this.state;

		return this.state.loaded
		?
			<MagazineDetail
				relatedMagazines={relatedMagazines}
				relatedExhibitions={relatedExhibitions}
				magazine={magazine}	/>
		:
			<div></div>
	}
}

export default MagazineDetailContainer
