import React, { Component, PropTypes } from 'react';
import Progress from 'react-progressbar';

import Modal from 'react-awesome-modal';
import FontAwesome from 'react-fontawesome'
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

class ProductHeading extends Component {
	
	constructor(props) {
    super(props);
    this.state = {
        visible : false
    }
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }

	render() {
		console.log('ProductHeading', this);
		const {
			abstract: {
				longTitle,
				shortTitle,
				imgSrc,
				category,
			},

			creator: {
				creatorName,
				creatorImgSrc,
			},

			sponsor: {
				sponsorDisplayName,
				sponsorLogoSrc,
			},

			funding: {
				currentMoney,
				targetMoney,
				dateFrom,
				dateTo,
			},

			summary: {
				likes,
				shares,
				comments,
				recent3Users,
			},

			directSupporters,
			indirectSupporters,

		} = this.props;


		let remainingDays = ( new Date(dateTo).getTime() - new Date(dateFrom).getTime() ) / 1000 / 60 / 60 / 24

		const sharingInfo = (recent3Users || []).map( (fbId, index) => (
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
					<div className="product-info">
						{/* <div className="project-sponsor-name">
							 <img src={sponsorLogoSrc} width={32} height={32} alt=""/>  
							{sponsorDisplayName}
						</div> */}
						<h1 className="project-title">{longTitle}</h1>
						<div className="product-info-bottom">
							{/* <div className="project-sharing-icon">
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
								{ likes }
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
								{ comments }
								<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
								{ shares }
							</div>
							<div className="project-sharing-info">
								{sharingInfo} 외 {numIndirectSupports}명이 공유로 후원함
							</div> */}
							<p>
								<div className="project-current-money">
								</div>
							</p>
						</div>
						<div className="project-supporters-num">공유후원 {indirectSupporters.length}명 | 리워드후원 {directSupporters.length}명</div>
						<Progress completed={Math.round(currentMoney / targetMoney * 100)} />
						<div className="project-heading-summary-money">
						<div className="project-heading-summary-percent">{Math.round(currentMoney / targetMoney * 100)}<span className="heading-summary-status">%</span></div>
						<div className="project-heading-summary-dday">D-{remainingDays}<span className="heading-summary-status"></span></div>
						{currentMoney.toLocaleString()}<span className="heading-summary-status">원</span></div>
					</div>
				</div>
				<div className="share-button">
				<button className="product-purchase-button">주문하기</button>
				<button className="product-share-modal" onClick={() => this.openModal()} />
				<Modal className="share-modal" visible={this.state.visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="share-modal-close-container">
					<button className="share-modal-close" onClick={() => this.closeModal()}/>
					</div>
					<div className="share-modal-button-container">
					<button className="ma-share-button-facebook"><FontAwesome name='facebook' size='lg' /></button>
					<button className="ma-share-button-twitter"><FontAwesome name='twitter' size='lg' /></button>
					<button className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>
					<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
					</div>
				</Modal>
				</div>
			</div>

			)
	}

}

export default ProductHeading;
