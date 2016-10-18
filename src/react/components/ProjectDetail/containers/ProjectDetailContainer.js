import React, { Component, PropTypes } from 'react'
import { fetchJSONFile } from '../../../api/AppAPI'

import { ProjectDetail } from '../components'

class ProjectDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			heading: {},
			rewards: [],
			overview: {},
			post: {},
			ranking: {},
			indirectSupporters: {},
			directSupporters: {},
			qna: {},

			loaded: false,
		}

		this._onSelectOptionChange = this._onSelectOptionChange.bind(this);
	}

	async componentDidMount() {
		const res = await fetchJSONFile('project')

		console.log(res);

		this.setState({
			heading: res.heading,
			rewards: res.rewards,
			overview: res.overview,
			post: res.post,
			ranking: res.ranking,
			indirectSupporters: res.indirectSupporters,
			directSupporters: res.directSupporters,
			qna: res.qna,

			loaded: true,
		})
	}

	getChildContext() {
		let {
			heading,
			rewards,
			overview,
			post,
			ranking,
			indirectSupporters,
			directSupporters,
			qna,
		} = this.state; // TODO: project should be fetch in async way

		return {
			heading,
			rewards,
			overview,
			post,
			ranking,
			indirectSupporters,
			directSupporters,
			_onSelectOptionChange: this._onSelectOptionChange,
			qna
		};
	}

	_onSelectOptionChange(o) {
		let { indirectSupporters } = this.state;


		this.setState({
			indirectSupporters: _.sortBy(indirectSupporters, o.value).reverse(),
		})

		console.log(_.sortBy(indirectSupporters, o.value));
	}

	render() {
		let {
			heading,
			rewards,
			overview,
			post,
			ranking,
			indirectSupporters,
			directSupporters,
			qna
	 } = this.state; // TODO: project should be fetch in async way

		let children = this.props.children
			&& React.cloneElement(this.props.children, {
				ranking,
				indirectSupporters,
				directSupporters,
				_onSelectOptionChange: this._onSelectOptionChange,
				getChildContext: this.getChildContext,
			});

		return this.state.loaded
			?
				<ProjectDetail
					heading={heading}
					rewards={rewards}
					overview={overview}
					post={post}
					ranking={ranking}
					indirectSupporters={indirectSupporters}
					directSupporters={directSupporters}
					_onSelectOptionChange={this._onSelectOptionChange}
					getChildContext={this.getChildContext} >
					{ children }
				</ProjectDetail>
			:
				<div></div>
	}
}

ProjectDetailContainer.childContextTypes = {
	heading: PropTypes.any,
	rewards: PropTypes.any,
	overview: PropTypes.any,
	post: PropTypes.any,
	ranking: PropTypes.any,
	indirectSupporters: PropTypes.any,
	directSupporters: PropTypes.any,
	_onSelectOptionChange: PropTypes.any,
	qna: PropTypes.any,
}

export default ProjectDetailContainer
