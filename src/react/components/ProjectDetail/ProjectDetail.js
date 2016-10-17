import React, { Component, PropTypes, Children } from 'react';
import {
	ProjectHeading,
	ProjectTab,
} from './';

import 'babel-polyfill';

const project = {
	// ProjectHeading
	heading: {
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/edd/2016/10/KakaoTalk_20161008_150354358.jpg?resize=1024%2C590&ssl=1',
		logoSrc: 'https://i1.wp.com/7pictures.co.kr/wp-content/themes/unity/templates/campaign/thumbimg/r3028.png?zoom=2&ssl=1',
		title: '목욕관',
		remainingDays: 7,
		likes: 500,
		shares: 103,
		comments: 75,
		numIndirectSupports: 11,
		numDirectSupports: 103,
		recent3Users: ['10153932539601313', '10153932539601313', '10153932539601313'], // TODO: ranking.recent3IndirectSupporters 와 동일...
		currentMoney: 137200,
		targetMoney: 1000000,
	},

	// Overview
	overview: {
		part1: [
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
	rewards: [
		{
			title: '공유: 1000원\n좋아요/리공유/댓글: 200원',
			description: '프로젝트 공유로 후원된 금액을 ‘7Pictures’에서 후원합니다.'
		},
		{
			title: '공유: 1000원\n좋아요/리공유/댓글: 200원',
			description: '프로젝트 공유로 후원된 금액을 ‘7Pictures’에서 후원합니다.'
		},
		{
			title: '공유: 1000원\n좋아요/리공유/댓글: 200원',
			description: '프로젝트 공유로 후원된 금액을 ‘7Pictures’에서 후원합니다.'
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

	// Ranking
	ranking: {
		recent3DirectSupporters: ['10153932539601313', '10153932539601313', '10153932539601313'],
		recent3IndirectSupporters: ['10153932539601313', '10153932539601313', '10153932539601313'],
		selectOptions: [
			{ value: 'support_at', label: '최신순', },
			{ value: 'likes', label: '좋아요순', },
			{ value: 'money', label: '금액순', },
		],
	},

	// Ranking
	directSupporters: [
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 34000,
			support_at: 1476254937264
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 34000,
			support_at: 1476254937264
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 34000,
			support_at: 1476254937264
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 34000,
			support_at: 1476254937264
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 34000,
			support_at: 1476254937264
		},
	],

	// Ranking
	indirectSupporters: [
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 3400,
			support_at: 1476254937224,
			message: `본격 '목욕'문화 잡지라.... 안에 내용부터, 공연까지 심상치 않은 프로젝트입니다-`,
			likes: 1,
			comments: 20,
			shares: 3,
			rank: 2,
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 1234,
			support_at: 1476354537264,
			message: `본격 '목욕'문화 잡지라.... 안에 내용부터, 공연까지 심상치 않은 프로젝트입니다-`,
			likes: 10,
			comments: 20,
			shares: 3,
			rank: 3,
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 1111,
			support_at: 1476254337264,
			message: `본격 '목욕'문화 잡지라.... 안에 내용부터, 공연까지 심상치 않은 프로젝트입니다-`,
			likes: 100,
			comments: 20,
			shares: 3,
			rank: 4,
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 1,
			support_at: 1476554933264,
			message: `본격 '목욕'문화 잡지라.... 안에 내용부터, 공연까지 심상치 않은 프로젝트입니다-`,
			likes: 1000,
			comments: 20,
			shares: 3,
			rank: 5,
		},
		{
			fbId: '10153932539601313',
			name: '전희재',
			money: 342323000,
			support_at: 1432254937264,
			message: `본격 '목욕'문화 잡지라.... 안에 내용부터, 공연까지 심상치 않은 프로젝트입니다-`,
			likes: 10000,
			comments: 20,
			shares: 3,
			rank: 1,
		},
	],

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

class ProjectDetail extends Component {
	constructor() {
		super(...arguments);

		this.state = Object.assign({}, project);

		this.getChildContext 				= this.getChildContext.bind(this);
		this._onSelectOptionChange 	= this._onSelectOptionChange.bind(this);
	}

	getChildContext() {
		let {
			heading,
			rewards,
			overview,
			post,
			ranking,
			indirectSupporters,
			directSupporters,
			qna,
		} = this.state; // TODO: project should be fetch in async way

		return {
			heading,
			rewards,
			overview,
			post,
			ranking,
			indirectSupporters,
			directSupporters,
			_onSelectOptionChange: this._onSelectOptionChange.bind(this),
			qna
		};
	}
	
	_onSelectOptionChange(o) {
		let { indirectSupporters } = this.state;


		this.setState({
			indirectSupporters: _.sortBy(indirectSupporters, o.value).reverse(),
		})

		console.log(_.sortBy(indirectSupporters, o.value));
	}

	render() {
		let {
			heading,
			rewards,
			overview,
			post,
			ranking,
			indirectSupporters,
			directSupporters,
			qna
	 } = this.state; // TODO: project should be fetch in async way

		let children = this.props.children
			&& React.cloneElement(this.props.children, {
				ranking,
				indirectSupporters,
				directSupporters,
				_onSelectOptionChange: this._onSelectOptionChange,
			});

		console.log('children', children);

		return (
			<div className="project-detail">
				<ProjectHeading { ...heading } />

				<ProjectTab />

				{ /* this.props.children /* Overview, Post, Ranking, QnA */ }
				{ children /* Overview, Post, Ranking, QnA */ }
			</div>
			)
	}

}


ProjectDetail.childContextTypes = {
	heading: PropTypes.any,
	rewards: PropTypes.any,
	overview: PropTypes.any,
	post: PropTypes.any,
	ranking: PropTypes.any,
	indirectSupporters: PropTypes.any,
	directSupporters: PropTypes.any,
	_onSelectOptionChange: PropTypes.any,
	qna: PropTypes.any,
}

export default ProjectDetail;
