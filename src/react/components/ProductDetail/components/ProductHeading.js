import React, { Component, PropTypes } from 'react';
import Progress from 'react-progressbar';

import Modal from '~/src/react/components/react-awesome-modal';
import FontAwesome from 'react-fontawesome'
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import { TwitterButton } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';




class ProductHeading extends Component {
		state = {
			copied: false,
			visible: false,
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
	  
	  onCopy() {
		this.setState({
			visible : false,
			copied: true,
	    });
	  }
	  
	componentDidMount() {
		const {
			abstract: {
				imgSrc,
				shortTitle
			},
		} = this.props;
		

		const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
		const url = document.URL;
		
		console.log(imgSrcUrl)
		
		Kakao.init('0aad64ae5f685fcf0be27e3e654f8ef6');

		Kakao.Link.createTalkLinkButton({
		  container : '#kakao-link-btn',
		  label : shortTitle,
		  image : {
		    src :imgSrcUrl,
		    width : '300',
		    height : '200',
		  },
		  webButton: {
		    text: '7Pictures',
		    url: url
		  }
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
		
		const url = document.URL;
		
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
						
						<TwitterButton message={shortTitle} url={url} className="ma-share-button-twitter"><FontAwesome name='twitter' size='lg' /></TwitterButton>
						
						<button id="kakao-link-btn" className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>

						<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
						<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
						</CopyToClipboard>
					
					</div>
				</Modal>
				</div>
			</div>

			)
	}

}

export default ProductHeading;
