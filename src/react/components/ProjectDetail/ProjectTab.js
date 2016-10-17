import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ProjectTab extends Component {

	render() {

		// TODO: Apply :project_name
		return (
			<div className="project-detail-tab">
				<Link to="/projects/"><button>Overview</button></Link>
				<Link to="/projects/post"><button>Post</button></Link>
				<Link to="/projects/ranking"><button>공유 랭킹</button></Link>
				<Link to="/projects/qna"><button>문의</button></Link>
				<button>후원하기</button>
			</div>
			)
	}

}
export default ProjectTab;
