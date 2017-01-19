import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'; 
import Modal from '~/src/react/components/react-awesome-modal';
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

class Mobilefootersub extends Component {
    
    render() {
        
     return (
         <div className="footer-mobile">
			<div className="footer-mobile-first">
				<Link to={`/about`}>
					<p className="footer-mobile-text-first">About 7Pictures</p>
				</Link>
				<Link to={`/termofuse`}>
					<p className="footer-mobile-text-first">이용약관</p>
				</Link>
				<Link to={`/privacy`}>
					<p className="footer-mobile-text-first">개인정보취급방침</p>
				</Link>
			</div>
			
			<div className="footer-mobile-second">
				<a href="https://www.facebook.com/7pictures" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-facebook" />
				</div>
				</a>
				
				<a href="https://www.instagram.com/seven__pictures/" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-instagram" />
				</div>
				</a>
	
				<a href="http://plus.kakao.com/home/@7pictures" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-kakaotalk"><KakaoImage className="footer-kakao-icon" width={19} height={19} /></button>
				</div>
				</a>
	
				<a href="http://blog.naver.com/7pictures" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-blog" />
				</div>
				</a>
			</div>
			<div className="footer-mobile-empty">
			</div>
		</div>
         )
    }
}
export default Mobilefootersub;
