import React, { Component, PropTypes } from 'react'
import { fetchUserAndData, createMagazine, updateMagazine } from '../../../../api/AppAPI'

import { MagazineDetail } from '../components'

class MagazineDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			artworks: [],
			headingSlider: [],
			relatedContents: [],
			magazine: {},
			next: {},
			pre: {},
			loaded: false,
		}

	}

	async shouldComponentUpdate(nextProps, nextState) {
		console.log(`${this.props.params.magazineName} -> ${nextProps.params.magazineName}`);

		if (!this.state.loaded && nextState.loaded) {
			return true
		}

		if (this.props.params.magazineName !== nextProps.params.magazineName) {
			return await this.reflashState()
		}

		return false
	}

	async componentDidMount() {
		await this.reflashState()
	}

	render() {
		const {
			artworks,
			headingSlider,
			magazine,
			relatedContents,
			next = null,
			pre = null
		 } = this.state;

		return this.state.loaded
		?
			<MagazineDetail
				{...this.state}
			/>
		:
			<div></div>
	}

	async reflashState() {
		try {
			const {
				user,
				data: {
					artworks,
					headingSlider,
					magazine,
					relatedContents,
					next,
					pre,
				}
			} = await fetchUserAndData()

			appUtils.setUser(user)

			this.setState({
				artworks,
				headingSlider,
				relatedContents,
				magazine,
				next,
				pre,
				loaded: true,
			})

			window.scrollTo(0, 0)
		} catch (e) {
			console.error('매거진 페쳐 에러', e);
		}
	}
}

export default MagazineDetailContainer
