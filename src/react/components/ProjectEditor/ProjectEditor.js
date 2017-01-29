import React, { Component, PropType } from 'react'
import Helmet from 'react-helmet'

import ProjectEditorTab from './ProjectEditorTab'
import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

import axios from 'axios'

import { fetchUserAndData, upload_file, createProject, updateProject } from '../../api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'

import draftToHtml from 'draftjs-to-html'

import _ from 'lodash' // use throttle or debounce

const scrollStyle = {
  cursor: 'pointer',
}

export default class ProjectEditor extends Component {

	state = {
    tabLinkBase: '',
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
      shippingFee: 0,
			reward: {
				rewards: [],
				newReward: { // temporary state to insert...
					title: '',
					description: '',
					isDirectSupport: false,
          imgSrc: '',
          maxPurchaseVolume: 0,
          shippingDay: '',
					thresholdMoney: 0
				}
			}         // { title, description, isDirectSupport: T/F, threshold: 직접 후원 금액 또는 좋아요, 리공유 수, 전달일 }
		},

		// Overview
		overview: {
			intro:'',
			part1: '',
			part2: ''
		},

    // related contents
    relatedContent: {
			contents: [],
			newContent: {
				imgSrc: '',
        title: '',
				link: '',
			}
		},
	}

	async componentDidMount() {

    try {

      // 서버에서 State를 가져와 채워야 한다면 ...
      const {
        user,
        data
      } = await fetchUserAndData()

      console.log('fetched project', data);

      let tabLinkBase = `/${(document.URL.match(/projects\/.+\/edit/) || ['project-editor'])[0]}`

      appUtils.setUser(user)

      if(data && data.project) {
        this.setState({
          ...this.server2client(data.project),
          tabLinkBase
        })

        console.log(this.state)
      } else {
        this.setState({
          tabLinkBase
        })
      }
    } catch (e) {
      console.error(e);
      alert(e.message)
      this.props.history.goBack()
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
			contentHandlers: this.contentHandlers,

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
          <Helmet
            title="Latest Updates"
            meta={[
                {property: 'og:title', content: 'Latest Updates'},
            ]}
          />

					<ProjectEditorTab
            tabLinkBase={this.state.tabLinkBase}
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
		_onProjectNameSubmit: (projectName) => {
      if(!this.state.abstract.projectName) {
        this.setState(update(this.state, {
    			abstract: {
    				projectName: { $set: projectName }
    			}
    		}))
      } else {
        alert(`You can't modify ProjectName!`)
      }
    },
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
    _onContentSubmit: ({newContent}) => this.setState(update(this.state, {
			relatedContent: {
        contents: { $push: [{...newContent}] },
        newContent: {
          imgSrc: { $set: '' },
          link: { $set: '' },
          title: { $set: '' },
        }
      }
		}))
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
		_onShippingFeeSubmit: (shippingFee) => this.setState(update(this.state, {
			funding: {
				shippingFee: { $set: Number(shippingFee) }
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
						thresholdMoney: { $set: 0 },
            maxPurchaseVolume: { $set: 0 },
            shippingDay: { $set: ' '},
            imgSrc: { $set: ' '},
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
    _onShippingDay: (e) => {
      this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							shippingDay: { $set: e.target.value }
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
    _onImgSrc: async (e) => {
      let { sourceURL } = await upload_file(e.target.files[0])

      this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							imgSrc: { $set: sourceURL }
						}
					}
				}
			}))
		},
    _onMaxPurcahseVolum: (e) => {
      this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							maxPurchaseVolume: { $set: Number(e.target.value) }
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

  // Content
	contentHandlers = {
	   _onImgSrc: async (e) => {
       let { sourceURL } = await upload_file(e.target.files[0])

       this.setState(update(this.state, {
         relatedContent: {
           newContent: {
             imgSrc: { $set: sourceURL },
           }
         }
       }))
     },
     _onLink: (e) => this.setState(update(this.state, {
       relatedContent: {
         newContent: {
           link: { $set: e.target.value },
         }
       }
     })),
     _onTitle: (e) => this.setState(update(this.state, {
       relatedContent: {
         newContent: {
           title: { $set: e.target.value },
         }
       }
     })),
     deleteContent: (index) => this.setState(update(this.state, {
       relatedContent: {
         contents: {
           $splice: [
             [index, 1]
           ]
         }
       }
     })),
	}

  client2server = () => {
    console.log('state', this.state);
    return {
      abstract: this.state.abstract,
      creator: this.state.creator,
      sponsor: this.state.sponsor,
      funding: {
        currentMoney: this.state.funding.currentMoney,
        targetMoney: this.state.funding.targetMoney,
        dateFrom: this.state.funding.dateFrom,
        dateTo: this.state.funding.dateTo,
        shippingFee: this.state.funding.shippingFee,
        rewards: this.state.funding.reward.rewards,
      },
      overview: {
        intro: this.state.overview.intro,
        part1: {
          raw: JSON.stringify(this.state.overview.part1),
          html: draftToHtml(this.state.overview.part1),
        },
        part2: {
          raw: JSON.stringify(this.state.overview.part2),
          html: draftToHtml(this.state.overview.part2),
        },
      },
      isNew: this.state.tabLinkBase.includes('editor'),
      relatedContents: this.state.relatedContent.contents
    }
  }

  server2client = (project) => update(this.state, {
    abstract: { $set: project.abstract },
    creator: { $set: project.creator },
    sponsor: {
      sponsorName: { $set: project.sponsor }
    },
    funding: {
      currentMoney: { $set: project.funding.currentMoney },
      targetMoney: { $set: project.funding.targetMoney },
      dateFrom: { $set: project.funding.dateFrom },
      dateTo: { $set: project.funding.dateTo },
      shippingFee: { $set: project.funding.shippingFee },
      reward: {
        rewards: { $set: project.funding.rewards }
      },
    },
    overview: {
      intro: { $set: project.overview.intro },
      part1: { $set: JSON.parse(project.overview.part1.raw) },
      part2: { $set: JSON.parse(project.overview.part2.raw) },
    },
    relatedContent: {
      contents: { $set: project.relatedContents },
    },
  })

  // 서버로 전송
	save = async () => {
    console.log('state', this.state);
    let body = this.client2server()

    try {
      let r;

      if(this.props.params.projectName) {
        r = await updateProject(this.props.params.projectName, body)
      } else {
        r = await createProject(body)
      }

      console.log(r);
      this.props.appUtils.setFlash({title: 'project saved', message: JSON.stringify(r, undefined, 4), level: 'success'})
    } catch (e) { // error from axios.request
      console.log(e);
      this.props.appUtils.setFlash({title: 'project save error', message: JSON.stringify(e.response, undefined, 4), level: 'error', autoDismiss: 0, dismissible: true})
    }
  }
}
