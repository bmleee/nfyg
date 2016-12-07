import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import { fetchJSONFile } from '../../api/AppAPI'

class Sponsors extends Component {

	state = {
		sponsors: []
	}

	async componentDidMount() {
		const sponsors = await fetchJSONFile('sponsors')

		this.setState({
			sponsors
		})
	}

	render() {
		const { sponsors } = this.state

		const sponsorList = sponsors.map(({
				sponsorName,
				description,
				imgSrc,
				logoSrc,
				money,
				contacts: { homepage, facebook, blog }
			}) => (
				<div className="sponsor-list-item">
					<div className="sponsor-thumbnail">
					<div className="sponsor-centered">
					<img className="sponsor-logo-image" src={imgSrc} alt=""/>
					</div>
					</div>
					{/* <div>
						<span>{sponsorName}</span>
						<span>
							{
								!!money && money > 0
									? `${money.toLocaleString()}원 후원`
									: `후원 예정`
							}
						</span>
					</div> */}
					<div className="sponsor-description">
					<p className="sponsor-description-text">
						{description}
					</p>
					</div>
					{/* https://www.npmjs.com/package/react-fontawesome 
					<div className="sponsor-icons">
						{
							!!homepage
								?	<a href={homepage}>
										<FontAwesome className='sponsor-icon-homepage' name='home'
										 size='lg' />
								  </a>
							 	: null
						}
						{
							!!facebook
								? <a href={facebook}>
										<FontAwesome className='sponsor-icon-facebook' name='facebook'
											size='lg' />
									</a>
								: null
						}
						{
							!!blog
								? <a href={blog}>
										<FontAwesome className='sponsor-icon-blog' name='pencil'
										  size='lg'/>
									</a>
								: null
						}
					</div>  */}

				</div>
			))

		return (
			<div className="sponsor">
				<div className="sponsor-haeding">
					<h2>Sponsors</h2>
					{/* <p>지속적인 문화예술 활동을 가능하게 해주는 기업/단체</p> */}
				</div>
				<div className="sponsor-list-container">
					{ sponsorList }
				</div>
			</div>
		)
	}

}

export default Sponsors
