import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Progress from 'react-progressbar';
import MetaTags from 'react-meta-tags';

import ScrollToTop from 'react-scroll-up';

import {
	PresentProductList
} from './';

import { literature2_Stores } from './HomeStoresAndItems'

import Modal from '~/src/react/components/react-awesome-modal';
import FontAwesome from 'react-fontawesome'
import KakaoImage from '~/src/assets/images/kakaotalk.svg'
import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';
import update from 'immutability-helper'

import { fetchUserAndData } from '../../../api/AppAPI'

const scrollStyle = {
  cursor: 'pointer',
}

class special_category extends Component {
	state = {
		user: '',
		home: {},
		share_visible: false,
		copied: false,
		stores_literature: []
	}
	
	async componentDidMount () {
        window.scrollTo(0, 0)
        
        const {
			user,
			data: {
				home
			}
		} = await fetchUserAndData()
		
		var currentIndex = home.products && home.products.length, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			var temporaryValue1 = home.products[currentIndex];
			home.products[currentIndex] = home.products[randomIndex];
			home.products[randomIndex] = temporaryValue1;
		}
		
		var currentIndex2 = 14, randomIndex2;
		while (0 !== currentIndex2) {
			randomIndex2 = Math.floor(Math.random() * currentIndex2);
			currentIndex2 -= 1;
			
			var temporaryValue2 = literature2_Stores[currentIndex2];
			literature2_Stores[currentIndex2] = literature2_Stores[randomIndex2];
			literature2_Stores[randomIndex2] = temporaryValue2;
		}
		
