import React, { Component, PropTypes } from 'react'
import UserProfilecardsetting from './UserProfilecardsetting'

import { fetchJSONFile } from '../../../../api/AppAPI'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import daum from '~/src/lib/daum'
// <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js" />

function sample4_execDaumPostcode() {
        
    }

class Profile extends Component {

	state = {
		profile: false
	}

	async componentDidMount() {
		const profile = await fetchJSONFile('profile')
		this.setState({	profile	})
	}

	render() {
		const { profile } = this.state

		const { display_name, email, photoURL, role, likes, shares, comments, indirect_supports, direct_supports } = profile

		const info = profile && (
			<div className="profile-info-container">
				<div className="profile-thumbnail-container">
					<img className="profile-user-thumbnail" src={photoURL} alt=""/>
					<h3>{display_name}</h3>
					<p>{role}</p>
				</div>
			</div>
		)
		
		const profilesetting =  (
			<div className="profile-setting-container">
				<form>
				<div className="profile-setting-detail">
				<p className="profile-small-title">프로필 사진</p>
				<div className="profile-user-img-setting-container">
				<div className="profile-user-img-setting">
				<img className="profile-user-img" src={photoURL} alt=""/>
				</div>
				<div className="profile-user-img-uploade">
				<input className="profile-setting-file" type="file" />
				<p className="profile-setting-file-text">사이즈는 가로 200px, 세로 200px에 최적화 되어 있으며 jpg, gif, png파일을 지원합니다.</p>
				</div>
				</div>
				</div>
				
				<div className="profile-setting-detail-m">
				<p className="profile-small-title">이 름</p>
				<input className="profile-setting-text" type="text" />
				</div>
				
				<div className="profile-setting-detail-m">
				<p className="profile-small-title">연락처</p>
				<div className="profile-setting-num-container-1">
				<input className="profile-setting-num-1" type="text" maxLength="3" />
				</div>
				<div className="profile-setting-num-container-2">
				<input className="profile-setting-num-2" type="text" maxLength="4" />
				</div>
				<div className="profile-setting-num-container-3">
				<input className="profile-setting-num-3" type="text" maxLength="4" />
				</div>
				</div>
				
				<div className="profile-setting-detail-m">
				<p className="profile-small-title">이메일</p>
				<input className="profile-setting-text" type="text" />
				</div>
				
				<div className="profile-setting-detail-m">
				<p className="profile-small-title">페이스북 주소</p>
				<input className="profile-setting-text" type="text" />
				</div>
				
				<div className="profile-setting-detail">
				<p className="profile-small-title">자기소개</p>
				<textarea className="project-setting-textarea" type="textarea"/>
				</div>
				
				<div className="profile-setting-detail">
					<p className="profile-small-title">배송주소</p>
					<div className="profile-setting-search-address-container">
					<input className="profile-setting-search-address" type="button" onClick={this._onClick} value="주소찾기" />
					</div>
					<div className="profile-setting-postcode-container">
					<input className="profile-setting-postcode" type="text" id="postcode" placeholder="우편번호" />
					</div>
					<div>
					<div className="profile-setting-address1-container">
					<input className="profile-setting-address1" type="text" id="address1" placeholder="주소" />
					</div>
					<div className="profile-setting-address2-container">
					<input className="profile-setting-address2" type="text" id="address2" placeholder="상세주소" />
					</div>
					</div>
				</div>
				
				<input className="profile-setting-checkbox" type="checkbox" />
				<p className="profile-checkbox-title">이메일 수신여부</p>
				
				<div className="profile-setting-submit-container">
				<input className="profile-setting-submit" type="submit" value="프로필 수정" />
				</div>
				
				</form>
			</div>
		)

		const indirectSupports = indirect_supports && indirect_supports.map( ({
			project_name, display_name, photoURL, likes, shares, comments
		}) => (
			<div className="profile-indirect-supports-item">
				<img src={photoURL} alt=""/>
				<h4>{display_name}</h4>
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/likes.png" scale="0" />
				{ likes }
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/comment.png" scale="0" />
				{ comments }
				<img className="sharing-icon" src="https://7pictures.co.kr/wp-content/uploads/2016/08/share.png" scale="0" />
				{ shares }
			</div>
		))

		const directSupports = direct_supports && direct_supports.map( ({
			project_name, display_name, photoURL, money
		}) => (
			<div className="profile-direct-supports-item">
				<div className="direct-display-img-container">
				<img src={photoURL} alt=""/>
				</div>
				<div className="direct-display-name-container">
				<p className="direct-display-name">{display_name}</p>
				<p className="direct-display-money">{ money.toLocaleString() }원</p>
				</div>
				<div className="direct-display-cancel">
				<button className="direct-cancel-button">결제취소</button>
				{/* 일정 기간이 지나 취소가 불가능 할 시에 
				<button className="direct-cancel-button2">기간만료</button> 
				*/}
				</div>
			</div>
		) )

		if(!profile)
			return <div>Profile is loading..</div>
		else
			return (
				<div className="profile">
					{info}

					{/*	<h3>간접후원내역</h3>
					<div className="profile-indirect-supports-container">
						{indirectSupports}
					</div>  */}
					
					<Tabs onSelect={this.handleSelect} selectedIndex={0}>
					<TabList>
						<Tab>후원 내역</Tab>
						<Tab>프로필 설정</Tab>
						<Tab>결제카드 등록</Tab>
					</TabList>

					<TabPanel>
						<div className="direct-supports-container">
          <div className="indirect-support">
					<h4>공유로 후원한 내역</h4>

					<div className="indirect-support-detail-likes">
						<p className="indirect-support-detail-text">프로젝트 공유</p>
						<h4 className="indirect-support-h4">{ likes }</h4>회
					</div>

					<div className="indirect-support-detail-comments">
						<p className="indirect-support-detail-text">좋아요</p>
						<h4 className="indirect-support-h4">{ (comments+likes+shares).toLocaleString() }</h4>개
					</div>

					<div className="indirect-support-detail-shares">
						<p className="indirect-support-detail-text">누적후원금</p>
						<h4 className="indirect-support-h4">{ ((comments+likes+shares)*200).toLocaleString() }</h4>원
					</div>
					</div>
					<h4>리워드 구매 내역</h4>
					<div className="profile-direct-supports-container">
						{directSupports}
					</div>
					</div>
					</TabPanel>

					<TabPanel>
					 {profilesetting}
					</TabPanel>
					
					<TabPanel>
					 <UserProfilecardsetting />
					</TabPanel>
					</Tabs>
					
					<script
				      dangerouslySetInnerHTML={{ __html:
				        `
				          window.daum=window.daum||{},function(a){function b(){for(var a=0,b=l.length;b>a;a++)document.write('<script charset="UTF-8" type="text/javascript" src="'+(i+l[a])+'"></script>');h=2}function c(){for(var a=0,b=l.length;b>a;a++){var c=document.createElement("script");n[l[a]]=!1,c.type="text/javascript",c.charset="utf-8",c.src=i+l[a],c.onload=function(){var b=l[a];return function(){var a=b;n[a]||(n[a]=!0),e()&&f()}}(),c.onreadystatechange=function(){var b=l[a];return function(){/loaded|complete/.test(this.readyState)&&(n[b]||(n[b]=!0),e()&&f())}}(),document.getElementsByTagName("head")[0].appendChild(c)}}function d(a){var b={};return a.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,c,d){b[c]=d}),b}function e(){for(var a=0,b=0,c=l.length;c>b;b++)n[l[b]]&&a++;return a===l.length?!0:!1}function f(){for(h=2;g[0];)g.shift()()}a.postcode={};var g=[],h=0,i="https:"==location.protocol?"https:":"http:",j=document.getElementsByTagName("script"),k=j[j.length-1].src;j=null;var l=["//s1.daumcdn.net/svc/attach/U03/cssjs/postcode/1478655728019/161109.js"];if(/\/map_js_init\/postcode.v2(\.dev){0,1}(\.update){0,1}\.js\b/.test(k)){var m=d(k);"false"!==m.autoload&&(b(),h=2)}var n={};a.postcode.version="161109",a.postcode.load=function(a){if(a&&"function"==typeof a)switch(g.push(a),h){case 0:h=1,c();break;case 2:f()}}}(window.daum);
				        `
				      }}
				    />
				</div>
			)
	}
	
