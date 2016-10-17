import React, { Component, PropTypes } from 'react';

const borderStyle = { border: '1px solid gray' }

class ProjectReward extends Component {

	render() {
		// const { rewards } = this.props;
		const { rewards } = this.context;

		const items = rewards.map( ({title, description}, index) => {
			title = title.split('\n').map((t, index) => (<span key={index}>{t}<br/></span>));

			return (
				<div key={index}>
					<div className="project-detail-reward-title" style={borderStyle}>
						{title}
					</div>
					<span>{description}</span>
				</div>
			)
		})

		return (
			<div className="project-detail-reward">
				{ items }
			</div>
		)
	}

}

ProjectReward.contextTypes = {
	rewards: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})).isRequired,
}
export default ProjectReward;
