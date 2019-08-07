import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData } from '../../../api/AppAPI'
import { StoreList } from '../components'



class StoreListContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			home: {},
			loaded: false
		}
	}

	async componentDidMount() {
		window.scrollTo(0, 0)
		
		try {
			const {
				user,
				data: {
					home
				}
			} = await fetchUserAndData()

			console.log('fetchUserAndData.data.home', home);

			this.props.appUtils.setUser(user)
			this.setState({ home, loaded: true })
		} catch (e) {
			console.error(e);
		}

	}

	render() {
		const { home, loaded } = this.state

		return loaded
			? <StoreList {...home} />
			: <div className="home-is-loading">
				<div className='uil-ring-css' ><div></div></div>
			  </div>
	}
}

export default StoreListContainer
