import React, { Component, PropTypes } from 'react';
import ImageGallery from '../../react-image-gallery'; // https://www.npmjs.com/package/react-image-gallery

import { Link } from 'react-router';

import Modal from '~/src/react/components/react-awesome-modal';
import KakaoImage from '~/src/assets/images/kakaotalk.svg'
import { suggestProject } from '~/src/react/api/AppAPI'

import Collapsible from 'react-collapsible';

import BurgerMenu from 'react-burger-menu';
const Menu = BurgerMenu.slide;


class Headermenumobile extends Component {

	constructor(props) {
    super(props);
    this.state = {
        visible : false
    }
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
  async onClickSuggest() {
		
		try {
			let body = {
				contact: document.getElementById('suggest-contact').value,
				email: document.getElementById('suggest-email').value,
				text: document.getElementById('suggest-text').value,
				money: document.getElementById('suggest-money').value,
				purpose: document.getElementById('suggest-purpose').value,
				link: document.getElementById('suggest-link').value,
			}

			let r = await suggestProject(body)
			console.log('suggestProject', r);
			appUtils.setFlash({title: '성공적으로 접수되었습니다. 검토 후 빠른 시일내에 답변드리겠습니다.', level: 'success', autoDismiss: 3})
		    
		} catch (e) {
			console.error(e);
		}
	}

	render() {
		let {
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()

		return (
			<div>
			<div className="header-menu-mobile">

					{/*
					<div className="header-menu-mobile-search">
						<button className="header-search-open"/>
					</div>
					*/}

					<Collapsible trigger="" transitionTime={100}>
						<div className="header-search-form-opened">
							<form className="header-search-form" action="/search">
								<button className="header-search-submit" type="submit" />
								<input className="header-search" type="search" placeholder="Search..." name="q" />
							</form>
						</div>
					</Collapsible>

					<div className="header-menu-mobile-logo">
							<Link to={`/`}>
							<img className="header-menu-logo" src='/assets/images/7pictures_logo_black.svg'/>
							</Link>
					</div>

					<div className="header-menu-mobile-burger">
						<Menu right width={200} isOpen={ false } customBurgerIcon={ <button className="customBurgerIcon" /> }>

							{
							isLoggedIn &&
							<img className="mobile-burger-user-icon" src={image} width={70} height={70} />
							}
							{
							isLoggedIn &&
							<p className="mobile-burger-user-name">{displayName}</p>
							}
							{
							isLoggedIn && (
							<Link to={`/user/me`}>
							<div className="mobile-burger-profile-container">
								<p className="mobile-burger-profile">내 페이지</p>
							</div>
							</Link>	)
							}
							{
							isLoggedIn && (
							<Link to={`/profile/user`}>
							<div className="mobile-burger-profile-container">
								<p className="mobile-burger-profile">프로필 설정</p>
							</div>
							</Link> )
							}

							{
							!isLoggedIn && (
							<div className="mobile-burger-info-container">
								<p className="mobile-burger-info">현재 '로그아웃'상태입니다.</p>
								<p className="mobile-burger-info">'LOG IN/SIGN UP' 버튼을 눌러</p>
								<p className="mobile-burger-info">예술후원을 시작해보세요!</p>
							</div> )
							}
							{
							!isLoggedIn && (
							<Link to={`/login`}>
								<p className="mobile-burger-login">LOG IN</p>
							</Link> )
							}
							{
							!isLoggedIn && (
							<Link to={`/signup`}>
								<p className="mobile-burger-signup">SIGN UP</p>
							</Link> )
							}

							<Link to={`/`}>
								<p className="mobile-burger-whatson">What's on?</p>
							</Link>

							<Link to={`/magazines`}>
								<p className="mobile-burger-magazine">Magazine</p>
							</Link>

							<Link to={`/sponsors`}>
								<p className="mobile-burger-sponsor">Sponsor</p>
							</Link>
							{
							isLoggedIn &&
							<input className="mobile-burger-suggest-modal-button" type="button" value="제안하기" onClick={() => this.openModal()} />
							}
							{
							isLoggedIn && (
							<div className="mobile-burger-logout-container">
							<a href="/api/users/logout">
								<button className="mobile-burger-logout">로그아웃</button>
							</a>
							</div> )
							}

							<div className="mobile-burger-sns-container">
								<a href="https://www.facebook.com/7pictures" target="_blank">
								<div className="mobile-burger-sns">
									<button className="mobile-burger-sns-facebook" />
								</div>
								</a>
								<a href="https://www.instagram.com/seven__pictures/" target="_blank">
								<div className="mobile-burger-sns">
									<button className="mobile-burger-sns-instagram" />
								</div>
								</a>
								<a href="http://plus.kakao.com/home/@7pictures" target="_blank">
								<div className="mobile-burger-sns">
									<button className="mobile-burger-sns-kakaotalk"><KakaoImage className="kakao-icon" width={28} height={28} /></button>
								</div>
								</a>
								<a href="http://blog.naver.com/7pictures" target="_blank">
								<div className="mobile-burger-sns">
									<button className="mobile-burger-sns-blog" />
								</div>
								</a>
							</div>


					    </Menu>

					</div>
				</div>
				<div className="header-menu-mobile-empty-space">
				</div>
							{
							isLoggedIn && (
							<Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="560px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
									<div className="project-modal-header">
										<h3 className="project-modal-header-title">제안하기</h3>
										<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
									</div>
									<div className="project-modal-body">
										<p className="project-modal-body-small-title">연락처(필 수)
											<input className="project-modal-body-input-text" type="text" id="suggest-contact" />
										</p>
										<p className="project-modal-body-small-title">이메일
											<input className="project-modal-body-input-text" type="text" id="suggest-email" />
										</p>
										<p className="project-modal-body-small-title">제안 내용(필 수)
											<textarea className="project-modal-body-input-textarea" type="textarea" id="suggest-text" />
										</p>
										<p className="project-modal-body-small-title">필요한 후원금(원)
											<input className="project-modal-body-input-text" type="number" id="suggest-money" />
										</p>
										<p className="project-modal-body-small-title">후원금 용도
											<textarea className="project-modal-body-input-textarea" type="textarea" id="suggest-purpose" />
										</p>
										<p className="project-modal-body-small-title">관련 링크
											<input className="project-modal-body-input-text" type="text" id="suggest-link" />
										</p>
									</div>
									<div className="project-modal-footer">
										<a className="project-modal-header-save-container" onClick={this.onClickSuggest}><button type="submit" className="project-modal-header-save" onClick={() => this.closeModal()}>보내기</button></a>
									</div>
								</Modal> )
						}

			</div>
		)
	}

}
export default Headermenumobile;
