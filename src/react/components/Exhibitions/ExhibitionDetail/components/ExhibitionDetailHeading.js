import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome'

import KakaoImage from '~/src/assets/images/kakaotalk.svg'

class ExhibitionDetailHeading extends Component {

	render() {
		const {
			imgSrc,
			logoSrc,
			title,
			remainingDays,
			recent3Users,
			numSupporters,
			location,
			schedule,
		} = this.props;

		const sharingInfo = recent3Users.map( (fbId, index) => (
			<img className="sharing-fb-icon" key={index} width={32} height={32} src={`https://graph.facebook.com/${fbId}/picture`} scale="0"/>
		) )

		let infoBackground = {
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		
		/**
		 * Issue
		 * 	- 사진을 background image 혹은 img 태그로 삽입...
		 */
		return (
			<div className="exhibition-detail-heading">

				<div className="exhibition-detail-info" style={infoBackground}>
					<div className="exhibition-info">
						<h1 className="exhibition-title">{title}</h1>
							<h4 className="project-location">
								{schedule} @{location}
							</h4>
					</div>
				</div>
				
				 <div className="share-button">
					<button className="share-button-facebook"><FontAwesome name='facebook' size='lg' /></button>
					<button className="share-button-twitter"><FontAwesome name='twitter' size='lg' /></button>
					<button className="share-button-kakao"><KakaoImage className="kakao-icon" width={28} height={28} /></button>
					<button className="share-button-url"><FontAwesome name='link' size='lg' /></button>
				</div> 
				
			</div>
			)
	}

}

ExhibitionDetailHeading.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	logoSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	remainingDays: PropTypes.number.isRequired,
	recent3Users: PropTypes.arrayOf(PropTypes.any).isRequired,
	numSupporters: PropTypes.number.isRequired,
	location: PropTypes.string.isRequired,
	schedule: PropTypes.string.isRequired,
}

export default ExhibitionDetailHeading;