		this.props.appUtils.setUser(user)
		this.setState({ 
			home, 
			user,
			stores_literature : literature2_Stores
		})
    }
    
    openModal() {
	    this.setState({
	        share_visible : true
	    });
	  }
	  
	 closeshareModal = () => {
		this.setState(update(this.state, {
			share_visible: { $set: false }
		}))
	}
	
	onCopy() {
		this.setState({
			share_visible : false,
			copied: true,
	    });
	  }
	
	render() {
		const { home, stores_literature } = this.state
		
    	let { 
    		products,
    		products_end
    	} = home
    	
    	products = products && products.concat(products_end && products_end)
    	
    	let special_category_name 
    		= products && products[0].special_category == 'literature' 
    		? '문학굿즈' 
    		: products && products[0].special_category == 'calendar' 
    		? '일력달력전' 
    		: products && products[0].special_category == 'ancorebadge' 
    		? '앵콜뱃지전'
    		: products && products[0].special_category == 'fabricposter' 
    		? '천포스터전'
    		: products && products[0].special_category == 'phone-case' 
    		? '폰케이스전'
    		: products && products[0].special_category == 'literature2' 
    		? '문학굿즈전'
    		: null
    		
    		
    	let special_category_banner 
    		= products && products[0].special_category == 'literature' 
    		? "https://7pictures.co.kr/assets/images/literature_banner.jpg" 
    		: products && products[0].special_category == 'calendar' 
    		? "https://7pictures.co.kr/assets/images/calendar_long3.jpg"
    		: products && products[0].special_category == 'ancorebadge' 
    		? "https://7pictures.co.kr/assets/images/ancorebadge_banner2.jpg"
    		: products && products[0].special_category == 'fabricposter' 
    		? "https://7pictures.co.kr/assets/images/fabricposter_banner.jpg"
    		: products && products[0].special_category == 'phone-case' 
    		? "https://7pictures.co.kr/assets/images/phonecase_banner.jpg"
    		: products && products[0].special_category == 'literature2' 
    		? "https://7pictures.co.kr/uploads/6c36613503ef10a0fa7b433a69464ca5"
    		: null
    		
    		
    	let special_category_description 
    		= products && products[0].special_category == 'literature' 
    		? '마음을 울리는 한편의 문학작품을 예술/디자인으로 만나는 기획전입니다.' 
    		: products && products[0].special_category == 'calendar' 
    		? '다가오는 2018년을 준비하는 법, 나의 취향을 담은 디자인/일러스트 달력을 선보입니다.' + "\n" + '일력달력전에서 새로운 마음으로 새해를 준비하세요!'
    		: products && products[0].special_category == 'fabricposter' 
    		? '따스한 햇살이 반가운 봄, 천포스터가 주는 기분 좋은 설레임을 느껴보세요.'
    		: products && products[0].special_category == 'phone-case' 
    		? '항상 나와 함께하는 핸드폰, 매일 다른 폰케이스로 나만의 감성을 보여주어요.'
    		: products && products[0].special_category == 'literature2' 
    		? '마음을 울리는 한편의 문학작품을 예술/디자인으로 만나는 기획전입니다.'
    		: null
    	
    	let infoBackground = ({
			backgroundImage: `url(${special_category_banner})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		let HomeStoresBackground = (imgSrc) => ({
			backgroundImage: `url(${imgSrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat'
		})
		
		return (
			<div className="home">
				<MetaTags>
		            <title>{special_category_name} - 7Pictures | 세븐픽쳐스</title>
		        </MetaTags>
				
				<ScrollToTop showUnder={600} style={scrollStyle} duration={0} >
					<button className="back-to-top" />
				</ScrollToTop>
				
				<div className="sticker-head-container">
				    <div className="sticker-head" style={infoBackground}>
				    	{/*
				    	<div className="sticker-head-opacity">
							<button className="sticker-share-modal" onClick={() => this.openModal()} />
							<Modal className="share-modal" visible={this.state.share_visible} width="355" height="130px" effect="fadeInDown" onClickAway={() => this.closeshareModal()}>
								<div className="share-modal-close-container">
								<button className="share-modal-close" onClick={() => this.closeshareModal()}/>
								</div>
								<div className="share-modal-button-container">
									
									<FacebookButton sharer='true' media={special_category_banner} appId='244902342546199' message={special_category_name} url={special_category_link} className="ma-share-button-facebook">
										<FontAwesome name='facebook' size='lg' />
									</FacebookButton>
			
									<TwitterButton message={special_category_name} url={special_category_link} className="ma-share-button-twitter">
									<FontAwesome name='twitter' size='lg' />
									</TwitterButton>
			
									<button id="kakao-link-btn" className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={36} height={36} /></button>
			
									<CopyToClipboard text={special_category_link} onCopy={() => {
										this.setState({copied: true, share_visible:false});
										appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
									}}>
									<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
									</CopyToClipboard>
			
								</div>
							</Modal>
							
						</div>
						*/}
				    </div>
				</div>
				
				<div className="home-body">
					<div className="collection-empty-space">
					
					</div>
					{ !special_category_description ? null :
					<div className="special-category-description">{special_category_description}</div>
					}
					{ special_category_name == '문학굿즈전' ? 
					<div className="home-sub-title"><h3>문학굿즈 프로젝트</h3></div>
					:
					null	
					}
					{ products && <PresentProductList products={products} /> }
					
					<div className="start-body-space-20"></div>
					
					{ special_category_name == '문학굿즈전' ? 
					<div className="home-sub-title"><h3>문학굿즈 상점</h3></div>
					:
					null	
					}
					{ special_category_name == '문학굿즈전' ? 
					<div className="home-body-recommend-store">
						{ stores_literature.map(({
							title,
							description,
							imgSrc,
							link
						}, index) => (
							<div className="home-items-container">
								<div className="home-items" key={index}>
									<div><Link to={link}>
										<div className="home-items-thumbnail" style={HomeStoresBackground(imgSrc)}>
										</div>
									</Link>
									</div>
									<div className="home-items-caption">
										<div><Link to={link}><div className="home-items-title">{title}</div></Link></div>
										<div className="home-items-description">{description}</div>
									</div>
								</div>
							</div>
						))}
					</div>
					:
					null
					}
					<div className="start-body-space-20"></div>
				</div>
			</div>
			)
	}

}
export default special_category;
