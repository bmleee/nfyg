import React, { Component, PropType } from 'react'
import ProjectEditorTab from './ProjectEditorTab'

import update from 'immutability-helper'

import { ProjectEditorConstants as CONSTANTS } from '../../constants'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { upload_file } from '~/src/react/api/AppAPI'
import * as actionCreators from '../../actions/ProjectEditorActionCreators'

import { canUseDOM } from '~/src/lib/utils'

import _ from 'lodash' // use throttle or debounce

import 'babel-polyfill'

export default class ProjectEditor extends Component {

	state = {
		// Abstract
		abstract: {
			longTitle: '',     //
			shortTitle: '',    //
			imgSrc: '',         //
			category: '',       // 건강, 라이프, ...
			projectName: '',   // projects/:project_name
		},

		creator: {
			creatorName: '',
			creatorImgSrc: '',
			creatorLocation: ''
		},

		// Funding
		funding: {
			currentMonoey: 0,   // 직접 / 간접 후원에 의해 추가됨
			targetMoney: 0,
			dateFrom: new Date().toISOString().substring(0, 10),     							// 작성 시작 일
			dateTo: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().substring(0, 10),	// 바로 다음날
			reward: {
				rewards: [],
				newReward: { // temporary state to insert...
					title: '',
					description: '',
					isDirectSupport: false,
					thresholdMoney: 0
				}
			}         // { title, description, isDirectSupport: T/F, threshold: 직접 후원 금액 또는 좋아요, 리공유 수, 전달일 }
		},

		// Overview
		overview: {
			intro:'',
			part1: '',
			part2: ''
		}
	}

  render() {
		let {
			children
		}  = this.props

		children = children && React.cloneElement(children, {
			...this.state,
			// Abstract
			...this.abstractSubmitCallbacks,
			// Funding
			...this.fundingSubmitCallbacks,
			rewardHandlers: this.rewardHandlers,
			// Overview
			...this.overviewSubmitCallbacks,
		})

		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="project-editor">
					<ProjectEditorTab />
					 { children }
				</div>
			)
		}
	}

	// Abstract
	abstractSubmitCallbacks = {
		_onLongTitleSubmit: (longTitle) => {
			this.setState(update(this.state, {
				abstract: {
					longTitle: { $set: longTitle }
				}
			}))
		},
		_onShortTitleSubmit: () => (shortTitle) => this.setState(update(this.state, {
			abstract: {
				shortTitle: { $set: shortTitle }
			}
		})),
		_onImgSrcSubmit: () => (imgSrc) => this.setState(update(this.state, {
			abstract: {
				imgSrc: { $set: imgSrc }
			}
		})),
		_onCategorySubmit: (category) => this.setState(update(this.state, {
			abstract: {
				category: { $set: category }
			}
		})),
		_onProjectNameSubmit: (projectName) => this.setState(update(this.state, {
			abstract: {
				projectName: { $set: projectName }
			}
		})),
		_onCreatorNameSubmit: (creatorName) => this.setState(update(this.state, {
			creator: {
				creatorName: { $set: creatorName }
			}
		})),
		_onCreatorImgSrcSubmit: (creatorImgSrc) => this.setState(update(this.state, {
			creator: {
				creatorImgSrc: { $set: creatorImgSrc }
			}
		})),
		_onCreatorDescriptionSubmit: (creatorDescription) => this.setState(update(this.state, {
			creator: {
				creatorDescription: { $set: creatorDescription }
			}
		})),
	}

	// Funding
	fundingSubmitCallbacks = {
		_onTargetMoneySubmit: (targetMoney) => this.setState(update(this.state, {
			funding: {
				targetMoney: { $set: Number(targetMoney) }
			}
		})),
		_onDateToSubmit: (dateTo) => this.setState(update(this.state, {
			funding: {
				dateTo: { $set: dateTo }
			}
		})),
		_onRewardSubmit: ({newReward}) => this.setState(update(this.state, {
			funding: {
				reward: {
					rewards: {
						$push: [{...newReward}]
					},
					newReward: {
						title: { $set: '' },
						description: { $set: '' },
						isDirectSupport: { $set: false },
						thresholdMoney: { $set: 0 }
					}
				}
			}
		}))
	}
	rewardHandlers = {
		_onTitle: (e) => {
			this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							title: { $set: e.target.value }
						}
					}
				}
			}))
		},
		_onDescription: (e) => {
			this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							description: { $set: e.target.value }
						}
					}
				}
			}))
		},
		_onIsDirectSupport: (e) => {
			this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							isDirectSupport: { $set: e.value } // react-select
						}
					}
				}
			}))
		},
		_onThresholdMoney: (e) => {
			this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							thresholdMoney: { $set: Number(e.target.value) }
						}
					}
				}
			}))
		},
		deleteReward: (index) => {
			this.setState(update(this.state, {
				funding: {
					reward: {
						rewards: {
							$splice: [
								[index, 1]
							]
						}
					}
				}
			}))
		}
	}
	// Overview
	overviewSubmitCallbacks = {
		_onIntroSubmit: (intro) => {
			this.setState(update(this.state, {
				overview: {
					intro: { $set: intro }
				}
			}))
		},
		_onPart1Submit: (value) => this.setState(update(this.state, {
			overview: {
				part1: { $set: value.toString('html') }
			}
		})),
		_onPart2Submit: (value) => this.setState(update(this.state, {
			overview: {
				part2: { $set: value.toString('html') }
			}
		}))
	}
}

// const mapStateToProps = (state) => ({
// 	ProjectEditor: state.ProjectEditor
// })
//
// // attach dispatch to just simple actions (async actions cannot be detached). for optional bind refer https://github.com/reactjs/redux/issues/363
// const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
//
// export const ProjectEditorContainer = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(ProjectEditor)
