import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Slider from 'react-slick';

const sliderSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 2,
	initialSlide: 0,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		}
	}, {
		breakpoint: 991,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			speed: 250
		}
	}],
};



class ProjectReward extends Component {

	render() {
		// console.log(this)
		let {
			rewards,
			projectName,
		} = this.props;
		
		

		// console.log('ProjectReward.rewards', rewards);
		
		let {
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()

		const items = rewards.map( ({title, thresholdMoney, description, imgSrc = '/assets/images/slider-tumb2.jpg', maxPurchaseVolume}, index) => {
			title = title.split('\n').map((t, index) => (<span key={index}>{t}<br/></span>));

			return (
				<div key={index} className="reward-list-item">
					<div className="reward-thumbnail">
						<div className="ex-centered">
							<img className="home-exhibition-image" src={imgSrc} />
						</div>
					</div>
					<div className="project-detail-reward-title">
						<p className="purchase-reward-title">{description}</p>
						<p className="purchase-reward-description">{thresholdMoney.toLocaleString()}원</p>
					</div>
				</div>
			)
		})

		return (
			rewards.length === 0 
			?
			<div></div>
			:
			<div className="project-detail-reward">
				<Slider {...sliderSettings} >
				{ items }
				</Slider>
				{
							isLoggedIn && (
				<Link to={`/projects/${projectName}/purchase`}>
					<button className="move-purchase-page">리워드 구매로 후원하기</button>
				</Link>
						)
				}
				{
							!isLoggedIn && (
				<Link to={`/login`}>
					<button className="move-purchase-page">리워드 구매로 후원하기</button>
				</Link>
						)
				}
			</div>
			
			
		)
	}

}

export default ProjectReward;
