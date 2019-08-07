import React, { Component, PropTypes } from 'react';
import { fetchUserAndData } from '~/src/react/api/AppAPI'
import { Link } from 'react-router';

import { getFullUrl } from '~/src/react/lib/utils'
import update from 'immutability-helper'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import Modal from '~/src/react/components/react-awesome-modal';

import FontAwesome from 'react-fontawesome'

import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';
const scrollStyle = {
  cursor: 'pointer',
}

class Items extends Component {

	state = {
		abstract: {},
		storeInfo: {},
		items: [],
		// qna:{},
		
		loaded: false,
		itemLink: '',
		
		copied: false,
		visible: false,
		show: false
	}
	
	async componentDidMount() {
		window.scrollTo(0, 0)
		const res = await fetchUserAndData()

		const {
			user,
			data: {
				store,
				itemLink
			}
		} = res

		this.props.appUtils.setUser(user)
		this.setState({
			...store,
			loaded: true,
			itemLink
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
		}))
	}
	
	  onCopy() {
		this.setState({
			visible : false,
			copied: true,
	    });
	  }
	
	render() {
		let {
			abstract,
			storeInfo,
			items,
			qnas,
			itemLink
		} = this.state;
		
		let {
			isLoggedIn
		} = appUtils.getUser()
		
		let Link_item = {
			overview: {
				html: '',
				raw: ''
			}
		};
		let Other_items = [];
		for(var i in items) {
			if(itemLink == items[i].itemLink) {
				Link_item = items[i]
			}
			else {
				Other_items.push(items[i])
			}
		}
		
		const store_url = 'https://netflix-salon.co.kr/store/' + abstract.storeLink;
		const url = 'https://netflix-salon.co.kr/store/' + abstract.storeLink + '/item/' + itemLink;
		
		let real_overview = Link_item.overview_new ? Link_item.overview_new : Link_item.overview.html
		
		real_overview = real_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		real_overview = real_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		real_overview = real_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		real_overview = real_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		real_overview = real_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		real_overview = real_overview.replace("allowFullScreen />", "allowFullScreen></iframe>")
		real_overview = real_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		real_overview = real_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		real_overview = real_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		real_overview = real_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		real_overview = real_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)
		real_overview = real_overview.replace(`<img src="../uploads/`, `<img src="/uploads/`)

		return (
			<div className="store-item-detail">
				<MetaTags>
		            <title>{Link_item.name} - {abstract.title}</title>
		        </MetaTags>
		        
		        <ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
			
				<div className="store-item-detail-heading">
					<div className="store-item-detail-heading-section1">
						<div className="store-item-detail-thumbnail">
							<div className="store-item-detail-centered">
								<img className="store-item-detail-image" src={Link_item.imgSrc} />
							</div>
						</div>
					</div>
					<div className="store-item-detail-heading-section2">
						<div className="store-item-detail-name">
							{Link_item.name}
							{ !!Link_item.temporary_outofstock ? <div className="store-item-temporary-outofstock">일시품절</div> : null }
						</div>
						<div className="store-item-detail-title-sub">판매가</div>
						{
							Link_item.saleprice == 0 || !Link_item.saleprice ?
							<div className="store-item-detail-info">{(Link_item.price || 0).toLocaleString()}원</div>
							:
							<div className="store-item-detail-info">(할인){(Link_item.saleprice || 0).toLocaleString()}원</div>
						}
						<div className="store-item-detail-title-sub">옵 션</div>
						<div className="store-item-detail-info">{Link_item.description}</div>
						{ Link_item.size == "" || !Link_item.size ? null : <div className="store-item-detail-title-sub">사이즈</div> }
						{ Link_item.size == "" || !Link_item.size ? null : <div className="store-item-detail-info">{Link_item.size}</div> }
						{ Link_item.madein == "" || !Link_item.madein ? null : <div className="store-item-detail-title-sub">제조국</div> }
						{ Link_item.madein == "" || !Link_item.madein ? null : <div className="store-item-detail-info">{Link_item.madein}</div> }
					</div>
				</div>
				<div className="store-item-detail-body">
					<div className="store-item-detail-body-title">
						<h3>제품 소개</h3>
					</div>
					<div className="store-item-detail-html">
						<div dangerouslySetInnerHTML={{ __html: real_overview}}></div>
					</div>
				</div>
				
				<div className="store-item-detail-bottom">
					<div className="store-item-detail-bottom-title">
						<div><Link to={store_url}>{abstract.title}</Link>의 다른 제품들</div>
					</div>
					
					<div className="store-item-detail-bottom-itemlist">
						{	
							Other_items.map(({
								name,
								description,
								itemLink,
								link= "/store/" + abstract.storeLink + "/item/" + itemLink,
								imgSrc,
								price,
								}, index) => (
								<div className="store-item-detail-bottom-item">
									<div className="store-overview-item-container">
										<a href={link}>
											<div className="store-overview-item-thumbnail">
												<div className="store-overview-item-centered">
													<img className="store-overview-item-image" src={imgSrc} />
												</div>
											</div>
										</a>
										<div className="store-overview-item-info">
											<a href={link}>
												<div className="store-overview-item-name">{name}</div>
											</a>
											<div className="store-overview-item-price">{price.toLocaleString()}원</div>
										</div>
									</div>
								</div>
							))
						}
					</div>
					
				</div>
				
				{ !isLoggedIn ? (
				<div className="store-purchase-button2">
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
				<div className="store-purchase-button2">
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
				
				
			</div>
		)
	}
	
	onClickShareFB = async () => {
		let url = 'https://netflix-salon.co.kr/store/' + this.state.abstract.storeLink + '/item/' + this.state.itemLink;
		 
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
		let {
			abstract,
			storeInfo,
			items,
			qnas,
			itemLink
		} = this.state;
		
		let Link_item = {
			overview: {
				html: '',
				raw: ''
			}
		};
		
		let Other_items = [];
		for(var i in items) {
			if(itemLink == items[i].itemLink) {
				Link_item = items[i]
			}
			else {
				Other_items.push(items[i])
			}
		}
	
		const imgSrcUrl = `${window.location.protocol}//${window.location.host}${Link_item.imgSrc}`
		const imgSrcUrl2 = encodeURI(imgSrcUrl)
		
		const url = 'https://netflix-salon.co.kr/store/' + abstract.storeLink + '/item/' + itemLink;
		
		Kakao.Link.sendDefault({
		  // container : '#kakao-link-btn',
		  objectType: 'feed',
		  content: {
	        title: Link_item.name,
	        description: Link_item.name,
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
	
}

export default Items;
