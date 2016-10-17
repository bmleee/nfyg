import React, { Component, PropTypes } from 'react';
import {
	HomeHeader,
	PresentProjectList,
	FutureProjectList,
	ExhibitionList,
	MagazineList,
	PastProjectList,

	HomeInfo,
	HomeHeading,

} from './';

class Home extends Component {

	render() {
		const {
			presentProjects,
			futureProjects,
			recentExhibitions,
			artMagazines,
			pastProjects
		} = this.props;

		return (
			<div>
				<HomeHeader />
				<HomeInfo title="공유로 후원한 금액" amount={10000} />

				<HomeHeading title="진행 중인 프로젝트" />
				<PresentProjectList projects={presentProjects} />

				<HomeHeading title="준비 중인 프로젝트" />
				<FutureProjectList projects={futureProjects} />

				<HomeHeading title="최근 전시" />
				<ExhibitionList exhibitions={recentExhibitions} />

				<HomeHeading title="매거진" />
				<MagazineList magazines={artMagazines} />

				<HomeHeading title="종료된 프로젝트" />
				<PastProjectList projects={pastProjects} />
			</div>
			)
	}

}
export default Home;


/**
 * 진행 중인 전시
 */
const presentProjects = [
	{
		imgSrc: '/assets/images/present-project-list-thumbnail.jpg',
		creator: 'HOPP',
		title: '목욕관',
		currentMoney: 30,
		targetMoney: 100,
		numDirectSupports: 100,
		numIndirectSupports: 300,
		remainingDays: 3,
	},
	{
		imgSrc: '/assets/images/present-project-list-thumbnail.jpg',
		creator: 'HOPP',
		title: '목욕관',
		currentMoney: 30,
		targetMoney: 100,
		numDirectSupports: 100,
		numIndirectSupports: 300,
		remainingDays: 3,
	},
	{
		imgSrc: '/assets/images/present-project-list-thumbnail.jpg',
		creator: 'HOPP',
		title: '목욕관',
		currentMoney: 30,
		targetMoney: 100,
		numDirectSupports: 100,
		numIndirectSupports: 300,
		remainingDays: 3,
	},
	{
		imgSrc: '/assets/images/present-project-list-thumbnail.jpg',
		creator: 'HOPP',
		title: '목욕관',
		currentMoney: 30,
		targetMoney: 100,
		numDirectSupports: 100,
		numIndirectSupports: 300,
		remainingDays: 3,
	},
	{
		imgSrc: '/assets/images/present-project-list-thumbnail.jpg',
		creator: 'HOPP',
		title: '목욕관',
		currentMoney: 30,
		targetMoney: 100,
		numDirectSupports: 100,
		numIndirectSupports: 300,
		remainingDays: 3,
	},
];

/**
 * 준비 중인 전시
 */
const futureProjects = [
	{
		imgSrc: '/assets/images/future-project-list-thumbnail.jpg',
		title: '유기견 초상 장호성 작가의 사진집 프로젝트1',
		descriptions: [
			'거리의 수많은 동물들, ',
			'Urban beast들을 담은 사진집을 출간합니다.',
		],
		creator: {
			name: '장호성',
			iconSrc: 'assets/images/sample-icon.svg',
		},
	},
	{
		imgSrc: '/assets/images/future-project-list-thumbnail.jpg',
		title: '유기견 초상 장호성 작가의 사진집 프로젝트2',
		descriptions: [
			'거리의 수많은 동물들, ',
			'Urban beast들을 담은 사진집을 출간합니다.',
		],
		creator: {
			name: '장호성',
			iconSrc: 'assets/images/sample-icon.svg',
		},
	},
	{
		imgSrc: '/assets/images/future-project-list-thumbnail.jpg',
		title: '유기견 초상 장호성 작가의 사진집 프로젝트3',
		descriptions: [
			'거리의 수많은 동물들, ',
			'Urban beast들을 담은 사진집을 출간합니다.',
		],
		creator: {
			name: '장호성',
			iconSrc: 'assets/images/sample-icon.svg',
		},
	},
	{
		imgSrc: '/assets/images/future-project-list-thumbnail.jpg',
		title: '유기견 초상 장호성 작가의 사진집 프로젝트4',
		descriptions: [
			'거리의 수많은 동물들, ',
			'Urban beast들을 담은 사진집을 출간합니다.',
		],
		creator: {
			name: '장호성',
			iconSrc: 'assets/images/sample-icon.svg',
		},
	},
	{
		imgSrc: '/assets/images/future-project-list-thumbnail.jpg',
		title: '유기견 초상 장호성 작가의 사진집 프로젝트5',
		descriptions: [
			'거리의 수많은 동물들, ',
			'Urban beast들을 담은 사진집을 출간합니다.',
		],
		creator: {
			name: '장호성',
			iconSrc: 'assets/images/sample-icon.svg',
		},
	},
	{
		imgSrc: '/assets/images/future-project-list-thumbnail.jpg',
		title: '유기견 초상 장호성 작가의 사진집 프로젝트6',
		descriptions: [
			'거리의 수많은 동물들, ',
			'Urban beast들을 담은 사진집을 출간합니다.',
		],
		creator: {
			name: '장호성',
			iconSrc: 'assets/images/sample-icon.svg',
		},
	},
	{
		imgSrc: '/assets/images/future-project-list-thumbnail.jpg',
		title: '유기견 초상 장호성 작가의 사진집 프로젝트7',
		descriptions: [
			'거리의 수많은 동물들, ',
			'Urban beast들을 담은 사진집을 출간합니다.',
		],
		creator: {
			name: '장호성',
			iconSrc: 'assets/images/sample-icon.svg',
		},
	},
];

