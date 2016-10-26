import React, { Component, PropTypes } from 'react';

import {
	ProjectReward,
} from './';

import 'babel-polyfill';

class Overview extends Component {

	constructor() {
		super(...arguments);

		this.state = {
			seeMore: false,
		}

		this._onClick = this._onClick.bind(this)
	}

	_onClick() {
		this.setState({
			seeMore: true,
		})
	}

	render() {
		// const { overview: { part1, part2 }, rewards } = this.props;
		const { overview: { part1, part2 }, rewards } = this.context;

		let item1 = part1.map( ({type, content}, index) => (
			<div key={index}>
				<span>{type}</span>
				<span>{content}</span>
			</div>
		))

		let item2 = part2.map( ({type, content}, index) => (
			<div key={index}>
				<span>{type}</span>
				<span>{content}</span>
			</div>
		))

		// TODO: part1, part2: 에디터로 작성한 부분. 글, 동영상, 사진, ... 등 이쁘게 보여주기
		return (
			<div className="project-detail-overview">
				<div className="project-detail-overview-info">
					{item1}
					{ this.state.seeMore ? item2 : <button onClick={this._onClick}>더보기</button> }
				</div>
				
				<ProjectReward rewards={rewards} />
			</div>
		)
	}

}

Overview.contextTypes = {
	overview: PropTypes.shape({
		part1: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		})).isRequired,
		part2: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		})).isRequired,
	}).isRequired,
	rewards: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired).isRequired,
}

export default Overview;
