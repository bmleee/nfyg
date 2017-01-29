import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome'

import KakaoImage from '~/src/assets/images/kakaotalk.svg'

import { TwitterButton, FacebookButton, FacebookCount } from "react-social";
import CopyToClipboard from 'react-copy-to-clipboard';

const border = { border: '1px solid gray' }

class MagazineDetailHeading extends Component {
	
	componentDidMount() {
		const { title, imgSrc } = this.props;

		const imgSrcUrl = `${window.location.protocol}//${window.location.host}${imgSrc}`
		const url = document.URL;

		console.log(imgSrcUrl)

		Kakao.init('0aad64ae5f685fcf0be27e3e654f8ef6');

		Kakao.Link.createTalkLinkButton({
		  container : '#kakao-link-btn',
		  label : title,
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
		const { title, creator, imgSrc, category, descriptions, contents } = this.props;
		
		const url = document.URL;

		return (
			<div className="magazine-detail-heading">
				{/* <img src={imgSrc} alt=""/> */}
				<h2> {title} </h2>
				<div className="magazine-share-button-container">
					<FacebookButton sharer='true' media={`http://52.78.180.103:8080${imgSrc}`} appId='361812380855194' message={title} url={url} className="ma-share-button-facebook">
					<FontAwesome name='facebook' size='lg' />
					</FacebookButton>
					
					<TwitterButton message={title} url={url} className="ma-share-button-twitter">
					<FontAwesome name='twitter' size='lg' />
					</TwitterButton>
					
					<button id="kakao-link-btn" className="ma-share-button-kakao"><KakaoImage className="ma-kakao-icon" width={23} height={23} /></button>
					
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
}

export default MagazineDetailHeading;
