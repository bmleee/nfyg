import React, { Component, PropTypes } from 'react'
import MetaTags from 'react-meta-tags'

import update from 'immutability-helper'
import { Link } from 'react-router'

import { date2string } from '~/src/react/lib/utils'
import { fetchUserAndData } from '../../../api/AppAPI'

class StartFunding extends Component {
    state = {
		isLoggedIn : false,
		displayName: '',
	}
	  
    async componentDidMount () {
    	window.scrollTo(0, 0)
  		const {
            user
        } = await fetchUserAndData();
            
  		this.props.appUtils.setUser(user)
  		this.setState({
            isLoggedIn : user.isLoggedIn,
            displayName : user.displayName
      })
    }
    
    render() {
        let StartBackground = {
    			backgroundImage: `url(/assets/images/start_test3.jpg)`,
    			backgroundSize: 'cover',
    			backgroundPosition: 'center center',
    			backgroundRepeat: 'no-repeat'
    		}
        
        return (
          <div className="start-container">
    				
    				<div className="start-body-header">
    				    <div className="start-body-container">
    				        <div className="start-body-space-20"></div>
    				        <div className="start-funding-header-left">
          					  <img className="start-body-img-70" src="/assets/images/start0.png" />
          					</div>
          					<div className="start-funding-header-right">
          					  <div className="start-funding-header-title">프로젝트 시작하기</div>
          					  <div className="start-body-space-10"></div>
      						  <div className="start-funding-header-text">성공적인 펀딩 프로젝트를 위한 Tips</div>
          					</div>
          					<div className="start-body-space-20"></div>
          			    </div>
    				</div>
    				
    				<div className="start-body-grey">
    				<div className="start-body-container">
    				    <div className="start-body-space-40"></div>
    					<div className="start-body-1-of-1">
    					  <div className="start-body-funding-title">
    					   인상적인 제목 선정하기
    					  </div>
    					  <div className="start-body-space-20"></div>
    					    <div className="start-pc">
        					  <div className="start-body-text-center">
                                프로젝트의 제목을 통해 후원자들에게 멋진 인상을 남겨보세요.
        					  </div>
        					  <div className="start-body-text-center">
                                인상적인 제목은 더 많은 후원자들과 만날 수 있게 합니다. 
        					  </div>
        				    </div>
        				    <div className="start-mobile">
        					  <div className="start-body-text-center">
                                프로젝트의 제목을 통해 후원자들에게 멋진 인상을 남겨보세요. 인상적인 제목은 더 많은 후원자들과 만날 수 있게 합니다. 
        					  </div>
        				    </div>
        				    <div className="start-body-tips">
                            <div className="start-body-tips-icon">Tip</div>
                            <div className="start-body-tips-pc">SNS에서 ‘제목’만 보고 클릭하는 사람의 입장에서 생각해보면 좋아요!</div>
                            <div className="start-body-tips-mobile">SNS에서 ‘제목’만 보고 클릭하는 사람의 입장에서 생각해보면 좋아요!</div>
    					  </div>
    					</div>
    					<div className="start-body-space-40"></div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/chosuncard" target="_blank"><img className="start-body-img" src="/assets/images/조선놀이패.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/chosuncard" target="_blank">조선놀이패</a>
    					  </div>
    					  <a href="/products/chosuncard" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/matchboxtheater" target="_blank"><img className="start-body-img" src="/assets/images/성냥갑영화관.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/matchboxtheater" target="_blank">성냥갑영화관</a>
    					  </div>
    					  <a href="/products/matchboxtheater" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/minzoking" target="_blank"><img className="start-body-img" src="/assets/images/민조킹에코백.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/minzoking" target="_blank">lover’s mood</a>
    					  </div>
    					  <a href="/products/minzoking" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/seoulmodelshop" target="_blank"><img className="start-body-img" src="/assets/images/서울과학사.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/seoulmodelshop" target="_blank">서울과학사</a>
    					  </div>
    					  <a href="/products/seoulmodelshop" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-space-40"></div>
    				</div>
    				</div>
    				
    				<div className="start-body-container">
    				    <div className="start-body-space-40"></div>
    				  <div className="start-body-1-of-2">
    					  <div className="start-body-funding-title">
    					   펀딩기간 설정하기
    					  </div>
    					  <div className="start-body-space-20"></div>
        					  <div className="start-body-text-center">
                                원하는 프로젝트 기간을 설정할 수 있습니다.
        					  </div>
	        				  <div className="start-body-tips">
	                            <div className="start-body-tips-icon">Tip</div>
	                            <div className="start-body-tips-pc-block">후원자들에게 안정적으로 리워드를 전달하고 프로젝트를</div>
	                            <div className="start-body-tips-pc">소개할 수 있는 '한 달'정도의 기간을 추천해요!</div>
	                            <div className="start-body-tips-mobile">후원자들에게 안정적으로 리워드를 전달하고 프로젝트를 소개할 수 있는 '한 달'정도의 기간을 추천해요!</div>
	    					  </div>
        				    <div className="start-body-space-20"></div>
        				    <img className="start-body-img-70" src="/assets/images/start6.png" />
    					</div>
    					<div className="start-body-1-of-2">
    					  <div className="start-body-funding-title">
    					   목표금액 설정하기
    					  </div>
    					  <div className="start-body-space-20"></div>
        					  <div className="start-body-text-center">
                                기획했던 아이디어를 실현시키기 위해 필요한 목표 금액을 설정합니다.
        					  </div>
        					  <div className="start-body-tips">
	                            <div className="start-body-tips-icon">Tip</div>
	                            <div className="start-body-tips-pc-block">실제 필요한 목표 금액보다 조금 낮추어 설정하고</div>
	                            <div className="start-body-tips-pc">초과 달성을 목표로 하는건 어떠세요?</div>
	                            <div className="start-body-tips-mobile">실제 필요한 금액보다 조금 낮게 설정하고 초과 달성을 목표로 하는건 어떠세요?</div>
	    					  </div>
        				    <div className="start-body-space-20"></div>
        				    <img className="start-body-img-70" src="/assets/images/start7.png" />
    					</div>
    					<div className="start-body-space-40"></div>
    				</div>
    				
    				<div className="start-body-grey">
    				<div className="start-body-container">
    				    <div className="start-body-space-40"></div>
    					<div className="start-body-1-of-1">
    					  <div className="start-body-funding-title">
    					   프로젝트 소개하기
    					  </div>
    					  <div className="start-body-space-20"></div>
    					    <div className="start-pc">
        					  <div className="start-body-text-center">
                                프로젝트를 시작하게 된 이야기, 제품을 만들게 된 계기에 대해서 말해주세요.
        					  </div>
        					  <div className="start-body-text-center">
                                길지않아도 좋습니다. 다만, 이 프로젝트와 제품에 담긴 이야기에 마음을 담아 전해주세요.
        					  </div>
        				    </div>
        				    <div className="start-mobile">
        					  <div className="start-body-text-center">
                                프로젝트를 시작하게 된 이야기, 제품을 만들게 된 계기에 대해서 말해주세요. 길지않아도 좋습니다. 다만, 이 프로젝트와 제품에 담긴 이야기에 마음을 담아 전해주세요.
        					  </div>
        				    </div>
        				    <div className="start-body-tips">
	                            <div className="start-body-tips-icon">Tip</div>
	                            <div className="start-body-tips-pc">읽는 사람의 입장이 되어 이야기를 읽어보는 것도 좋은 방법입니다. 머릿 속에 명확히 그려질 수 있는 이미지나 사진을 활용해보세요!</div>
	                            <div className="start-body-tips-mobile">읽는 사람의 입장이 되어 이야기를 읽어보는 것도 좋은 방법입니다. 머릿 속에 명확히 그려질 수 있는 이미지나 사진을 활용해보세요!</div>
	    					  </div>
    					</div>
    					<div className="start-body-space-40"></div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/goldentime" target="_blank"><img className="start-body-img" src="/assets/images/응급뱃지.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/goldentime" target="_blank">중증/응급외상센터 후원 뱃지</a>
    					  </div>
    					  <a href="/products/goldentime" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/nabiletter" target="_blank"><img className="start-body-img" src="/assets/images/나비레터.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/nabiletter" target="_blank">NABILETTER, 소녀상 뱃지</a>
    					  </div>
    					  <a href="/products/nabiletter" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/paperfactory2" target="_blank"><img className="start-body-img" src="/assets/images/paperfactory.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/paperfactory2" target="_blank">PAPER FACTORY</a>
    					  </div>
    					  <a href="/products/paperfactory2" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-1-of-4">
    					  <a href="/products/2018hope" target="_blank"><img className="start-body-img" src="/assets/images/2018HOPE.jpg" /></a>
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-bold">
                           <a href="/products/2018hope" target="_blank">2018 HOPE 탁상 달력</a>
    					  </div>
    					  <a href="/products/2018hope" target="_blank"><div className="start-reference-link">참고하기</div></a>
    					</div>
    					<div className="start-body-space-40"></div>
    				</div>
    				</div>
    				
    				<div className="start-body-container">
    				    <div className="start-body-space-40"></div>
    					<div className="start-body-1-of-1">
    					  <div className="start-body-funding-title">
    					  펀딩 성공으로 이끌기
    					  </div>
    					  <div className="start-body-space-20"></div>
    					    <div className="start-pc">
        					  <div className="start-body-text-center">
                                프로젝트를 알리고 펀딩을 성공시키는 일.
        					  </div>
        					  <div className="start-body-text-center">
                                가장 중요한 ‘프로젝트 홍보’를 함께합니다.
        					  </div>
        				    </div>
        				    <div className="start-mobile">
        					  <div className="start-body-text-center">
                                프로젝트를 알리고 펀딩을 성공시키는 일. 가장 중요한 ‘프로젝트 홍보’를 함께합니다.
        					  </div>
        				    </div>
        				    <div className="start-body-tips">
	                            <div className="start-body-tips-icon">Tip</div>
	                            <div className="start-body-tips-pc">프로젝트를 잘 알릴 수 있는 영상과 이미지가 있다면 전달해주세요! 중간 진행 소식을 주기적으로 업데이트하는 것도 하나의 홍보 방법입니다.</div>
	                            <div className="start-body-tips-mobile">프로젝트를 잘 알릴 수 있는 영상과 이미지가 있다면 전달해주세요! 중간 진행 소식을 주기적으로 업데이트하는 것도 하나의 홍보 방법입니다.</div>
	    					  </div>
    					</div>
    					<div className="start-body-space-40"></div>
    					<div className="start-body-1-of-4">
    					  <img className="start-body-img-90" src="/assets/images/start2.png" />
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-border">
                          주변에 프로젝트 알리기
    					  </div>
    					</div>
    					<div className="start-body-1-of-4">
    					  <img className="start-body-img-90" src="/assets/images/start8.png" />
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-border">
                          유사 관심 커뮤니티에 알리기
    					  </div>
    					</div>
    					<div className="start-body-1-of-4">
    					  <img className="start-body-img-90" src="/assets/images/start9.png" />
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-border">
                          7Pictures와 함께 홍보하기
    					  </div>
    					</div>
    					<div className="start-body-1-of-4">
    					  <img className="start-body-img-90" src="/assets/images/start10.png" />
    					  <div className="start-body-space-20"></div>
    					  <div className="start-body-text-center-border">
                          프로젝트 소식 업로드하기
    					  </div>
    					</div>
    					<div className="start-body-space-40"></div>
    				</div>
    				
    				<div className="start-body-grey">
        			    <div className="start-body-container">
        			        <div className="start-body-1-of-1">
    			                <div className="start-body-sub-title">
        					    준비가 되셨다면 프로젝트를 시작해볼까요?
        					    </div>
        					    <div className="start-body-space-20"></div>
        					    { !this.state.isLoggedIn ?
        					    <Link to="/login">
        					    	<button className="start-body-start-button">개설하기</button>
        					    </Link>
        					    :
        					    <a href="https://netflix-salon.co.kr/product-editor/abstract">
        					    	<button className="start-body-start-button">개설하기</button>
        					    </a>
        					    }
        			        </div>
        			    </div>
    			    </div>
          </div>
        )  
    }
    
}

export default StartFunding;