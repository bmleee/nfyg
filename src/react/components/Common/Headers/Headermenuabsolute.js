import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { suggestProject, fetchContactQna } from '~/src/react/api/AppAPI'
import Modal from '~/src/react/components/react-awesome-modal';

class Headermenuabsolute extends Component {

	state = {
        visible : false,
        visible2 : false,
        visible3 : false,
        userType: '',
        qnas: {},
        likes: {}
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
  
  openModal2() {
    this.setState({
        visible2 : true
    });
  }

  closeModal2() {
    this.setState({
        visible2 : false
    });
  }

  
  OnSearch() {
    let search_word = document.getElementById('search').value;
    
	new fbq('track', 'Search', {
		search_string: search_word,
	});
	
	this.setState({
        visible : false
    });
  }
	
	async componentDidMount () {
	    	window.scrollTo(0, 0)
			const {
	            user,
	            data: {
	              userType,
	              qnas,
	              likes
	            }
	          } = await fetchContactQna();
	        
	        this.setState({
	            userType,
	            qnas,
	            likes
	        });
			this.props.appUtils.setUser(user)
		}

	render() {

		let {
			isLoggedIn,
			displayName,
			image,
		} = appUtils.getUser()
		
		let {
          userType,
          qnas,
          likes
        } = this.state
        
        let likedproducts = likes.product && likes.product.likedProducts
		let isEndSoon = false;
		for(var i in likedproducts){
			if(Math.ceil(likedproducts[i].remainingDays) > 0 && Math.ceil(likedproducts[i].remainingDays) < 5) {
				isEndSoon = true;
			}
		}
		
		let likedstores = likes.store && likes.store.likedStores
		let isItemNew = false;
		for(var i in likedstores){
			if(likedstores[i].storeisItemNew == true) {
				isItemNew = true;
			}
		}
        
        let { contactQnas, productQnas } = qnas
        
		let isCommented_1 = false;
		for(var i in contactQnas && contactQnas){
			if(contactQnas && contactQnas[i].isCommented == true) {
				isCommented_1 = true;
			}
		}
		
		let isCommented_2 = false;
		for(var i in productQnas && productQnas){
			if(productQnas && productQnas[i].isCommented == false) {
				isCommented_2 = true;
			}
		}

		return (
			<div className="header-menu-white">
				<div className="header-menu-container">
					<div className="header-menu-white-left">
						<div className="Link_sub_div">
							<p className="header-menu-text-look" onClick={() => this.openModal()}>둘러보기</p>
						</div>
						
						<div className="Link_sub_div">
							<Link to={`/storemain`}><p className="header-menu-text-left">월요예술상점</p></Link>
						</div>
						
						<Modal className="header-modal-left" visible={this.state.visible} width="100%" height="100%" effect="fadeInLeft" onClickAway={() => this.closeModal()}>
							<div className="header-modal-container">
								<div className="header-modal-header">
									<div className="header-modal-header-left">
										<button className="header-modal-close" onClick={() => this.closeModal()}></button>
									</div>
									<div className="header-modal-header-middle"></div>
									<div className="header-modal-header-right"></div>
								</div>
								<div className="header-modal-left-body">
									<form className="header-modal-search-form" action="/search">
										<input className="header-modal-search" type="search" placeholder="" name="q" />
										<button className="header-modal-search-submit" type="submit" onClick={() => this.OnSearch()} />
									</form>
									<div><Link to={`/storemain`}><div className="header-modal-menu" onClick={() => this.closeModal()}>월요예술상점</div></Link></div>
									<div><Link to={`/whats-on`}><div className="header-modal-menu" onClick={() => this.closeModal()}>펀딩프로젝트</div></Link></div>
									<div className="header-modal-sub-menu">기획전</div>
									<div><a href={`/2018stickit`}><div className="header-modal-collection" onClick={() => this.closeModal()}>2018 STICK-IT</div></a></div>
									<div className="header-modal-sub-category">카테고리</div>
									<div><a href={`/category/accessory`}><div className="header-modal-category" onClick={() => this.closeModal()}>액세서리</div></a></div>
									<div><a href={`/category/props`}><div className="header-modal-category" onClick={() => this.closeModal()}>소품</div></a></div>
									<div><a href={`/category/fancy`}><div className="header-modal-category" onClick={() => this.closeModal()}>문구</div></a></div>
									<div><a href={`/category/fashion`}><div className="header-modal-category" onClick={() => this.closeModal()}>패션</div></a></div>
									<div><a href={`/category/poster`}><div className="header-modal-category" onClick={() => this.closeModal()}>포스터</div></a></div>
									<div><a href={`/category/literature`}><div className="header-modal-category" onClick={() => this.closeModal()}>출판</div></a></div>
									{/* <div><a href={`/sticker2`}><div className="header-modal-category" onClick={() => this.closeModal()}>스티커</div></a></div> */}
									{/* <div><a href={`/store/blindposter`}><div className="header-modal-category" onClick={() => this.closeModal()}>포스터</div></a></div> */}
									<div><Link to={`/past-collection`}><div className="header-modal-postcollection" onClick={() => this.closeModal()}>지난 기획전</div></Link></div>
								</div>
							</div>
						</Modal>
						
						<Modal className="project-suggest-modal" visible={this.state.visible2} width="100%" height="100%" effect="fadeInRight" onClickAway={() => this.closeModal2()}>
							<div className="header-modal-container">
								<div className="header-modal-header">
									<div className="header-modal-header-left"></div>
									<div className="header-modal-header-middle"></div>
									<div className="header-modal-header-right">
										<button className="header-modal-close2" onClick={() => this.closeModal2()}></button>
									</div>
								</div>
								<div className="header-modal-right-body">
									<div className="header-modal-user">
										<img className="header-modal-user-icon" src={image} width={38} height={38} />
										{displayName}
									</div>
									<div><a href="/user/me"><div className="header-modal-menu" onClick={() => this.closeModal2()}>내 페이지</div></a></div>
									<div><Link to={`/likelist`}><div className="header-modal-menu" onClick={() => this.closeModal2()}>
										{ !!isEndSoon ? <div className="header-modal-endsoon-notice">마감임박</div> : null }
										{ !!isItemNew ? <div className="header-modal-new-notice">N</div> : null }
										좋아요</div></Link></div>
									<div><Link to={`/user-qna`}><div className="header-modal-menu" onClick={() => this.closeModal2()}>
										{ !!isCommented_1 || !!isCommented_2 ? <div className="header-modal-new-notice">N</div> : null }문의 내역
									</div></Link></div>
									<div><Link to={`/profile/user`}><div className="header-modal-menu" onClick={() => this.closeModal2()}>프로필 설정</div></Link></div>
									<div><a href="/api/users/logout"><div className="header-modal-menu" onClick={() => this.closeModal2()}>로그아웃</div></a></div>
									<div><Link to={`/start`}><div className="header-modal-help" onClick={() => this.closeModal2()}>7Pictures에 대해 궁금하신가요?</div></Link></div>
								</div>
							</div>
						</Modal>
						
					</div>
					
					<div className="header-menu-white-middle">
						<div className="Link_sub_div"><Link to={`/`}>
						<img className="header-menu-logo" src='/assets/images/7pictures_logo_black.svg'/>
						</Link></div>
					</div>
					
					<div className="header-menu-white-right">
						<div className="Link_sub_div">
							<Link to={`/start`}><p className="header-menu-text-left">시작하기</p></Link>
						</div>
						
						{
							!isLoggedIn && (
						<div className="Link_sub_div"><Link to={`/login`}>
							<p className="header-menu-text-right">로그인</p>
						</Link></div>
							)
						}
						{/*
							!isLoggedIn && (
						<div className="Link_sub_div"><Link to={`/signup`}>
							<p className="header-menu-text-right">회원가입</p>
						</Link></div>
							)
						*/}

						{
							isLoggedIn && (
						<div className="user-hover-menu" onClick={() => this.openModal2()}>
							{ !!isCommented_1 || !!isCommented_2 || !!isEndSoon || !!isItemNew ? <div className="header-user-new-notice">N</div> : null }
							<img className="menu-user-icon" src={image} width={25} height={25} />
						</div>
						)
						}
						
						
					</div>
				</div>	
			</div>
		)
	}

}
export default Headermenuabsolute;
