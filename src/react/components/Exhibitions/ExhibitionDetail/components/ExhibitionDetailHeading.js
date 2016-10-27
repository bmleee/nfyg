import React, { Component, PropTypes } from 'react';

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
					<div className="project-info">
						<div className="project-sponsor-logo">
							<img src={logoSrc} alt=""/>
							D-{remainingDays}
						</div>
						<h1 className="project-title">{title}</h1>
						<div className="project-info-bottom">
							<div className="project-sharing-info">
								{sharingInfo} 외 {numSupporters - sharingInfo.length}명과 함께하는 중
							</div>
							<div className="project-location">
								{location} / {schedule}
							</div>
						</div>
					</div>
				</div>
				
				{/* <div className="exhibition-share-button-cover">
					<button className="share-button">초대장 발송하기</button>
				</div> */}
				
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