/**
 * 최근 전시 소식
 */
 const recentExhibitions = [
	 {
		 imgSrc: '/assets/images/recent-exhibition-thumbnail.jpg',
		 title: '시간이 있는 공간',
		 creator: {
			 name: '장호성',
			 iconSrc: 'assets/images/sample-icon.svg',
		 },
		 schedule: '9.30 ~ 10.27',
		 location: '​가비터(강남구 강남대로106길 29)',
		 linkToExhibition: '/exhibitions/sample',
	 },
	 {
		 imgSrc: '/assets/images/recent-exhibition-thumbnail.jpg',
		 title: '시간이 있는 공간',
		 creator: {
			 name: '장호성',
			 iconSrc: 'assets/images/sample-icon.svg',
		 },
		 schedule: '9.30 ~ 10.27',
		 location: '​가비터(강남구 강남대로106길 29)',
		 linkToExhibition: '/exhibitions/sample',
	 },
	 {
		 imgSrc: '/assets/images/recent-exhibition-thumbnail.jpg',
		 title: '시간이 있는 공간',
		 creator: {
			 name: '장호성',
			 iconSrc: 'assets/images/sample-icon.svg',
		 },
		 schedule: '9.30 ~ 10.27',
		 location: '​가비터(강남구 강남대로106길 29)',
		 linkToExhibition: '/exhibitions/sample',
	 },
	 {
		 imgSrc: '/assets/images/recent-exhibition-thumbnail.jpg',
		 title: '시간이 있는 공간',
		 creator: {
			 name: '장호성',
			 iconSrc: 'assets/images/sample-icon.svg',
		 },
		 schedule: '9.30 ~ 10.27',
		 location: '​가비터(강남구 강남대로106길 29)',
		 linkToExhibition: '/exhibitions/sample',
	 },
	 {
		 imgSrc: '/assets/images/recent-exhibition-thumbnail.jpg',
		 title: '시간이 있는 공간',
		 creator: {
			 name: '장호성',
			 iconSrc: 'assets/images/sample-icon.svg',
		 },
		 schedule: '9.30 ~ 10.27',
		 location: '​가비터(강남구 강남대로106길 29)',
		 linkToExhibition: '/exhibitions/sample',
	 },
	 {
		 imgSrc: '/assets/images/recent-exhibition-thumbnail.jpg',
		 title: '시간이 있는 공간',
		 creator: {
			 name: '장호성',
			 iconSrc: 'assets/images/sample-icon.svg',
		 },
		 schedule: '9.30 ~ 10.27',
		 location: '​가비터(강남구 강남대로106길 29)',
		 linkToExhibition: '/exhibitions/sample',
	 },
 ]

/**
 * Art Magazine
 */
