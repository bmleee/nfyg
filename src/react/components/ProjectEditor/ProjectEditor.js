import React, { Component, PropType } from 'react'
import ProjectEditorTab from './ProjectEditorTab'
import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { upload_file } from '~/src/react/api/AppAPI'
import * as actionCreators from '../../actions/ProjectEditorActionCreators'

import { canUseDOM } from '~/src/lib/utils'

const API_URL = '/api/test-api/sponsor'

import _ from 'lodash' // use throttle or debounce
import 'whatwg-fetch'
import 'babel-polyfill'

const scrollStyle = {
  cursor: 'pointer',
}

export default class ProjectEditor extends Component {

	state = {
		// Abstract
		abstract: {
			longTitle: '',     //
			shortTitle: '',    //
			imgSrc: '',         //
			category: '',       // 건강, 라이프, ...
			projectName: '',   // projects/:project_name
			state: '', 			 // not_started, started, finished
			postIntro: '',
		},

		creator: {
			creatorName: '',
			creatorImgSrc: '',
			creatorLocation: '',
			creatorDescription: '',
		},

		sponsor: {
			sponsorName: '',
		},

		// Funding
		funding: {
			currentMoney: 0,   // 직접 / 간접 후원에 의해 추가됨
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

	componentWillMount() {
		// 서버에서 State를 가져와 채워야 한다면 ...
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
				<div className="exhibition-editor">
					<ProjectEditorTab
						save={this.save}
					/>
					 { children }
				<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
				<button className="back-to-top" />
				</ScrollToTop>	
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
		_onShortTitleSubmit: (shortTitle) => this.setState(update(this.state, {
			abstract: {
				shortTitle: { $set: shortTitle }
			}
		})),
		_onImgSrcSubmit: (imgSrc) => this.setState(update(this.state, {
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
		_onStateSubmit: (state) => this.setState(update(this.state, {
			abstract: {
				state: { $set: state }
			}
		})),
		_onPostIntroSubmit: (postIntro) => this.setState(update(this.state, {
			abstract: {
				postIntro: { $set: postIntro }
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
		_onSponsorNameSubmit: (sponsorName) => this.setState(update(this.state, {
			sponsor: {
				sponsorName: { $set: sponsorName }
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
		_onPart1Submit: (raw) => this.setState(update(this.state, {
			overview: {
				part1: { $set: raw }
			}
		})),
		_onPart2Submit: (raw) => this.setState(update(this.state, {
			overview: {
				part2: { $set: raw }
			}
		}))
	}

	// 서버로 전송
	save = async () => {
		console.log('state', this.state);
		try {
			const res = await axios.post(API_URL, {...this.state})
			console.log('save response', res);
		} catch (e) {
			console.error('save error', e);
		}
	}

	// 서버에서 받기
	fetchProject = async () => {

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
