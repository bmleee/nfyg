import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import 'babel-polyfill';

class PastProjectList extends Component {

	render() {

		let { projects } = this.props;

		let items = projects.map( ({
			title,
			imgSrc,
			creator: {
				name,
				iconSrc,
			},
			currentMoney,
			targetMoney,
			numDirectSupports,
			numIndirectSupports,
		}, index) => (
			<div key={index} className="past-project-list-item">
				<img src={imgSrc} alt=""/>
				{title}
				<br/>
				<img width={36} src={iconSrc} alt=""/> { name }
				<br/>
				총 후원액 {currentMoney} | 목표 후원액 {targetMoney} | 직접 후원 {numDirectSupports}명 | 간접 후원 {numIndirectSupports}명 _신청마감_
			</div>
		))


		return (
			<div className="past-project-list">
				<div className="past-project-list-container">
					{ items }
				</div>
				<div className="past-project-list-button">
					<button>더 많은 매거진 보기</button>
				</div>
			</div>
		)
	}

}

PastProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		creator: PropTypes.shape({
			name: PropTypes.string.isRequired,
			iconSrc: PropTypes.string.isRequired,
		}),
		currentMoney: PropTypes.number.isRequired,
		targetMoney: PropTypes.number.isRequired,
		numDirectSupports: PropTypes.number.isRequired,
		numIndirectSupports: PropTypes.number.isRequired,
	})).isRequired,
}
export default PastProjectList;
