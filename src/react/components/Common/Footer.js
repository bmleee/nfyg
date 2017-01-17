import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'; 
import Modal from '~/src/react/components/react-awesome-modal';
import KakaoImage from '~/src/assets/images/kakaotalk.svg'

const Footer = () => (
	<div className="footer">
		<div className="footer-desktop">
			<div className="footer-container-first">
				<Link to={`/about`}>
					<p className="footer-text-first">About 7Pictures</p>
				</Link>
				<Link to={`/termofuse`}>
					<p className="footer-text-first">이용약관</p>
				</Link>
				<Link to={`/privacy`}>
					<p className="footer-text-first">개인정보취급방침</p>
				</Link>
				
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
					<button className="footer-sns-kakaotalk"><KakaoImage className="footer-kakao-icon" width={18} height={18} /></button>
				</div>
				</a>
	
				<a href="http://blog.naver.com/7pictures" target="_blank">
				<div className="footer-sns">
					<button className="footer-sns-blog" />
				</div>
				</a>
				
			</div>
				
			<div className="footer-container-second">
				
				<p className="footer-text-second">(주)세븐픽쳐스</p>
				<p className="footer-text-second">대표 전희재</p>
				<p className="footer-text-second">사업자 등록번호 : 342-81-00499</p>
				<p className="footer-text-second">서울시 종로구 종로6 광화문우체국 5층</p>
				<p className="footer-text-second">통신판매업 신고 : 2016-서울종로-0433</p>
				<p className="footer-text-second">ⓒ7Pictures</p>
			
			</div>
		</div>
		<div className="footer-mobile">
			
		</div>
	</div>
);

export default Footer;
