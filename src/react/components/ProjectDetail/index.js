import React, { Component, PropTypes } from 'react'
import DocumentMeta from 'react-document-meta';

import update from 'immutability-helper'

import { canUseDOM } from '~/src/lib/utils'

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
		window.scrollTo(0, 0)
		
		const res = await fetchUserAndData()
		// console.log(this);

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

		// console.log(_.sortBy(indirectSupporters, o.value));
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

	_deletePost = (post_id) => {
		let index = this.state.post.posts.findIndex(p => p._id === post_id)
		this.setState(update(this.state, {
			post: {
				posts: {
					$splice: [
						[index, 1]
					]
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

	_deleteCommentOnPost = (post_id, comment_index) => {
		let index = this.state.post.posts.findIndex(p => p._id === post_id)
		this.setState(update(this.state, {
			post: {
				posts: {
					[index]: {
						comments: {
							$splice: [
								[ comment_index, 1]
							]
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

	_deleteQnA = (qna_id) => {
		let index = this.state.qna.posts.findIndex(q => q._id === qna_id)
		this.setState(update(this.state, {
			qna: {
				posts: {
					$splice: [
						[index, 1]
					]
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

	_deleteCommentOnQnA = (qna_id, comment_index) => {
		let index = this.state.qna.posts.findIndex(p => p._id === qna_id)
		this.setState(update(this.state, {
			qna: {
				posts: {
					[index]: {
						comments: {
							$splice: [
								[ comment_index, 1]
							]
						}
					}
				}
			}
		}))
	}

	render() {
		let abstract = this.state.abstract

		let meta = canUseDOM && abstract && {
			title: abstract.longTitle,
			meta: {
				'og:image': `${window.location.protocol}//${window.location.host}${abstract.imgSrc}`,
				'og:description' : abstract.postIntro,
			}
		}

		let props = {
			...this.state,
			_onSelectOptionChange: this._onSelectOptionChange,
			user: this.props.appUtils.getUser(),
			_newPost: this._newPost,
			_deletePost: this._deletePost,
			_newCommentOnPost: this._newCommentOnPost,
			_deleteCommentOnPost: this._deleteCommentOnPost,
			_newQnA: this._newQnA,
			_deleteQnA: this._deleteQnA,
			_newCommentOnQnA: this._newCommentOnQnA,
			_deleteCommentOnQnA: this._deleteCommentOnQnA,
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
					<DocumentMeta {...meta} />
					{ children }
				</ProjectDetail>
			:
				<div className="home-is-loading"></div>
	}
}
