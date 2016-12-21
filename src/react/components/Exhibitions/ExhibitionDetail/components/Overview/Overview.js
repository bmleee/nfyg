import React, { Component, PropTypes } from 'react';
import { Viewer } from '~/src/react/components/DraftEditor/SevenEditor';

import {
	RecommendedExhibitions,
} from './';

 

class Overview extends Component {

	state = {
		seeMore: false,
	}

	_onClick = () => {
		this.setState({
			seeMore: true,
		})
	}

	render() {
		// const { overview: { part1, part2 }, rewards } = this.props;
		const { overview: { part1, part2 }, recommendedExhibitions, } = this.props;

		// TODO: part1, part2: 에디터로 작성한 부분. 글, 동영상, 사진, ... 등 이쁘게 보여주기
		return (
			<div className="project-detail-overview">
				<div className="project-detail-overview-info">
					<Viewer raw={part1} />
					{ this.state.seeMore ? <Viewer raw={part2} /> : <button onClick={this._onClick}>더보기</button> }

					{/* <button>공유로 예술 후원</button> */}
				</div>
				{/* <RecommendedExhibitions recommendedExhibitions={recommendedExhibitions} /> */}
			</div>
		)
	}

}

export default Overview;
