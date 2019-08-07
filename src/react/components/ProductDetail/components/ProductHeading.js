import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';

import update from 'immutability-helper'
import SweetAlert from 'sweetalert-react';

import Modal from '~/src/react/components/react-awesome-modal';
import FontAwesome from 'react-fontawesome'
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';

import { fetchProductSummary, fetchSummary, processPurchase, likeProjectProduct, Deletelike, fetchlike } from '~/src/react/api/AppAPI'

import { getFullUrl } from '~/src/react/lib/utils'
import { shareProject } from '../../../api/AppAPI'

import {
  Abstract,
  AuthorizedUsers,
  Funding,
  QnAs,
  PurchaseInfo,
} from '../../Summary/_Common'



class ProductHeading extends Component {
		state = {
			copied: false,
			visible: false,
			show: false,
			show2: false,
			product_summary: {
				abstract: null,
				authorizedUsers: null,
				funding: null,
				qnas: null,
				product_purchase_info: null,
			},
			product : [],
			like_error : '',
			like_success : ''
		}
		
	  like = async () => {
	    try {
	    	let r = await likeProjectProduct({
	    		like_state : 'like'
	    	})
	    	await this._reflashLikes()
	    	this.setState({
	        	like_error : '',
	        	like_success : '관심 프로젝트로 등록되었습니다!',
	        	show2: true
	    	});
	    	
	    	new fbq('track', 'AddToWishlist', {
			    value: this.props.abstract.shortTitle + '[좋아요]'
			});
	    }
	    catch (e) {
	    	this.setState({
	        	like_error : '로그인 후 좋아요를 눌러주세요!',
	        	like_success : '',
	        	show: true
	    	});
	    }
	  }
	  
	  unlike = (like_id) => {
	  	return async () => {
		    try {
				const r = await Deletelike(like_id)
				//console.log('delete like response', r);
				await this._reflashLikes()
			} catch (e) {
				//console.error('delete like error', e);
			} finally {

			}
		}
	  }

	  openModal() {
	    this.setState({
	        visible : true
	    });
	  }

	  closeModal = () => {
		this.setState(update(this.state, {
			visible: { $set: false },
			show: { $set: false },
			show2: { $set: false }
		}))
	}
	
	  onCopy() {
		this.setState({
			visible : false,
			copied: true,
	    });
	  }

	
	
	async componentDidMount() {
    	try {
    	  await this._reflashLikes()	
    		
	      const {
	        data: {
	          product_summary
	        }
	      } = await fetchProductSummary({ productName: this.props.abstract.productName })
	
	      this.setState({ product_summary })
	      
	      new fbq('track', 'ViewContent', {
			    value: this.props.abstract.shortTitle + '[view]'
		  });
	      
	    } catch (e) {
	      // console.error(e);
	    }
	    
	    	const {
				abstract: {
					imgSrc,
					shortTitle
				},
			} = this.props;
	
	
			const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
			const imgSrcUrl2 = encodeURI(imgSrcUrl)
			
			const url = document.URL;
			
			Kakao.init('0aad64ae5f685fcf0be27e3e654f8ef6');
	    
     }

