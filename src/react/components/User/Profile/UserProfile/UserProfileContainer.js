import React, { Component, PropTypes } from 'react'
import { fetchJSONFile } from '../../../../api/AppAPI'

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
					<h4>{display_name}의 후원 현황</h4>
					<p>{role}</p>
				</div>

				<div className="indirect-support">
					<h4>공유로 후원한 내역</h4>

					<div className="indirect-support-detail-likes">
						<p className="indirect-support-detail-text">프로젝트 공유</p>
						<h4 className="indirect-support-h4">{ likes }</h4>회
					</div>

					<div className="indirect-support-detail-comments">
						<p className="indirect-support-detail-text">좋아요</p>
						<h4 className="indirect-support-h4">{ comments.toLocaleString() }</h4>개
					</div>

					<div className="indirect-support-detail-shares">
						<p className="indirect-support-detail-text">누적후원금</p>
						<h4 className="indirect-support-h4">{ shares.toLocaleString() }</h4>원
					</div>
				</div>

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
				<p className="direct-display-name">{display_name}</p>
				</div>
				<div className="direct-display-money">{ money.toLocaleString() }원</div>
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
                    <div className="direct-supports-container">
					<h4>리워드 구매 내역</h4>
					<div className="profile-direct-supports-container">
						{directSupports}
					</div>
					</div>
				</div>
			)
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
