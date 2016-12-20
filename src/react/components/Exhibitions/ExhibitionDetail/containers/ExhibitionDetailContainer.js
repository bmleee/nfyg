import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../../../api/AppAPI'

import { ExhibitionDetail } from '../components'

import 'babel-polyfill'

class ExhibitionDetailContainer extends Component {

	state = {
		exhibition: {},
		loaded: false
	}

	getChildContext = () => {
		return {...this.state.exhibition}
	}

	async componentDidMount() {
		const {
			user,
			data: {
				exhibition
			}
		} = await fetchUserAndData()

		this.props.setUser(user)
		this.setState({ exhibition, loaded: true })
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
				<div>loading...</div>
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
