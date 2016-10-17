import React, { Component, PropTypes } from 'react'
import { fetchExhibitionDetail } from '../../../../api/AppAPI'

import { ExhibitionDetail } from '../components'

import 'babel-polyfill'

class ExhibitionDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			exhibition: {},
			loaded: false
		}
	}

	async componentDidMount() {
		const newExhibition = await fetchExhibitionDetail()

		console.log('fetchExhibitionDetail', newExhibition);

		this.setState({ exhibition: newExhibition, loaded: true })
	}

	render() {
		const { exhibition, loaded } = this.state

		return loaded
			// ? <ExhibitionDetail {...exhibition} />
			? <ExhibitionDetail exhibition={exhibition}>{this.props.children}</ExhibitionDetail>
			: <div>ExhibitionDetail is loading</div>
	}
}

export default ExhibitionDetailContainer
