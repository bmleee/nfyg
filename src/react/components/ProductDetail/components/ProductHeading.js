import React, { Component, PropTypes } from 'react';
import Progress from 'react-progressbar';

import Modal from '~/src/react/components/react-awesome-modal';
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
						<div className="project-sponsor-name"><p>00일</p> 남음</div>
						<h1 className="project-title">{longTitle}</h1>
						<div className="product-info-bottom">
						</div>
						<div className="project-heading-summary-money">
						<div className="prduct-min-num">최소 수량</div>
						<div className="prduct-max-num">최대 수량</div>
						<div className="prduct-success">주문성공!</div>
						</div>
						<Progress completed={Math.round(currentMoney / targetMoney * 100)} />
						<div className="project-heading-summary-money">
						<div className="project-heading-summary-percent">00개</div>
						<div className="project-heading-summary-dday">000개</div>
						000명 주문중</div>

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
