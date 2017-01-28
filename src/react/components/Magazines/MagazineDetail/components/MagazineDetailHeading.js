import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome'

import KakaoImage from '~/src/assets/images/kakaotalk.svg'

const border = { border: '1px solid gray' }

class MagazineDetailHeading extends Component {
	render() {
		const { title, creator, imgSrc, category, descriptions, contents } = this.props;

		return (
			<div className="magazine-detail-heading">
				{/* <img src={imgSrc} alt=""/> */}
				<h2> {title} </h2>
				<div className="magazine-share-button-container">
					<button className="ma-share-button-facebook"><FontAwesome name='facebook' size='lg' /></button>
					<button className="ma-share-button-twitter"><FontAwesome name='twitter' size='lg' /></button>
					<button className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={23} height={23} /></button>
					<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
				</div>
			</div>
		)
	}
}

export default MagazineDetailHeading;
