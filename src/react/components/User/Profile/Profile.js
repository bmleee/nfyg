import React, { Component, PropTypes } from 'react'
import { fetchJSONFile } from '../../../api/AppAPI'

class Profile extends Component {

	state = {
		profile: false
	}

	async componentDidMount() {
		const profile = await fetchJSONFile('profile')
		this.setState({	profile	})
	}

	render() {
		const { profile } = this.state

		const { display_name, email, photoURL, role, likes, shares, comments, indirect_supports, direct_supports } = profile

		const info = profile && (
			<div className="profile-info-container">
				<img src={photoURL} alt=""/>
				<h4>{display_name}</h4>
				<h5>{role}</h5>

				<h5>총간접후원내역</h5>
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
				{ likes }
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
				{ comments }
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
				{ shares }
			</div>
		)

		const indirectSupports = indirect_supports && indirect_supports.map( ({
			project_name, display_name, photoURL, likes, shares, comments
		}) => (
			<div className="profile-indirect-supports-item">
				<img src={photoURL} alt=""/>
				<h4>{display_name}</h4>
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
				{ likes }
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
				{ comments }
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
				{ shares }
			</div>
		))

		const directSupports = direct_supports && direct_supports.map( ({
			project_name, display_name, photoURL, money
		}) => (
			<div className="profile-direct-supports-item">
				<img src={photoURL} alt=""/>
				<h4>{display_name}</h4>
				<span>{ money.toLocaleString() }원</span>
			</div>
		) )

		if(!profile)
			return <div>Profile is loading..</div>
		else
			return (
				<div className="profile">
					{info}

					<h3>간접후원내역</h3>
					<div className="profile-indirect-supports-container">
						{indirectSupports}
					</div>

					<h3>직접후원내역</h3>
					<div className="profile-direct-supports-container">
						{directSupports}
					</div>

				</div>
			)
	}
}

export default Profile
