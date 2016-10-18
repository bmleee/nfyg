import React, { Component, PropTypes } from 'react'
import { fetchJSONFile } from '../../../../api/AppAPI'

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
		const res = await fetchJSONFile('magazine')

		this.setState({
			relatedMagazines: res.relatedMagazines,
			relatedExhibitions: res.relatedExhibitions,
			magazine: res.magazine,

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