	_onClick = () => {
		new daum.Postcode({
            oncomplete: function(data) {
                
                var fullAddr = ''; 
                var extraAddr = ''; 

                
                if (data.userSelectedType === 'R') { 
                    fullAddr = data.roadAddress;

                } else { 
                    fullAddr = data.jibunAddress;
                }

                
                if(data.userSelectedType === 'R'){

                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }

                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }

                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }


                document.getElementById('postcode').value = data.zonecode; 
                document.getElementById('address1').value = fullAddr;
                document.getElementById('address2').focus();
            }
        }).open();
	}
}

export default Profile



const _profile = {
  "display_name": "박주형",
  "email": "dkdkajej@naver.com",
  "photoURL": "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/13087769_1158339844230283_6031583393534299654_n.jpg?oh=9cce972061d98f2d542fa84f6aa20a40&oe=58949608",
  "role": "관리자",
  "likes": 300,
  "shares": 4000,
  "comments": 4000,
  "indirect_supports": [
    {
      "project_name": "hopp",
      "display_name": "목욕관",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "likes": 200,
      "shares": 320, "comments": 40
    },
    {
      "project_name": "hopp",
      "display_name": "목욕관",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "likes": 200,
      "shares": 320, "comments": 40
    },
    {
      "project_name": "hopp",
      "display_name": "목욕관",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "likes": 200,
      "shares": 320, "comments": 40
    },
    {
      "project_name": "hopp",
      "display_name": "목욕관",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "likes": 200,
      "shares": 320, "comments": 40
    }
  ],
  "direct_supports": [
    {
      "project_name": "yshproject",
      "display_name": "윤소현 작가의 독일 투어 전시 프로젝트",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "money": 40000
    },
    {
      "project_name": "yshproject",
      "display_name": "윤소현 작가의 독일 투어 전시 프로젝트",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "money": 40000
    },
    {
      "project_name": "yshproject",
      "display_name": "윤소현 작가의 독일 투어 전시 프로젝트",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "money": 40000
    },
    {
      "project_name": "yshproject",
      "display_name": "윤소현 작가의 독일 투어 전시 프로젝트",
      "photoURL": "https://i1.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/11/KakaoTalk_20161101_124029271.jpg?zoom=2&resize=562%2C312&ssl=1",
      "money": 40000
    }
  ]
}
