import React, { Component, PropTypes } from 'react'
import { fetchJSONFile } from '../../api/AppAPI'

import { ProjectDetail } from './components'

const selectOptions = [
	{
      value: "support_at",
      label: "최신순"
    },
    {
      value: "likes",
      label: "좋아요순"
    },
    {
      value: "money",
      label: "금액순"
    }
]

export default class ProjectDetailContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			abstract: {},
			creator: {},
			sponsor: {},

			funding: {},
			directSupporters: [],
			indirectSupporters: [],

			overview: {},
			summary: {},

			post: {},
			ranking: {},

			qna:{},

			selectValue: selectOptions[0].value,
			selectOptions: selectOptions,

			// heading: {},
			// rewards: [],
			// overview: {},
			// post: {},
			// ranking: {},
			// indirectSupporters: {},
			// directSupporters: {},
			// selectValue: '',
			// qna: {},
			loaded: false,
		}
	}

	async componentDidMount() {
		const res = await fetchJSONFile('project')

		this.setState({
			...res,
			loaded: true,
		})
	}

	_onSelectOptionChange = (o) => {
		let { indirectSupporters } = this.state;

		this.setState({
			indirectSupporters: _.sortBy(indirectSupporters, o.value).reverse(),
			selectValue: o.value,
		})

		console.log(_.sortBy(indirectSupporters, o.value));
	}

	render() {
		let children = this.props.children
			&& React.cloneElement(this.props.children, {
				...this.state,
				_onSelectOptionChange: this._onSelectOptionChange,
			});

		return this.state.loaded
			?
				<ProjectDetail
					{...this.state}
					_onSelectOptionChange={this._onSelectOptionChange}
				>
					{ children }
				</ProjectDetail>
			:
				<div>Loading...</div>
	}
}
