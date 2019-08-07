import React, { Component, PropTypes } from 'react'
import { fetchJSONFile, fetchUserAndData, fetchUserAndDateCount } from '../../../api/AppAPI'
import { Homebadge } from '../components'



class HomeContainerbadge extends Component {
	constructor(props) {
		super(props)

		this.state = {
			home: {},
			loaded: false,
			count: 18,
			windowSize: 12
		}
	}
	
	expandList() {
		this.state.count = this.state.count + this.state.windowSize
		
		this.componentDidMount()
		
	}
	
	async componentDidMount() {

		try {
			const {
				user,
				data: {
					home
				}
			} = await fetchUserAndDateCount(this.state.count)

			this.props.appUtils.setUser(user)
			this.setState({ home, loaded: true })
		} catch (e) {
			console.error(e);
		}

	}

	render() {
		const { home, loaded } = this.state

		return loaded
			? 
			<div>	
				<Homebadge {...home} />
				{ home.products && this.state.count > home.products.length 
					? <div className="home-empty-space"></div> : <div className="present-more-button-container"><button className="present-more-button" onClick={this.expandList.bind(this)}></button></div>
				}
			</div>
			: <div className="home-is-loading">
				<div></div>
			  </div>
	}
}

export default HomeContainerbadge
