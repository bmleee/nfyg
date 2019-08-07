import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome'

import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';

import { getFullUrl } from '~/src/react/lib/utils'
import { shareProject } from '../../../../api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'
import DocumentMeta from 'react-document-meta';

class MagazineDetailHeading extends Component {
	
	componentDidMount() {
		const { title, imgSrc } = this.props;

		const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
		const imgSrcUrl2 = encodeURI(imgSrcUrl)
		const url = document.URL;

		// // console.log(imgSrcUrl)
		// // console.log(imgSrcUrl2)

		Kakao.init('0aad64ae5f685fcf0be27e3e654f8ef6');

	}
	
	
	render() {
		const { title, creator, imgSrc, category, descriptions, contents } = this.props;
		
		const url = document.URL;
		
		const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
		
		let meta = canUseDOM && {
			title: title,
			meta: {
				'og:image': {imgSrcUrl},
			}
		}
		
		// // console.log(imgSrcUrl)

		return (
			<div className="magazine-detail-heading">
				{/* <img src={imgSrc} alt=""/> */}
				<DocumentMeta {...meta} />
				<h2> {title} </h2>
				<div className="magazine-share-button-container">
					
					<button className="ma-share-button-facebook" onClick={this.onClickShareFB}>
					<FontAwesome name='facebook' size='lg' />
					</button>
					
					
					<TwitterButton message={title} url={url} className="ma-share-button-twitter">
					<FontAwesome name='twitter' size='lg' />
					</TwitterButton>
					
					<button id="kakao-link-btn" onClick={this.sendkakaolink} className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={23} height={23} /></button>
					
					<CopyToClipboard text={url} onCopy={() => {
							this.setState({copied: true, visible:false});
							appUtils.setFlash({title: '', message: '클립보드에 복사되었습니다.', level: 'success', autoDismiss: 2, dismissible: true})
						}}>
					<button className="ma-share-button-url"><FontAwesome name='link' size='lg' /></button>
					</CopyToClipboard>
					
				</div>
			</div>
		)
	}
	
	onClickShareFB = async () => {
		const { title, imgSrc } = this.props;
		// let share_url = window.location.host + window.location.pathname
		// let share_url = '7pictures.co.kr/campaigns/m-art/'
		// let url = format({ host: FB_SHARER_URL, query: {u: share_url} })
		//
		// window.open(url, '_blank', 'width=500, height=300')
		
		// // console.log(title)

		 let url = getFullUrl()
		// let url2 = 'http://7pictures.co.kr'

		// // console.log('url', url2);

		FB.ui({
			method: 'share',
			display: 'popup',
			href: url,
		},  async function(response) {
    	if (response && !response.error_message) {
	      try {
	      	const r = await shareProject(title, url)
	      	// console.log('shareProject result', r)
	      } catch (e) {
	      	// console.error(e)
	      }
	    } else {
	    	
			}
		})
	}
	
	sendkakaolink = async () => {
		
		const {
			abstract: {
				imgSrc,
				longTitle,
				description
			},
		} = this.props;

		const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
		const imgSrcUrl2 = encodeURI(imgSrcUrl)
		const url = document.URL;
		
		Kakao.Link.sendDefault({
		  // container : '#kakao-link-btn',
		  objectType: 'feed',
		  content: {
	        title: longTitle,
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
	
}

export default MagazineDetailHeading;
