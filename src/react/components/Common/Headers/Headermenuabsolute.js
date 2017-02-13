import React, { Component, PropTypes } from 'react';
import ImageGallery from '../../react-image-gallery'; // https://www.npmjs.com/package/react-image-gallery

import { Link } from 'react-router';

import { suggestProject } from '~/src/react/api/AppAPI'

import Modal from '~/src/react/components/react-awesome-modal';


class Headermenuabsolute extends Component {

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
			<div className="header-menu-white">
					<div className="header-menu-white-left">
					<Link to={`/`}>
						<img className="header-menu-logo" src='/assets/images/7pictures_favicon_black.svg'/>
					</Link>
					<form className="header-search-form" action="/search">
						<input className="header-search" type="search" placeholder="Search..." name="q" />
						<button className="header-search-submit" type="submit" />
					</form>
					<Link to={`/`}>
						<p className="header-menu-text-left">What's on?</p>
					</Link>
					<Link to={`/magazines`}>
						<p className="header-menu-text-left">Magazine</p>
					</Link>
					<Link to={`/sponsors`}>
						<p className="header-menu-text-left">Sponsor</p>
					</Link>
					</div>
					<div className="header-menu-white-right">

						{
							!isLoggedIn && (
						<Link to={`/login`}>
							<p className="header-menu-text-right">LOG IN</p>
						</Link>
							)
						}
						{
							!isLoggedIn && (
						<Link to={`/signup`}>
							<p className="header-menu-text-right">SIGN UP</p>
						</Link>
							)
						}

						{



							isLoggedIn && <input className="suggest-modal-button" type="button" value="제안하기" onClick={() => this.openModal()} />
						}
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
								</Modal>
						)
						}

						{
							isLoggedIn && (
						<div className="user-hover-menu">
							<img className="menu-user-icon" src={image} width={32} height={32} />
							<div className="user-hover-menu-arrow"></div>
							<div className="user-hover-menu-container">

								<Link to={`/user/me`}>
									<p className="header-menu-hover-text">내 페이지</p>
								</Link>
								<Link to={`/profile/user`}>
									<p className="header-menu-hover-text">프로필 설정</p>
								</Link>
								<a href="/api/users/logout">
									<p className="header-menu-hover-text">로그아웃</p>
								</a>
							</div>
						</div>
						)
						}

					</div>
				</div>
		)
	}

}
export default Headermenuabsolute;
