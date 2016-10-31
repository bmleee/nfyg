import React, { Component, PropTypes } from 'react';

const border = { border: '1px solid gray' }

class MagazineDetailHeading extends Component {
	render() {
		const { title, creator, imgSrc, category, descriptions, contents } = this.props;

		return (
			<div className="magazine-detail-heading">
				{/* <img src={imgSrc} alt=""/> */}
				<h2> {title} </h2>
			</div>
		)
	}
}

// title: `'Across the Universe' 어지인 작가
// 2016. 10. 7 ~ 11. 4 @레빗홀`,
// creator: {
// 	name: '어지인',
// 	iconSrc: 'https://7pictures.co.kr/wp-content/plugins/korea-sns/icons/facebook.png',
// },
// imgSrc: 'https://i0.wp.com/7pictures.co.kr/wp-content/uploads/2016/10/진영.jpg?resize=945%2C430&ssl=1',
// category: '예술 컨텐츠',
// descriptions: [
// 	'관객과 작품으로 소통하기 위해서', '누구나 알고 있는 자연을 작품의 소재로 선택하고,', '나만의 색과 기법을 통해 작품에 감성을 담아낸다.',
// ],
// contents: [
// 	{
// 		type: 'text',
// 		content: `관객과 작품으로 소통하기 위해서 누구나 알고 있는 자연을 작품의 소재로 선택하고, 나만의 색과 기법을 통해 작품에 감성을 담아낸다. 관객 또한 자연을 그린 작품을 보며 자신만의 감성으로 그 대상을 받아드린다.
//
// 결국 작품은 하나이지만 그 작품이 다양한 의미로 다시 태어나는 것, 그래서 작가와 관객 모두 작품을 통해 자신만의 감성을 경험하고 공유하는 것, 그것이 바로 내가 생각하는 작품을 통한 ‘소통’이다.
//
// 이전 전시 : ‘색, 괜찮아 잘하고 있어’_어지인, 김태경`,
// 	}
// ],
MagazineDetailHeading.propTypes = {
	title: PropTypes.string.isRequired,
	creator: PropTypes.any.isRequired,
	imgSrc: PropTypes.any.isRequired,
	category: PropTypes.any.isRequired,
	descriptions: PropTypes.any.isRequired,
	contents: PropTypes.any.isRequired,
}

export default MagazineDetailHeading;
