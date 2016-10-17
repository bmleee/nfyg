import React, { Component, PropTypes } from 'react';

import {
	MagazinesHeading,
	MagazinesList,
} from './'

import 'babel-polyfill'

const categories = ['전체', '문화공간', '전시 / 미술관', '예술 컨텐츠', '예술 정보', '구매 및 소장', '구매']
const magazines = [
	{
		title: `'Across the Universe' 어지인 작가
2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '예술 컨텐츠',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},
	{
		title: `'Across the Universe' 어지인 작가
2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '예술 컨텐츠',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},
	{
		title: `'Across the Universe' 어지인 작가
2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '예술 컨텐츠',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},
	{
		title: `'Across the Universe' 어지인 작가
2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '문화공간',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},

	{
		title: `'Across the Universe' 어지인 작가
	2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '문화공간',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

	결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

	이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},

	{
		title: `'Across the Universe' 어지인 작가
	2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '문화공간',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

	결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

	이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},

	{
		title: `'Across the Universe' 어지인 작가
	2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '문화공간',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

	결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

	이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},

	{
		title: `'Across the Universe' 어지인 작가
	2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '문화공간',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

	결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

	이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},

	{
		title: `'Across the Universe' 어지인 작가
	2016. 10. 7 ~ 11. 4 @레빗홀`,
		creator: {
			name: '어지인',
			iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
		},
		imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
		category: '문화공간',
		descriptions: [
			'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
		],
		contents: [
			{
				type: 'text',
				content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.

	결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.

	이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
			}
		],
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
		]
	},

]

class Magazines extends Component {

	constructor() {
		super(...arguments);

		this.state = Object.assign({}, {
			magazines,
			categories,
			filteredMagazines: magazines,
			currentCategory: categories[0],
		});

		this._onChangeCategory			= this._onChangeCategory.bind(this);
	}

	_onChangeCategory(category) {
		let newList = [];

		if (category === categories[0]) newList = Object.assign([], this.state.magazines)
		else newList = this.state.magazines.filter( s => s.category === category)

		this.setState({
			filteredMagazines: newList,
			currentCategory: category,
		})
	}

	render() {
		console.log('im im magazine');
		const { Magazines, filteredMagazines, categories, currentCategory } = this.state;

		return (
			<div className="magazines">

				<MagazinesHeading
					currentCategory={currentCategory}
					categories={categories}
					_onChangeCategory={this._onChangeCategory} />

				<MagazinesList magazines={filteredMagazines} />

			</div>
		)
	}

}


export default Magazines;
