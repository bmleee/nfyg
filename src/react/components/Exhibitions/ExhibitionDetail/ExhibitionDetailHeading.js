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
			<img key={index} width={26} height={26} src={`https://graph.facebook.com/${fbId}/picture`} scale="0"/>
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
					<div>
						<img src={logoSrc} alt=""/>
						D-{remainingDays}
					</div>
					<h4>{title}</h4>
					<div>
						{sharingInfo} 외 {numSupporters - sharingInfo.length}명과 함께하는 중
					</div>
					<div>
						{location} / {schedule}
					</div>
					<button>초대장 발송하기(공유하기)</button>
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
