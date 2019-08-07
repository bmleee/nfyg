import React, { Component, PropTypes } from 'react'
import MetaTags from 'react-meta-tags'

import update from 'immutability-helper'
import { Link } from 'react-router'

import { date2string } from '~/src/react/lib/utils'
import { fetchUserAndData, fetchContactQna, deleteQnA, createCommentOnQnA, deleteContactComment  } from '../../../api/AppAPI'

class Start extends Component {
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
    	console.log('this.state', this.state)
    	
        let StartBackground = {
    			backgroundImage: `url(/assets/images/homeimg_20180119_2.png)`,
    			backgroundSize: 'cover',
    			backgroundPosition: 'center center',
    			backgroundRepeat: 'no-repeat'
    		}
    		
    		let StartBackground2 = {
    			backgroundImage: `url(/assets/images/start_back3.jpg)`,
    			backgroundSize: 'cover',
    			backgroundPosition: 'center center',
    			backgroundRepeat: 'no-repeat'
    		}
    		
    	let StartBackground3 = {
    			backgroundImage: `url(/assets/images/start_back4.jpg)`,
    			backgroundSize: 'cover',
    			backgroundPosition: 'center center',
    			backgroundRepeat: 'no-repeat'
    		}
        
        return (
          <div className="start-container">
    				
				<div className="start-body-header" style={StartBackground}>
      				<div className="start-body-container">
      					<div className="start-body-1-of-1">
      					  <div className="start-pc">
      					    <div className="start-body-space-20"></div>
      					    <div className="start-body-space-20"></div>
      					  </div>
      					  <div className="start-body-header-title">창작자의 활동에</div>
      					  <div className="start-body-header-title">날개를 달다.</div>
      					  <div className="start-pc"><div className="start-body-space-20"></div></div>
      					  <div className="start-mobile"><div className="start-body-space-10"></div></div>
      					  <div className="start-pc">
          					  <div className="start-body-header-text">‘선주문 후제작’ 방식의 크라우드펀딩으로</div>
          					  <div className="start-body-header-text">지속적인 예술/디자인 창작 활동을 뒷받침합니다.</div>
          					  <div className="start-body-space-10"></div>
          					  <div className="start-body-header-text">이미 만들어진 제품이나 펀딩 후의 남은 제품은</div>
          					  <div className="start-body-header-text">‘월요예술상점’을 통해 소개할 수 있습니다.</div>
          					  <div className="start-body-space-20"></div>
          				    </div>
          				  <div className="start-mobile">
      					  <div className="start-body-header-text">‘선주문 후제작’ 방식의 크라우드펀딩으로 지속적인 예술/디자인 창작 활동을 뒷받침합니다. 이미 만들어진 제품이나 펀딩 후의 남은 제품은 ‘월요예술상점’을 통해 소개할 수 있습니다.</div>
      				    </div>
      				        <div className="start-pc">
      				        <div className="start-body-space-20"></div>
      				        <div className="start-body-space-20"></div>
      				        </div>
      					</div>
      				</div>
      			</div>
      			    
      			    {/*
      			   <div className="start-body-navy"> 
      			    <div className="start-body-container">
    					<div className="start-body-1-of-1">
    					<div className="start-pc">
    					  <div className="start-body-sub-title">
    					   신진 디자이너에게는 하나의 예술/디자인 스튜디오로 자립할 수 있는 기반으로,
    					  </div>
    					  <div className="start-body-space-10"></div>
    					  <div className="start-body-sub-title">
    					   현업 작가에게는 꾸준한 창작활동을 뒷받침할 수 있는 든든한 버팀목으로
    					  </div>
    					 </div>
    					 <div className="start-mobile">
    					  <div className="start-body-sub-title">
    					   신진 디자이너에게는 하나의 예술/디자인 스튜디오로 자립할 수 있는 기반으로, 현업 작가에게는 꾸준한 창작활동을 뒷받침할 수 있는 든든한 버팀목으로
    					  </div>
    					 </div>
    					</div>
    				</div>
    				</div>
    				*/}
    			
      				<div className="start-body-container">
      				  <div className="start-body-1-of-1">
      					  <div className="start-body-sub-title-left">
      					  "실현하고 싶은 아이디어가 있다면"
      					  </div>
      					</div>
      					<div className="start-body-space-20"></div>
      					<div className="start-body-3-of-4">
      					  <div className="start-body-title">크라우드펀딩</div>
      					  <div className="start-body-space-20"></div>
      					  <div className="start-pc">
          					  <div className="start-body-text">
          					  만들고 싶은 예술/디자인 제품을 선주문을 받아 제작합니다.
          					  </div>
          					  <div className="start-body-space-10"></div>
          					  <div className="start-body-text">
          					  기간이 끝나고 모금액이 달성되면 제품을 제작하여 후원자에게 전달합니다.
          					  </div>
          					  <div className="start-body-space-10"></div>
          					  <div className="start-body-text">
          					  멋진 프로젝트를 완성하여 후원자 네트워크를 만들어보세요!
          					  </div>
          			        </div>
          			        <div className="start-mobile">
          					  <div className="start-body-text">
          					  만들고 싶은 예술/디자인 제품을 선주문을 받아 제작합니다. 기간이 끝나고 모금액이 달성되면 제품을 제작하여 후원자에게 전달합니다. 멋진 프로젝트를 완성하여 후원자 네트워크를 만들어보세요!
          					  </div>
          			        </div>
      					</div>
      					<div className="start-body-space-30"></div>
      					<div className="start-body-1-of-3">
      					  <img className="start-body-img-90" src="/assets/images/start1.png" />
      					  <div className="start-body-space-10"></div>
      					  <div className="start-body-text-center-border">
                          크라우드펀딩 제안하기
      					  </div>
      					</div>
      					<div className="start-body-1-of-3">
      					  <img className="start-body-img-90" src="/assets/images/start2.png" />
      					  <div className="start-body-space-10"></div>
      					  <div className="start-body-text-center-border">
                         펀딩 프로젝트 시작 및 홍보
      					  </div>
      					</div>
      					<div className="start-body-1-of-3">
      					  <img className="start-body-img-90" src="/assets/images/start3.png" />
      					  <div className="start-body-space-10"></div>
      					  <div className="start-body-text-center-border">
                         제품 제작과 리워드 배송
      					  </div>
      					</div>
      				</div>
    				
    				
    				<div className="start-body-grey">
      				<div className="start-body-container">
      				  <div className="start-body-1-of-1">
      					  <div className="start-body-sub-title-left">
      					  "펀딩이 끝났지만 제품을 꾸준히 소개하고 싶다면"
      					  </div>
      					</div>
      					<div className="start-body-space-20"></div>
      					<div className="start-body-3-of-4">
      					  <div className="start-body-title">월요예술상점</div>
      					  <div className="start-body-space-20"></div>
      					  <div className="start-pc">
          					  <div className="start-body-text">
          					  '월요예술상점'은 일주일에 한 차례 배송되는 온라인 상시 판매 스토어입니다.
          					  </div>
          					  <div className="start-body-space-10"></div>
          					  <div className="start-body-text">
          					  지속적인 판매는 기본, 재고와 배송의 걱정 없이 작업에만 집중하세요.
          					  </div>
          					  <div className="start-body-space-10"></div>
          					  <div className="start-body-text">
          					  나만의 예술 상점, 하나씩 쌓여가는 특별한 창작이야기
          					  </div>
          				   </div>
          				   <div className="start-mobile">
          					  <div className="start-body-text">
          					  '월요예술상점'은 일주일에 한 차례 배송되는 온라인 상시 판매 스토어입니다. 지속적인 판매는 기본, 재고와 배송의 걱정 없이 작업에만 집중하세요. 나만의 예술 상점, 하나씩 쌓여가는 특별한 창작이야기
          					  </div>
          				   </div>
      					</div>
      					<div className="start-body-space-30"></div>
      					<div className="start-body-1-of-2">
      					  <img className="start-body-img-70" src="/assets/images/start4.png" />
      					  <div className="start-body-space-20"></div>
      					  <div className="start-body-text-center-border">
                  일주일에 한번 배송
      					  </div>
      					</div>
      					<div className="start-body-1-of-2">
      					  <img className="start-body-img-70" src="/assets/images/start5.png" />
      					  <div className="start-body-space-20"></div>
      					  <div className="start-body-text-center-border">
                  편리한 상점 관리
      					  </div>
      					</div>
      				</div>
      			</div>
    				
    				<div className="start-body-start-container">
    				  <div className="start-body-start-1" style={StartBackground2}>
    				    <div className="start-body-start-title">크라우드펀딩</div>
    				    <div className="start-body-start-text">성공적인 프로젝트를 위한 Tips</div>
    				    <Link to="/funding-start"><button className="start-body-start-button">프로젝트 개설하기</button></Link>
    				  </div>
    				  <div className="start-body-start-2" style={StartBackground3}>
    				    <div className="start-body-start-title">월요예술상점</div>
    				    <div className="start-body-start-text">나만의 예술상점을 만들어보세요!</div>
    				    <Link to="/store-apply"><button className="start-body-start-button">상점 개설하기</button></Link>
    				  </div>
    				</div>
    				
          </div>
        )  
    }
    
}

export default Start;