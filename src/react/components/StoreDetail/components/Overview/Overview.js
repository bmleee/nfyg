import React, { Component, PropTypes } from 'react';
import { fetchUserAndData, likeProjectProduct, fetchlike, Deletelike } from '~/src/react/api/AppAPI'
import { Link } from 'react-router';

import { getFullUrl } from '~/src/react/lib/utils'
import update from 'immutability-helper'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import Modal from '~/src/react/components/react-awesome-modal';
import SweetAlert from 'sweetalert-react';
import FontAwesome from 'react-fontawesome'

import MetaTags from 'react-meta-tags';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { value2label } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

import {
	StoreContact
} from './';

import ScrollToTop from 'react-scroll-up';
const scrollStyle = {
  cursor: 'pointer',
}

class Overview extends Component {
	constructor(props) {
		super(props)

		this.state = {
			abstract: {},
			storeInfo: {},
			items: [],
			recentItems: null,
			storeOverview: [],
			storeShippingCycle: {},
			// qna:{},
			
			loaded: false,
			
			copied: false,
			visible: false,
			show: false,
			like_user: {},
			like_store: [],
			
			like_show: false,
			like_show2: false,
			like_message: '',
			like_success: ''
		}
	}
	
	async componentDidMount() {
		window.scrollTo(0, 0)
		const res = await fetchUserAndData()

		const {
			user,
			data: {
				store
			}
		} = res
		
		await this._reflashLikes()

		this.props.appUtils.setUser(user)
		this.setState({
			...store,
			loaded: true,
		})
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
			like_show: { $set: false },
			like_show2: { $set: false }
		}))
	}
	
	  onCopy() {
		this.setState({
			visible : false,
			copied: true,
	    });
	  }
	
	like = async () => {
	    try {
	    	let r = await likeProjectProduct({
	    		like_state : 'like'
	    	})
	    	await this._reflashLikes()
	    	
	    	this.setState({
	        	like_success : '관심 예술상점으로 등록되었습니다!',
	        	like_show: true
	    	});
	    	
	    	new fbq('track', 'AddToWishlist', {
			    value: this.state.abstract.title + '[좋아요]'
			});
	    }
	    catch (e) {
	    	this.setState({
	        	like_message : '로그인 후 좋아요를 눌러주세요!',
	        	like_show2: true
	    	});
	    }
	  }
	  
	  unlike = (like_id) => {
	  	return async () => {
		    try {
				const r = await Deletelike(like_id)
				console.log('delete like response', r);
				await this._reflashLikes()
			} catch (e) {
				// console.error('delete like error', e);
				await this._reflashLikes()
			} finally {
	
			}
		}
	  }
	
	render() {
		let {
			abstract,
			storeInfo,
			items,
			recentItems,
			storeOverview,
			storeShippingCycle,
			like_user,
			like_store,
			like_show,
			like_show2,
			like_success,
			like_message
		} = this.state;
		
		let {
			isLoggedIn
		} = appUtils.getUser()
		
		let new_imgSrc = "https://netflix-salon.co.kr" + (abstract && abstract.main_img);
		
		let infoBackground = {
			backgroundImage: `url("${new_imgSrc}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		}
		
		let shippingStartBackground = (day) => ({
			backgroundColor : day == "월요일" ? 'rgba(238, 155, 17, 0.6)' : 
							  day == "화요일" ? 'rgba(227, 13, 64, 0.5)' :
							  day == "수요일" ? 'rgba(41, 22, 111, 0.55)' :
							  day == "목요일" ? 'rgba(0, 146, 63, 0.55)' :
							  day == "금요일" ? 'rgba(114, 28, 117, 0.6)' :
							  day == "매일" ? 'rgba(68, 68, 68, 0.6)' :
							  'transparent'
		})
		
		let like_store_length = like_store.length > 0 ? like_store.length : 0
		
		const url = 'https://netflix-salon.co.kr/store/' + abstract.storeLink;

		return (
			<div className="store-overview">
				
				<MetaTags>
		            <title>{abstract.title} - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
		        
		        <ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
		        
				<div className="store-overview-heading" style={infoBackground}>
					<div className="store-overview-heading-container">
						{	storeShippingCycle.shipping_array && storeShippingCycle.shipping_array.map(({
							}, index) => (
							<div className="store-overview-shippingStart" style={shippingStartBackground(storeShippingCycle.shipping_array[index])}>{storeShippingCycle.shipping_array[index]}</div>
							))
						}
						<div className="store-overview-title">{abstract.title}</div>
						<div className="store-overview-description">{abstract.description}</div>
						{ !like_user  ?
						<div className="store-overview-heading-like">
							<button className="store-overview-heading-like-button" onClick={() => this.like()}>{like_store_length}</button>
						</div>
						:
						<div className="store-overview-heading-like">
							<button className="store-overview-heading-unlike-button" onClick={this.unlike(like_user._id)}>{like_store_length}</button>
						</div>
						}
					</div>
				</div>
				
				
				
				<div className="store-overview-itemlist">
					<Tabs>
			          <TabList>
			            <Tab>스토리</Tab>
			            <Tab>제품
			            	{ !recentItems ? null : <div className="store-item-new">N</div> }
			            </Tab>
			          </TabList>
						
					  <TabPanel>
        					{	storeOverview && storeOverview.map(({
								text,
								img,
								img_link
								}, index) => (
									<div className="store-overview-list">
										{ !img ? null :
											!img_link ?
											<div className="store-overview-img-container">
												<img className="store-overview-img" src={img} />
											</div>
											:
											<a href={img_link} target="_blank">
												<div className="store-overview-img-container">
													<img className="store-overview-img" src={img} />
												</div>
											</a>
										}
										{ !text ? null :
										<div className="store-overview-list-text">
											{text}
										</div>
										}
									</div>
								))
							}
							<div className="store-overview-heading-sns">
								{ storeInfo.facebook == "" || !storeInfo.facebook ? null
								:
								<a href={storeInfo.facebook} target="_blank">
									<button className="store-overview-heading-facebook" />
								</a>
								}
								{ storeInfo.instagram == "" || !storeInfo.instagram ? null
								:
								<a href={storeInfo.instagram} target="_blank">
									<button className="store-overview-heading-instagram" />
								</a>
								}
								{ storeInfo.twitter == "" || !storeInfo.twitter ? null
								:
								<a href={storeInfo.twitter} target="_blank">
									<button className="store-overview-heading-twitter" />
								</a>
								}
							</div>
        				</TabPanel>	
			          <TabPanel>
						{	items.length > 0 && items.map(({
								name,
								description,
								itemLink,
								link= "/store/" + abstract.storeLink + "/item/" + itemLink,
								imgSrc,
								saleprice,
								price,
								sale= price - saleprice,
								temporary_outofstock,
								accept,
								created_at,
								isNew = (Date.now() - new Date(created_at).valueOf()) / 1000 / 60 / 60 / 24 < 10
								}, index) => (
								!accept ? null :
								<div className="store-overview-item">
									<div className="store-overview-item-container">
										<Link to={link}>
											<div className="store-overview-item-thumbnail">
												{ !isNew ? null : <div className="isNew-notice">NEW</div> }
												<div className="store-overview-item-centered">
													<img className="store-overview-item-image" src={imgSrc} />
												</div>
											</div>
										</Link>
										<div className="store-overview-item-info">
											<Link to={link}>
												<div className="store-overview-item-name">{name}</div>
											</Link>
											{
												saleprice == 0 || !saleprice ? 
												<div className="store-overview-item-price">{price.toLocaleString()}원</div>
												:
												<div className="store-overview-item-price">
													{saleprice.toLocaleString()}원
													<div>({sale.toLocaleString()}원 할인)</div>
												</div>
											}
										</div>
									</div>
								</div>
							))
						}
						</TabPanel>
   
        			</Tabs>
				</div>
				
				
				
				<div className="store-overview-storeinfo">
					{/* <div className="store-overview-storeinfo-container">
						<div className="store-overview-storeinfo-contact">
							제품 및 배송관련 문의처
							{ storeInfo.storeEmail && <div className="store-overview-storeinfo-contact-sub">E. {storeInfo.storeEmail}</div> }
							{ storeInfo.storeNumber && <div className="store-overview-storeinfo-contact-sub">T. {storeInfo.storeNumber}</div> }
						</div>
					</div> */}
					<div className="store-overview-storeinfo-container">
						<div className="store-overview-storeinfo-cancellation">
							{abstract.title} 교환 및 환불 규정
							<div className="store-overview-storeinfo-cancellation-sub">{abstract.cancellation}</div>
						</div>
					</div>
				</div>
				
				<StoreContact  {...this.props} />
				
				{ !isLoggedIn ? (
				<div className="store-purchase-button">
							<Link to={`/login`}><button className="product-purchase-button">구매하기</button></Link>
				<button className="product-share-modal" onClick={() => this.openModal()} />
				<Modal className="share-modal" visible={this.state.visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="share-modal-close-container">
					<button className="share-modal-close" onClick={() => this.closeModal()}/>
					</div>
					<div className="share-modal-button-container">
						
						<button className="ma-share-button-facebook" onClick={this.onClickShareFB}>
						<FontAwesome name='facebook' size='lg' />
						</button>

						<TwitterButton message={abstract.title} url={url} className="ma-share-button-twitter">
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
				</div>) 
				:
				(
				<div className="store-purchase-button">
							<Link to={`/store/${abstract.storeLink}/purchase`}><button className="product-purchase-button">구매하기</button></Link>
				<button className="product-share-modal" onClick={() => this.openModal()} />
				<Modal className="share-modal" visible={this.state.visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
					<div className="share-modal-close-container">
					<button className="share-modal-close" onClick={() => this.closeModal()}/>
					</div>
					<div className="share-modal-button-container">
						
						<button className="ma-share-button-facebook" onClick={this.onClickShareFB}>
						<FontAwesome name='facebook' size='lg' />
						</button>

						<TwitterButton message={abstract.title} url={url} className="ma-share-button-twitter">
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
				</div>)
				}
				
				<SweetAlert
		          show={like_show}
		          title=""
		          text={like_success}
		          onConfirm={this.closeModal}
		          confirmButtonText="확 인"
		        />
		        
		        <SweetAlert
		          show={like_show2}
		          title=""
		          text={like_message}
		          onConfirm={this.closeModal}
		          confirmButtonText="확 인"
		        />
				
			</div>
		)
	}
	
	
	onClickShareFB = async () => {
		let url = 'https://netflix-salon.co.kr/store/' + this.state.abstract.storeLink;
		 
		FB.ui({
			method: 'share',
			display: 'popup',
			href: url,
		},  async function(response) {
    	if (response && !response.error_message) {
	      try {
		      	
	      } catch (e) {
		      	
	      }
	    } 
	    else {
	    	
			}
		})
	}
	
	sendkakaolink() {
		const {
				abstract: {
					main_img,
					title,
					description,
					storeLink
				},
			} = this.props;
	
	
			const imgSrcUrl = `${window.location.protocol}//${window.location.host}${main_img}`
			const imgSrcUrl2 = encodeURI(imgSrcUrl)
			
			const url = 'https://netflix-salon.co.kr/store/' + this.state.abstract.storeLink;
		
		Kakao.Link.sendDefault({
		  // container : '#kakao-link-btn',
		  objectType: 'feed',
		  content: {
	        title: title,
	        description: description,
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
			data: { like_store, like_user }
		} = await fetchlike()

		this.setState({ like_store, like_user })
	}
	
}

export default Overview;
