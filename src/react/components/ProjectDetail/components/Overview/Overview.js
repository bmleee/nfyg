import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor';

import {
	ProjectReward,
} from './';

 

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
			abstract: {
				projectName
			},
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
				<div className="project-detail-overview-info">
					<Viewer raw={part1} />
				</div>
				
				<ProjectReward projectName={projectName} rewards={rewards} />
				
				<div className="project-detail-overview-info">
					<Viewer raw={part2} />
				</div>
			</div>
		)
	}

}

export default Overview;
