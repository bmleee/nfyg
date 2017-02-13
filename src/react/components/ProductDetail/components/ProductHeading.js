import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';

import Modal from '~/src/react/components/react-awesome-modal';
import FontAwesome from 'react-fontawesome'
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';

import { getFullUrl } from '~/src/react/lib/utils'
import { shareProject } from '../../../api/AppAPI'



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
		const imgSrcUrl2 = encodeURI(imgSrcUrl)
		
		const url = document.URL;
		

		console.log(imgSrcUrl)
		console.log(imgSrcUrl2)
		

		Kakao.init('0aad64ae5f685fcf0be27e3e654f8ef6');

		Kakao.Link.createTalkLinkButton({
		  container : '#kakao-link-btn',
		  label : shortTitle,
		  image : {
		    src : imgSrcUrl2,
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
		
		let {
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()

		const {
			abstract: {
				longTitle,
				shortTitle,
				imgSrc,
				category,
				productName,
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
				maxPurchaseVolume,
				minPurchaseVolume,
			},

			summary: {
				likes,
				shares,
				comments,
				recent3Users,
			},

			directSupporters,
			indirectSupporters,

			purchaseSuccess,
			numValidPurchases,

		} = this.props;

		const url = document.URL;
		
		const today = new Date();
		
		let remainingDays = ( new Date(dateTo).getTime() - today.getTime() ) / 1000 / 60 / 60 / 24

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
						<div className="project-sponsor-name"><p>{Math.ceil(remainingDays)}일</p> 남음</div>
						<h1 className="project-title">{longTitle}</h1>
						<div className="product-info-bottom">
						</div>
						<div className="project-heading-summary-money">
						<div className="prduct-min-num">최소 수량</div>
						<div className="prduct-max-num">최대 수량</div>
						{ numValidPurchases >= minPurchaseVolume && <div className="prduct-success">주문성공!</div> }
						</div>
						<Progress completed={Math.ceil(numValidPurchases / minPurchaseVolume * 100)} />
						<div className="project-heading-summary-money">
						<div className="project-heading-summary-percent">{minPurchaseVolume}개</div>
						<div className="project-heading-summary-dday">{maxPurchaseVolume}개</div>
						{numValidPurchases}명 주문중</div>

					</div>
				</div>
				<div className="share-button">
					{
							isLoggedIn && (
					<Link to={`/products/${productName}/purchase`}><button className="product-purchase-button">주문하기</button></Link>
							)
					}
					{
							!isLoggedIn && (
					<Link to={`/login`}><button className="product-purchase-button">주문하기</button></Link>
							)
					}
				<button className="product-share-modal" onClick={() => this.openModal()} />
				<Modal className="share-modal" visible={this.state.visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="share-modal-close-container">
					<button className="share-modal-close" onClick={() => this.closeModal()}/>
					</div>
					<div className="share-modal-button-container">
						
						{/*
						<FacebookButton sharer='true' media={`http://52.78.133.247:8080${imgSrc}`} appId='244902342546199' message={shortTitle} url={url} className="ma-share-button-facebook">
						<FontAwesome name='facebook' size='lg' />
						</FacebookButton>
						*/}
						
						<button className="ma-share-button-facebook" onClick={this.onClickShareFB}>
						<FontAwesome name='facebook' size='lg' />
						</button>

						<TwitterButton message={shortTitle} url={url} className="ma-share-button-twitter">
						<FontAwesome name='twitter' size='lg' />
						</TwitterButton>

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
	
	onClickShareFB = async () => {
		const productName = this.props.abstract.productName
		// let share_url = window.location.host + window.location.pathname
		// let share_url = '7pictures.co.kr/campaigns/m-art/'
		// let url = format({ host: FB_SHARER_URL, query: {u: share_url} })
		//
		// window.open(url, '_blank', 'width=500, height=300')


		 let url = getFullUrl()
		// let url2 = 'http://7pictures.co.kr'

		// console.log('url', url2);

		FB.ui({
			method: 'share',
			display: 'popup',
			href: url,
		},  async function(response) {
    	if (response && !response.error_message) {
	      try {
	      	const r = await shareProject(productName, url)
	      	console.log('shareProject result', r)
	      } catch (e) {
	      	console.error(e)
	      }
	    } else {
	    	
			}
		})
	}
	
}

export default ProductHeading;
