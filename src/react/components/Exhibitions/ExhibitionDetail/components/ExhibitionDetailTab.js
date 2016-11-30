import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ExhibitionDetailTab extends Component {
	
	render() {

		// TODO: Apply :project_name
		return (
			<div className="project-detail-tab">
				<Link to="/exhibitions/detail/"><button className="project-tab">OVERVIEW</button></Link>
				<Link to="/exhibitions/detail/artworks"><button className="project-tab">WORKS</button></Link>
				{/* <Link to="/exhibitions/detail/post"><button className="project-tab">Post</button></Link> */}
				<Link to="/exhibitions/detail/qna"><button className="project-tab">문의</button></Link>
				{/* <button>작가의 소식받기</button> */}
			</div>
			)
	}

}
export default ExhibitionDetailTab;
