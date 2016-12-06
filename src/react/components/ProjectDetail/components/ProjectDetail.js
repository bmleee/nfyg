import React, { Component, PropTypes, Children } from 'react';
import {
	ProjectHeading,
	ProjectTab,
} from './';

class ProjectDetail extends Component {

	render() {
		let {
			loaded
		} = this.props;

		if (loaded) {
			return (
				<div className="project-detail">
					<ProjectHeading {...this.props} />
					<ProjectTab />
					{ this.props.children /* Overview, Post, Ranking, QnA */ }
				</div>
			)
		} else {
			return <div>Loading...</div>
		}

	}

}

export default ProjectDetail;
