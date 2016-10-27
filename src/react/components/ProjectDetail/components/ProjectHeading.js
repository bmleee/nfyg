import React, { Component, PropTypes } from 'react';

class ProjectHeading extends Component {

	render() {
		const {
			imgSrc,
			logoSrc,
			title,
			remainingDays,
			likes,
			shares,
			comments,
			numIndirectSupports,
			numDirectSupports,
			recent3Users,
			currentMoney,
			targetMoney
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
			<div className="project-detail-heading">

				<div className="project-detail-info" style={infoBackground}>
					<div className="project-info">
						<div className="project-sponsor-logo">
							<img src={logoSrc} alt=""/>
							D-{remainingDays}
						</div>
						<h1 className="project-title">{title}</h1>
						<div className="project-info-bottom"><p>
							<div className="project-sharing-icon">
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
								{ likes }
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
								{ comments }
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
								{ shares }
							</div>
							<div className="project-sharing-info">
								{sharingInfo} 외 {numIndirectSupports}명이 공유로 후원함
							</div>
							<div className="project-current-money">
							{currentMoney}원 후원 중 :: {currentMoney / targetMoney}%
							</div></p>
						</div>
					</div>
				</div>
				<button className="share-button">공유로 예술 후원</button>
			</div>
			)
	}

}

ProjectHeading.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	logoSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	remainingDays: PropTypes.number.isRequired,
	likes: PropTypes.number.isRequired,
	shares: PropTypes.number.isRequired,
	comments: PropTypes.number.isRequired,
	numIndirectSupports: PropTypes.number.isRequired,
	numDirectSupports: PropTypes.number.isRequired,
	recent3Users: PropTypes.arrayOf(PropTypes.any).isRequired,
	currentMoney: PropTypes.number.isRequired,
	targetMoney: PropTypes.number.isRequired,
}

export default ProjectHeading;
