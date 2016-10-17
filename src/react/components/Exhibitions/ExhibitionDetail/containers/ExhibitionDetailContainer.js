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

		this.getChildContext = this.getChildContext.bind(this)
	}

	getChildContext() {
		let {
			heading,
			overview,
			recommendedExhibitions,
			artworks,
			post,
			qna,
		} = this.state.exhibition;

		return {
			heading,
			overview,
			recommendedExhibitions,
			artworks,
			post,
			qna,
		};
	}

	async componentDidMount() {
		const newExhibition = await fetchExhibitionDetail()

		this.setState({ exhibition: newExhibition, loaded: true })
	}

	render() {
		const { exhibition, loaded } = this.state
		const children = this.props.children &&
			this.state.exhibition &&
			React.cloneElement(this.props.children, {
				heading: this.state.exhibition.heading,
				overview: this.state.exhibition.overview,
				recommendedExhibitions: this.state.exhibition.recommendedExhibitions,
				artworks: this.state.exhibition.artworks,
				post: this.state.exhibition.post,
				qna: this.state.exhibition.qna,
				getChildContext: this.getChildContext,
			})

		return loaded
			// ? <ExhibitionDetail {...exhibition} />
			?
				<ExhibitionDetail
					exhibition={exhibition}
					getChildContext={this.getChildContext} >
					{children}
				</ExhibitionDetail>
			:
				<div>ExhibitionDetail is loading</div>
	}
}

ExhibitionDetailContainer.childContextTypes = {
	heading: PropTypes.any,
	overview: PropTypes.any,
	recommendedExhibitions: PropTypes.any,
	artworks: PropTypes.any,
	post: PropTypes.any,
	qna: PropTypes.any,
}


export default ExhibitionDetailContainer
