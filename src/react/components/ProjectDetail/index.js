import React, { Component, PropTypes } from 'react'
import update from 'immutability-helper'

import { fetchJSONFile, fetchUserAndData } from '../../api/AppAPI'

import { ProjectDetail } from './components'

const selectOptions = [
	{
      value: "support_at",
      label: "최신순"
    },
    {
      value: "likes",
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
			loaded: false,
		}
	}

	async componentDidMount() {
		const res = await fetchUserAndData()
		console.log('fetchUserAndData', res);

		const {
			user,
			data: {
				project
			}
		} = res

		const {
			selectValue,
			selectOptions,
		} = this.state

		this.props.appUtils.setUser(user)
		this.setState({
			...project,
			loaded: true,
			selectValue,
			selectOptions
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

	_newPost = (post) => {
		this.setState(update(this.state, {
			post: {
				posts: {
					$unshift: [post]
				}
			}
		}))
	}

	_newCommentOnPost = (post_id, comment) => {
		let index = this.state.post.posts.findIndex(p => p._id === post_id)
		this.setState(update(this.state, {
			post: {
				posts: {
					[index]: {
						comments: {
							$push: [comment]
						}
					}
				}
			}
		}))
	}

	_newQnA = (qna) => {
		this.setState(update(this.state, {
			qna: {
				posts: {
					$unshift: [qna]
				}
			}
		}))
	}

	_newCommentOnQnA = (qna_id, comment) => {
		let index = this.state.qna.posts.findIndex(q => q._id === qna_id)
		this.setState(update(this.state, {
			qna: {
				posts: {
					[index]: {
						comments: {
							$push: [comment]
						}
					}
				}
			}
		}))
	}

	render() {
		let props = {
			...this.state,
			_onSelectOptionChange: this._onSelectOptionChange,
			user: this.props.appUtils.getUser(),
			_newPost: this._newPost,
			_newCommentOnPost: this._newCommentOnPost,
			_newQnA: this._newQnA,
			_newCommentOnQnA: this._newCommentOnQnA,
		}

		let children = this.props.children
			&& React.cloneElement(this.props.children, {
				...props
			});

		return this.state.loaded
			?
				<ProjectDetail
					{...props}
				>
					{ children }
				</ProjectDetail>
			:
				<div>Loading...</div>
	}
}
