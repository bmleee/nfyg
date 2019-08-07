import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import MetaTags from 'react-meta-tags';

import { fetchJSONFile, fetchUserAndData } from '../../api/AppAPI'

class Sponsors extends Component {

	state = {
		sponsors: []
	}

	async componentDidMount() {
		const {
			user,
			data: {
				sponsors
			}
		} = await fetchUserAndData()

		// appUtils.setUser(user)
		this.setState({ sponsors })
	}

	render() {
		const { sponsors } = this.state

		const sponsorList = sponsors.map(({
				sponsorName,
				displayName,
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
						<div className="sponsor-money-container">
							<p className="sponsor-money">
							{
								!!money && money > 0
									? `${money.toLocaleString()}원 후원`
									: `후원 예정`
							}
							</p>
						</div>
					</div>
					<div className="sponsor-description">
					<p className="sponsor-description-text">
						{description}
					</p>
					<div className="sponsor-icons">
						{
							!!homepage
								?	<a href={homepage} target="_blank">
										<FontAwesome className='sponsor-icon-homepage' name='home'
										 size='lg' />
								  </a>
							 	: null
						}
						{
							!!facebook
								? <a href={facebook} target="_blank">
										<FontAwesome className='sponsor-icon-facebook' name='facebook'
											size='lg' />
									</a>
								: null
						}
						{
							!!blog
								? <a href={blog} target="_blank">
										<FontAwesome className='sponsor-icon-blog' name='pencil'
										  size='lg'/>
									</a>
								: null
						}
					</div>
					</div>

				</div>
			))

		return (
			<div className="sponsor">
				<MetaTags>
		            <title>스폰서 - 7Pictures</title>
		        </MetaTags>
				<div className="sponsor-haeding">
					<h2>Sponsors</h2>
					{/* <p>지속적인 문화예술 활동을 가능하게 해주는 기업/단체</p> */}
				</div>
				<div className="sponsor-list-container">
					{ sponsorList }
				</div>
				<div className="home-empty-space">
						
				</div>
			</div>
		)
	}

}

export default Sponsors
