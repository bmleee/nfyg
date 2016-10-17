import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ExhibitionDetailTab extends Component {

	render() {

		// TODO: Apply :project_name
		return (
			<div className="exhibition-detail-tab">
				<Link to="/exhibitions/detail/"><button>Overview</button></Link>
				<Link to="/exhibitions/detail/artworks"><button>Artworks</button></Link>
				<Link to="/exhibitions/detail/post"><button>Post</button></Link>
				<Link to="/exhibitions/detail/qna"><button>문의</button></Link>
				<button>작가의 소식받기</button>
			</div>
			)
	}

}
export default ExhibitionDetailTab;