	render() {
		// console.log('ProductHeading', this);
		
		let {
			canEdit,
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()
		
		// console.log('canEdit213', canEdit)
		
		const {
	      product_summary: {
		        abstract,
		        authorizedUsers,
		        funding,
		        qnas,
		        product_purchase_info,
		      },
	      product,
	      like_error,
	      like_success,
	      show,
	      show2
	    } = this.state 

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
				currentMoney_sub2,
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
			subValidPurchases,

		} = this.props;
		
		var dateToArray = new Array;
		dateToArray = dateTo.split("-")
		
		var dateFromArray = new Array;
		dateFromArray = dateFrom.split("-")
		
		dateToArray[1] = dateToArray[1].replace(/(^0+)/, "");
		dateFromArray[1] = dateFromArray[1].replace(/(^0+)/, "");
		dateToArray[2] = dateToArray[2].replace(/(^0+)/, "");
		dateFromArray[2] = dateFromArray[2].replace(/(^0+)/, "");
	
		const url = document.URL;
		
		const today = new Date();
		
		var DirectMoneySum = 0;
		 for(var idx in product_purchase_info && product_purchase_info.purchases){
			DirectMoneySum += Number(product_purchase_info && product_purchase_info.purchases[idx].purchase_info.amount);
		} 
		
		// console.log('DirectMoneySum', product_purchase_info && product_purchase_info.purchases);
		// console.log('currentMoney', currentMoney);
		
		let remainingDays = ((new Date(dateTo).getTime() + 86400000) - today.getTime() ) / 1000 / 60 / 60 / 24

		const sharingInfo = (recent3Users || []).map( (fbId, index) => (
			<img className="sharing-fb-icon" key={index} width={32} height={32} src={`https://graph.facebook.com/${fbId}/picture`} scale="0"/>
		) )

		let infoBackground = {
			backgroundImage: `url("${imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		
		
		let product_like_user = this.state.product.like
		let product_like_num = this.state.product.like_num


		/**
		 * Issue
		 * 	- 사진을 background image 혹은 img 태그로 삽입...
		 */
		return (
			<div className="project-detail-heading">
				<div className="project-detail-info" style={infoBackground}>
					<div className="product-info">
					{	Math.ceil(remainingDays) > 0 
						?
						<div className="project-sponsor-name"><p>{Math.ceil(remainingDays)}일</p> 남음</div>
						:
						/* <div className="project-sponsor-name"><p>{dateFromArray[0]}년 {dateFromArray[1]}월 {dateFromArray[2]}일 - {dateToArray[0]}년 {dateToArray[1]}월 {dateToArray[2]}일</p></div> */
						<div className="project-sponsor-name"><p>{dateToArray[0]}년 {dateToArray[1]}월 {dateToArray[2]}일 마감</p></div>
					}
						<h1 className="project-title">{longTitle}</h1>
						<div className="product-info-bottom">
						</div>
						<div className="project-heading-summary-money">
						{ (currentMoney_sub2 + DirectMoneySum) >= targetMoney ? <div className="prduct-success">주문성공!</div> : <div className="prduct-success-empty"></div> }
						</div>
						<Progress completed={Math.ceil((currentMoney_sub2 + DirectMoneySum) / targetMoney * 100)} />
						
						<div className="project-heading-summary-money">
						<div className="project-heading-summary-percent">{Math.ceil((currentMoney_sub2 + DirectMoneySum) / targetMoney * 100)}<span className="heading-summary-status">%</span></div>
						{	Math.ceil(remainingDays) > 0 
						?
						<div className="project-heading-summary-dday">{numValidPurchases + subValidPurchases}명 주문중</div>
						:
						<div className="project-heading-summary-dday">{numValidPurchases + subValidPurchases}명 주문함</div>
						}
						{((currentMoney_sub2 + DirectMoneySum) || 0).toLocaleString()}<span className="heading-summary-status">원</span>
						</div>
						
						{ !product_like_user  ?
						<div className="project-likes-container">
							<button className="project-likes-button" onClick={() => this.like()}>{product_like_num && product_like_num.length}명</button>
						</div>
						:
						<div className="project-likes-container">
							<button className="project-unlikes-button" onClick={this.unlike(product_like_user._id)}>{product_like_num && product_like_num.length}명</button>
						</div>
						}
						
						<SweetAlert
				          show={this.state.show}
				          title=""
				          text={like_error}
				          onConfirm={this.closeModal}
				          confirmButtonText="확 인"
				        />
				        
				        <SweetAlert
				          show={this.state.show2}
				          title=""
				          text={like_success}
				          onConfirm={this.closeModal}
				          confirmButtonText="확 인"
				        />

					</div>
				</div>
				{   Math.ceil(remainingDays) > 0 
				?	isLoggedIn && (
				<div className="share-button">
							<Link to={`/products/${productName}/purchase`}><button className="product-purchase-button">주문하기</button></Link>
				<button className="product-share-modal" onClick={() => this.openModal()} />
				<Modal className="share-modal" visible={this.state.visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="share-modal-close-container">
					<button className="share-modal-close" onClick={() => this.closeModal()}/>
					</div>
					<div className="share-modal-button-container">
						
						<button className="ma-share-button-facebook" onClick={this.onClickShareFB}>
						<FontAwesome name='facebook' size='lg' />
						</button>

						<TwitterButton message={shortTitle} url={url} className="ma-share-button-twitter">
						<FontAwesome name='twitter' size='lg' />
						</TwitterButton>

						<button id="kakao-link-btn" onClick={() => this.sendkakaolink()} className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>

						<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
						<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
						</CopyToClipboard>

					</div>
				</Modal>
				</div>
				)
				: <div className="share-button">
					<button className="end-date-share-modal" onClick={() => this.openModal()} />
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

						<button id="kakao-link-btn" onClick={() => this.sendkakaolink()} className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>

						<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
						<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
						</CopyToClipboard>

					</div>
					</Modal>
				  </div>
				}
				{   Math.ceil(remainingDays) > 0 
				?	!isLoggedIn && (
				<div className="share-button">
							<Link to={`/login`}><button className="product-purchase-button">주문하기</button></Link>
							
							
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

						<button id="kakao-link-btn" onClick={() => this.sendkakaolink()} className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>

						<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
						<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
						</CopyToClipboard>

					</div>
				</Modal>
				</div>
				)
				: <div className="share-button">
					<button className="end-date-share-modal" onClick={() => this.openModal()} />
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
						
						
						<button id="kakao-link-btn" onClick={() => this.sendkakaolink()} className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>

						<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
						<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
						</CopyToClipboard>

					</div>
					</Modal>
				  </div>
				}
			</div>

			)
	}
	
	onClickShareFB = async () => {
		const productName = this.props.abstract.productName
		let url = getFullUrl()
		 
		FB.ui({
			method: 'share',
			display: 'popup',
			href: url,
		},  async function(response) {
    	if (response && !response.error_message) {
	      try {
	      	const r = await shareProject(productName, url)
	      	// console.log('shareProject result', r)
	      } catch (e) {
	      	// console.error(e)
	      }
	    } else {
	    	
			}
		})
	}
	
	sendkakaolink() {
		const {
				abstract: {
					imgSrc,
					shortTitle,
					postIntro
				},
			} = this.props;
	
	
			const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
			const imgSrcUrl2 = encodeURI(imgSrcUrl)
			
			const url = document.URL;
		
		Kakao.Link.sendDefault({
		  // container : '#kakao-link-btn',
		  objectType: 'feed',
		  content: {
	        title: shortTitle,
	        description: postIntro,
	        imageUrl: imgSrcUrl2,
	        link: {
	          mobileWebUrl: url,
	          webUrl: url
	        }
	      },
	      buttons: [
	        {
	          title: '자세히 보기',
	          link: {
	            mobileWebUrl: url,
	            webUrl: url
	          }
	        }
		  ]
		});
	}
	
	_reflashLikes = async () => {
		const {
			data: { product }
		} = await fetchlike()

		this.setState({ product })
	}
	
}

export default ProductHeading;
