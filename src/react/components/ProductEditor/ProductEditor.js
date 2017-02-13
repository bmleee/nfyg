import React, { Component, PropType } from 'react'
import ProductEditorTab from './ProductEditorTab'
import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

import { fetchUserAndData, upload_file, createProduct, updateProduct } from '../../api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'

import draftToHtml from 'draftjs-to-html'

import _ from 'lodash' // use throttle or debounce


const scrollStyle = {
  cursor: 'pointer',
}

export default class ProductEditor extends Component {

	state = {
    tabLinkBase: '',

		// Abstract
		abstract: {
			longTitle: '',     //
			shortTitle: '',    //
			imgSrc: '',         //
			category: '',       // 건강, 라이프, ...
			productName: '',   // products/:product_name
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
      shippingFee: 0,
      minPurchaseVolume: 0, // add/fix product model, toFormat, wrapper, form, submit callback,
      maxPurchaseVolume: 10000, // add/fix product model, toFormat, wrapper, form, submit callback,
			dateFrom: new Date().toISOString().substring(0, 10),     							// 작성 시작 일
			dateTo: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().substring(0, 10),	// 바로 다음날
			reward: { // Depreciated
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
			},         // { title, description, isDirectSupport: T/F, threshold: 직접 후원 금액 또는 좋아요, 리공유 수, 전달일 }
      faq: { // add/fix product model, toFormat, wrapper, form, submit callback, handlers
        faqs: [],
        newFaq: {
          question: '',
          answer: '',
        }
      }
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
        title: '',
				imgSrc: '',
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

      console.log('fetched data', data);

      let tabLinkBase = `/${(document.URL.match(/products\/.+\/edit/) || ['product-editor'])[0]}`

      appUtils.setUser(user)

      if(data && data.product) {
        this.setState({
          ...this.server2client(data.product),
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
      faqHandlers: this.faqHandlers,

			// Overview
			...this.overviewSubmitCallbacks,
		})

		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="exhibition-editor">
					<ProductEditorTab
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
		_onProductNameSubmit: (productName) => {
      if(!this.state.abstract.productName) {
        this.setState(update(this.state, {
    			abstract: {
    				productName: { $set: productName }
    			}
    		}))
      } else {
        alert(`You can't modify ProductName!`)
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
    _onMinBuyerSubmit: (minPurchaseVolume) => this.setState(update(this.state, {
      funding: {
        minPurchaseVolume: { $set: Number(minPurchaseVolume) }
      }
    })),
    _onMaxBuyerSubmit: (maxPurchaseVolume) => this.setState(update(this.state, {
      funding: {
        maxPurchaseVolume: { $set: Number(maxPurchaseVolume) }
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
		})),
    _onFaqSubmit: ({newFaq}) => this.setState(update(this.state, {
      funding: {
        faq: {
          faqs: {
            $push: [{...newFaq}]
          },
          newFaq: {
            question: { $set: '' },
            answer: { $set: '' },
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

  faqHandlers = {
		_onQuestion: (e) => {
			this.setState(update(this.state, {
				funding: {
					faq: {
						newFaq: {
							question: { $set: e.target.value }
						}
					}
				}
			}))
		},
		_onAnswer: (e) => {
			this.setState(update(this.state, {
				funding: {
					faq: {
						newFaq: {
							answer: { $set: e.target.value }
						}
					}
				}
			}))
		},
		deleteFAQ: (index) => {
			this.setState(update(this.state, {
				funding: {
					faq: {
						faqs: {
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
      funding: {
        currentMoney: this.state.funding.currentMoney,
        targetMoney: this.state.funding.targetMoney,
        dateFrom: this.state.funding.dateFrom,
        dateTo: this.state.funding.dateTo,
        shippingFee: this.state.funding.shippingFee,
        minPurchaseVolume: this.state.funding.minPurchaseVolume,
        maxPurchaseVolume: this.state.funding.maxPurchaseVolume,
        rewards: this.state.funding.reward.rewards,
        faqs: this.state.funding.reward.faqs,
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

  server2client = (p) => update(this.state, {
    abstract: { $set: p.abstract },
    creator: { $set: p.creator },
    funding: {
      currentMoney: { $set: p.funding.currentMoney },
      targetMoney: { $set: p.funding.targetMoney },
      dateFrom: { $set: p.funding.dateFrom },
      dateTo: { $set: p.funding.dateTo },
      shippingFee: { $set: p.funding.shippingFee },
      minPurchaseVolume: { $set: p.funding.minPurchaseVolume },
      maxPurchaseVolume: { $set: p.funding.maxPurchaseVolume },
      reward: {
        rewards: { $set: p.funding.rewards }
      },
      faq: {
        faqs: { $set: p.funding.faqs }
      }
    },
    overview: {
      intro: { $set: p.overview.intro },
      part1: { $set: JSON.parse(p.overview.part1.raw) },
      part2: { $set: JSON.parse(p.overview.part2.raw) },
    },
    relatedContent: {
      contents: { $set: p.relatedContents },
    },
  })

	// 서버로 전송
	save = async () => {
    console.log('state', this.state);
    let body = this.client2server()

    try {
      let r;

      if(this.props.params.productName) {
        r = await updateProduct(this.props.params.productName, body)
      } else {
        r = await createProduct(body)
      }

      console.log(r);
      appUtils.setFlash({title: '미술소품이 등록되었습니다.', level: 'success', autoDismiss: 3})
    } catch (e) { // error from axios.request
      console.log(e);
      appUtils.setFlash({title: '등록에 실패하였습니다.', level: 'error', autoDismiss: 3, dismissible: true})
    }
	}
}


// const mapStateToProps = (state) => ({
// 	ProductEditor: state.ProductEditor
// })
//
// // attach dispatch to just simple actions (async actions cannot be detached). for optional bind refer https://github.com/reactjs/redux/issues/363
// const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
//
// export const ProductEditorContainer = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(ProductEditor)
