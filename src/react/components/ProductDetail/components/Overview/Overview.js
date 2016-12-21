import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor';

import {
	ProductReward,
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
		let {
			overview: {
				intro,
				part1,
				part2
			},
			funding: {
				rewards
			}
		} = this.props;

		return (
			<div className="project-detail-overview">
				<ProductReward rewards={rewards} />

				<div className="project-detail-overview-info">
					<Viewer raw={part1} />
					{ this.state.seeMore ? <Viewer raw={part2} /> : <button onClick={this._onClick}>더보기</button> }
				</div>
			</div>
		)
	}

}

export default Overview;