const artMagazines = [
	{
		title: '들창코 프로젝트 ',
		imgSrc: '/assets/images/magazine-thumbnail.jpg',
		descriptions: [
			'보물섬 남해의 보물창고 이야기',
			'경남 남해에는 돌로 만든 50년 된 창고가 있따.',
			'15년 7월, 멈춰진 시간을 살고 있던 돌창고는 젊은 문화 기획자와 도예작가를 만나 다시 문을 열게 되었다.',
		],
		creator: {
			name: '들창코',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		categories: [ '보물섬', '지도' ],
	},
	{
		title: '들창코 프로젝트 ',
		imgSrc: '/assets/images/magazine-thumbnail.jpg',
		descriptions: [
			'보물섬 남해의 보물창고 이야기',
			'경남 남해에는 돌로 만든 50년 된 창고가 있따.',
			'15년 7월, 멈춰진 시간을 살고 있던 돌창고는 젊은 문화 기획자와 도예작가를 만나 다시 문을 열게 되었다.',
		],
		creator: {
			name: '들창코',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		categories: [ '보물섬', '지도' ],
	},
	{
		title: '들창코 프로젝트 ',
		imgSrc: '/assets/images/magazine-thumbnail.jpg',
		descriptions: [
			'보물섬 남해의 보물창고 이야기',
			'경남 남해에는 돌로 만든 50년 된 창고가 있따.',
			'15년 7월, 멈춰진 시간을 살고 있던 돌창고는 젊은 문화 기획자와 도예작가를 만나 다시 문을 열게 되었다.',
		],
		creator: {
			name: '들창코',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		categories: [ '보물섬', '지도' ],
	},
	{
		title: '들창코 프로젝트 ',
		imgSrc: '/assets/images/magazine-thumbnail.jpg',
		descriptions: [
			'보물섬 남해의 보물창고 이야기',
			'경남 남해에는 돌로 만든 50년 된 창고가 있따.',
			'15년 7월, 멈춰진 시간을 살고 있던 돌창고는 젊은 문화 기획자와 도예작가를 만나 다시 문을 열게 되었다.',
		],
		creator: {
			name: '들창코',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		categories: [ '보물섬', '지도' ],
	},
	{
		title: '들창코 프로젝트 ',
		imgSrc: '/assets/images/magazine-thumbnail.jpg',
		descriptions: [
			'보물섬 남해의 보물창고 이야기',
			'경남 남해에는 돌로 만든 50년 된 창고가 있따.',
			'15년 7월, 멈춰진 시간을 살고 있던 돌창고는 젊은 문화 기획자와 도예작가를 만나 다시 문을 열게 되었다.',
		],
		creator: {
			name: '들창코',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		categories: [ '보물섬', '지도' ],
	},

]

/**
 * 마감된 프로젝트
 */
const pastProjects = [
	{
		imgSrc: '/assets/images/past-project-list-thumbnail.jpg',
		title: '목욕탕',
		creator: {
			name: 'HOPP',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		currentMoney: 1200000,
		targetMoney: 1000000,
		numDirectSupports: 400,
		numIndirectSupports: 1003,
	},
	{
		imgSrc: '/assets/images/past-project-list-thumbnail.jpg',
		title: '목욕탕',
		creator: {
			name: 'HOPP',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		currentMoney: 1200000,
		targetMoney: 1000000,
		numDirectSupports: 400,
		numIndirectSupports: 1003,
	},
	{
		imgSrc: '/assets/images/past-project-list-thumbnail.jpg',
		title: '목욕탕',
		creator: {
			name: 'HOPP',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		currentMoney: 1200000,
		targetMoney: 1000000,
		numDirectSupports: 400,
		numIndirectSupports: 1003,
	},
	{
		imgSrc: '/assets/images/past-project-list-thumbnail.jpg',
		title: '목욕탕',
		creator: {
			name: 'HOPP',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		currentMoney: 1200000,
		targetMoney: 1000000,
		numDirectSupports: 400,
		numIndirectSupports: 1003,
	},
	{
		imgSrc: '/assets/images/past-project-list-thumbnail.jpg',
		title: '목욕탕',
		creator: {
			name: 'HOPP',
			iconSrc: '/assets/images/sample-icon.svg',
		},
		currentMoney: 1200000,
		targetMoney: 1000000,
		numDirectSupports: 400,
		numIndirectSupports: 1003,
	},
]
