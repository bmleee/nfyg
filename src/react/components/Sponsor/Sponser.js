import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import { fetchJSONFile } from '../../api/AppAPI'

class Sponser extends Component {

	state = {
		sponsers: []
	}

	async componentDidMount() {
		const sponsers = await fetchJSONFile('sponsers')

		console.log(sponsers)

		this.setState({
			sponsers
		})
	}

	render() {
		const { sponsers } = this.state

		const sponserList = sponsers.map(({
				sponserName,
				description,
				imgSrc,
				logoSrc,
				money,
				contacts: { homepage, facebook, blog }
			}) => (
				<div className="sponser-list-item">
					<img src={imgSrc} alt=""/>

					<div>
						<span>{sponserName}</span>
						<span>
							{
								!!money && money > 0
									? `${money.toLocaleString()}원 후원`
									: `후원 예정`
							}
						</span>
					</div>

					<p>
						{description}
					</p>

					{/* https://www.npmjs.com/package/react-fontawesome */}
					<div className="sponser-icons">
						{
							!!homepage
								?	<a href={homepage}>
										<FontAwesome className='sponser-icon-homepage' name='home'
										 size='lg' />
								  </a>
							 	: null
						}
						{
							!!facebook
								? <a href={facebook}>
										<FontAwesome className='sponser-icon-facebook' name='facebook'
											size='lg' />
									</a>
								: null
						}
						{
							!!blog
								? <a href={blog}>
										<FontAwesome className='sponser-icon-blog' name='pencil'
										  size='lg'/>
									</a>
								: null
						}
					</div>

				</div>
			))

		console.log(sponserList);

		return (
			<div className="sponser">
				<div className="sponser-haeding">
					<h2>예술 후원 기업</h2>
					<p>지속적인 문화예술 활동을 가능하게 해주는 기업/단체</p>
				</div>

				<div className="sponser-list-container">
					{ sponserList }
				</div>
			</div>
		)
	}

}

export default Sponser
