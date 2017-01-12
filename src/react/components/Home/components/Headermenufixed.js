import React, { Component, PropTypes } from 'react';
import ImageGallery from '../../react-image-gallery'; // https://www.npmjs.com/package/react-image-gallery

import { Link } from 'react-router'; 

class Headermenufixed extends Component {

	render() {

		return (
			<div className="header-menu-fixed">
					<div className="header-menu-fixed-left">
					<Link to={`/`}>
						<img className="header-menu-logo" src='/assets/images/7pictures_logo_vector_white.svg'/>
					</Link>
					<Link to={`/magazines`}>
						<p className="header-menu-text-left">MAGAZINE</p>
					</Link>
					<Link to={`/sponsors`}>
						<p className="header-menu-text-left">SPONSOR</p>
					</Link>
					</div>
					<div className="header-menu-fixed-right">
						
						{/* when user logged out */}
						<Link to={`/login`}>
							<p className="header-menu-text-right">로그인</p>
						</Link>
						
						{/* when user logged in 
						<input type="button" value="프로젝트 제안하기" onClick={() => this.openModal()} />

						<Modal className="project-suggest-modal" visible={this.state.visible} width="480" height="560px" effect="fadeInDown" onClickAway={() => this.closeModal()}>
							<div className="project-modal-header">
							<h3 className="project-modal-header-title">프로젝트 제안하기</h3>
							<a className="project-modal-header-close-container"><button className="project-modal-header-close" onClick={() => this.closeModal()}/></a>
							</div>
							<div className="project-modal-body">
							<p className="project-modal-body-small-title">연락처(필 수)
								<input className="project-modal-body-input-text" type="text" />
							</p>
							<p className="project-modal-body-small-title">이메일
								<input className="project-modal-body-input-text" type="text" />
							</p>
							<p className="project-modal-body-small-title">프로젝트 내용(필 수)
								<textarea className="project-modal-body-input-textarea" type="textarea"/>
							</p>
							<p className="project-modal-body-small-title">필요한 후원금(원)
								<input className="project-modal-body-input-text" type="number" />
							</p>
							<p className="project-modal-body-small-title">후원금 용도
								<textarea className="project-modal-body-input-textarea" type="textarea"/>
							</p>
							<p className="project-modal-body-small-title">관련 링크
								<input className="project-modal-body-input-text" type="text"/>
							</p>
							</div>
							<div className="project-modal-footer">
							<a className="project-modal-header-save-container" onClick={() => this.closeModal()}><button type="submit" className="project-modal-header-save">제안하기</button></a>
							</div>
						</Modal>
						*/}
					</div>
				</div>
		)
	}

}
export default Headermenufixed;
