import React, { Component, PropTypes, Children } from 'react';
import {
	ExhibitionDetailHeading,
	ExhibitionDetailTab,
} from './';
import $ from 'jquery';
import ScrollToTop from 'react-scroll-up';

import 'babel-polyfill';

const scrollStyle = {
  cursor: 'pointer',
}

class ExhibitionDetail extends Component {
	constructor(props) {
		super(props);

		console.log('ExhibitionDetail.constructor : this.props', this.props);
	}

	componentDidMount() {

		console.log("$(document).on( 'scroll', '#project-detail', function(){ ... }")

		$(document).on( 'scroll', '#project-detail', function(){
		    console.log('Event Fired');
		});

	}




	render() {
		console.log('ExhibitionDetail', this);

		const { heading } = this.props.exhibition

		return (
			<div className="project-detail" id="project-detail">
				<ExhibitionDetailHeading { ...heading } />

				<ExhibitionDetailTab exhibitionName={heading.exhibitionName} />

				{ this.props.children /* Overview, Post, Ranking, QnA */ }
				{/* { children /* Overview, Post, Ranking, QnA */ } */}
				<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
				<button className="back-to-top" />
				</ScrollToTop>
			</div>
			)
	}

}

export default ExhibitionDetail;


const exhibition = {
	// ExhibiitonHeading
	heading: {
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/10/KakaoTalk_20161008_150354358.jpg?resize=1024%2C590&ssl=1',
		logoSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/r3028.png?zoom=2&ssl=1',
		title: '목욕관',
		remainingDays: 7,
		recent3Users: ['10153932539601313', '10153932539601313', '10153932539601313'], // TODO: ranking.recent3IndirectSupporters 와 동일...
		numSupporters: 102,
		location: '카페 KOSUI',
		schedule: '2016. 10. 10 ~ 11. 7',
	},

	// Overview
	overview: {
		part1: [
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
			{
				type: 'text',
				content: 'Overview Part1'
			},
		],
		part2: [
			{
				type: 'text',
				content: 'Overview Part2'
			}
		],
	},

	// Overview
	recommendedExhibitions: [
		{
			imgSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/어지인.jpg?resize=945%2C430&ssl=1',
			title: `‘me, myself and a girl’ 장수지 작가`,
			description: '2016. 9. 5 ~ 11. 4 @휴맥스 빌리지 2층 아트룸',
		},
		{
			imgSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/어지인.jpg?resize=945%2C430&ssl=1',
			title: `‘me, myself and a girl’ 장수지 작가`,
			description: '2016. 9. 5 ~ 11. 4 @휴맥스 빌리지 2층 아트룸',
		},
		{
			imgSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/어지인.jpg?resize=945%2C430&ssl=1',
			title: `‘me, myself and a girl’ 장수지 작가`,
			description: '2016. 9. 5 ~ 11. 4 @휴맥스 빌리지 2층 아트룸',
		},
	],

	// Artworks
	artworks: [
		{
			imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KakaoTalk_20161012_114414382.jpg?zoom=2&fit=710%2C710&ssl=1',
			description: 'Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원',
		},
		{
			imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KakaoTalk_20161012_114414382.jpg?zoom=2&fit=710%2C710&ssl=1',
			description: 'Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원',
		},
		{
			imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KakaoTalk_20161012_114414382.jpg?zoom=2&fit=710%2C710&ssl=1',
			description: 'Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원',
		},
		{
			imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_KakaoTalk_20161012_114414382.jpg?zoom=2&fit=710%2C710&ssl=1',
			description: 'Blossom light, the moon, acrylic on canvas 30cm_2016 / 300,000원',
		},
	],

	// Post
	// TODO: user's support 에 따라 contesnts가 열려있던 말던
	post: {
		heading: {
			iconSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/yshproject.png?zoom=2&ssl=1',
			description: `'목욕관'의 소식을 더 보길 원하신다면, 소식을 공유하거나 직접 후원해주세요.
목욕관이 후원자분들에게만 제공하고 있는 소식과 자료들을 바로 보실 수 있습니다!
`,
		},
		creator: {
			name: 'SAMCHIC',
			iconSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/yshproject.png?zoom=2&ssl=1',
			description: '청담 헤어 트렌드를 리드하는 프리미엄 헤어살롱 쌤시크 입니다.',
		},
		posts: [ // TODO: async paging!
			{
				opened: false,
				author: {
					name: 'SAMCHIC',
					iconSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/yshproject.png?zoom=2&ssl=1',
				},
				title: '유니온 아트페어가 개최됩니다.',
				created_at: '1992년 4월 8일',
				numSupporters: 69,
				likes: 10,
				post: [
					{
						type: 'text',
						content: '텍스트를 불러옵니다.'
					},
					{
						type: 'video',
						content: '비디오를 로딩 합니다.'
					}
				],
				comments: [
					{
						author: {
							name: '7Pictures-댓글',
							iconSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/r3028.png?zoom=2&ssl=1',
						},
						content: '7Pictures는 유니온 아트페어를 후원합니다.', // should be text type
					}
				]
			},
			{
				opened: true,
				author: {
					name: 'SAMCHIC',
					iconSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/yshproject.png?zoom=2&ssl=1',
				},
				title: '유니온 아트페어가 개최됩니다.',
				created_at: '1992년 4월 8일',
				numSupporters: 69,
				likes: 10,
				post: [
					{
						type: 'text',
						content: '텍스트를 불러옵니다.'
					},
					{
						type: 'video',
						content: '비디오를 로딩 합니다.'
					}
				],
				comments: [
					{
						author: {
							name: '7Pictures',
							iconSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/r3028.png?zoom=2&ssl=1',
						},
						content: '7Pictures는 유니온 아트페어를 후원합니다.',
					}
				]
			},
		],

	},

	// QnA
	qna: {
		selectOptions: [
			{ value: 'to-all', label: '모두에게' },
			{ value: 'to-creator', label: '창작자에게' },
		],
		posts: [
			{
				opened: true,
				author: {
					name: 'SAMCHIC',
					iconSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/yshproject.png?zoom=2&ssl=1',
				},
				title: '유니온 아트페어가 개최됩니다.',
				created_at: '1992년 4월 8일',
				numSupporters: 69,
				likes: 10,
				post: [
					{
						type: 'text',
						content: '텍스트를 불러옵니다.'
					},
					{
						type: 'video',
						content: '비디오를 로딩 합니다.'
					}
				],
				comments: [
					{
						author: {
							name: '7Pictures',
							iconSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/r3028.png?zoom=2&ssl=1',
						},
						content: '7Pictures는 유니온 아트페어를 후원합니다.',
					}
				]
			},
			{
				opened: true,
				author: {
					name: 'SAMCHIC',
					iconSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/yshproject.png?zoom=2&ssl=1',
				},
				title: '유니온 아트페어가 개최됩니다.',
				created_at: '1992년 4월 8일',
				numSupporters: 69,
				likes: 10,
				post: [
					{
						type: 'text',
						content: '텍스트를 불러옵니다.'
					},
					{
						type: 'video',
						content: '비디오를 로딩 합니다.'
					}
				],
				comments: [
					{
						author: {
							name: '7Pictures',
							iconSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/r3028.png?zoom=2&ssl=1',
						},
						content: '7Pictures는 유니온 아트페어를 후원합니다.',
					}
				]
			},
			{
				opened: true,
				author: {
					name: 'SAMCHIC',
					iconSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/yshproject.png?zoom=2&ssl=1',
				},
				title: '유니온 아트페어가 개최됩니다.',
				created_at: '1992년 4월 8일',
				numSupporters: 69,
				likes: 10,
				post: [
					{
						type: 'text',
						content: '텍스트를 불러옵니다.'
					},
					{
						type: 'video',
						content: '비디오를 로딩 합니다.'
					}
				],
				comments: [
					{
						author: {
							name: '7Pictures',
							iconSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/r3028.png?zoom=2&ssl=1',
						},
						content: '7Pictures는 유니온 아트페어를 후원합니다.',
					}
				]
			},
		]
	}
}
