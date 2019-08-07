import React, { Component, PropType } from 'react'
import ProductEditorTab from './ProductEditorTab'
import ScrollToTop from 'react-scroll-up';

import Helmet from 'react-helmet'

import update from 'immutability-helper'

import { fetchUserAndData, upload_file, createProduct, updateProduct, sendConfirmSMSandEmail, MakeNoticeSMSandEmail } from '../../api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'

import draftToHtml from 'draftjs-to-html'

import _ from 'lodash' // use throttle or debounce

import { Link } from 'react-router';

import { value2mainvalue } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

const scrollStyle = {
  cursor: 'pointer',
}

export default class ProductEditor extends Component {

	state = {
    tabLinkBase: '',
    userType: '',
    authorizedUser: '',

		// Abstract
		abstract: {
			longTitle: '',     //
			shortTitle: '',    //
			imgSrc: '',         //
			category: '',       // 건강, 라이프, ...
			sub_category: '',
			category_array: [],
			productName: '',   // products/:product_name
			state: 'preparing', 			 // not_started, started, finished
			postIntro: '',
		},

		creator: {
			creatorName: '',
			creatorImgSrc: '',
			creatorLocation: '',
			creatorDescription: '',
			creatorEmail: '',
			creatorEmailCheck: false,
			creatorNumber: '',
			creatorNumberCheck: false,
		},

		sponsor: {
			sponsorName: '',
		},

		// Funding
		funding: {
			currentMoney: 0,   // 직접 / 간접 후원에 의해 추가됨
			targetMoney: 0,
      shippingFee: 0,
      shippingCompany: 'korex',
      minPurchaseVolume: 0, // add/fix product model, toFormat, wrapper, form, submit callback,
      maxPurchaseVolume: 10000, // add/fix product model, toFormat, wrapper, form, submit callback,
			dateFrom: new Date().toISOString().substring(0, 10),     							// 작성 시작 일
			dateTo: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().substring(0, 10),	// 바로 다음날
			etcrewardActive: false,
			mustrewardActive: false,
			cancellation: '',
			reward: { // Depreciated
				rewards: [],
				newReward: { // temporary state to insert...
          title: '',
					description: '',
					isDirectSupport: true,
					rewardComment: false,
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
		overview_new : '',

    // related contents
    relatedContent: {
			contents: [],
			newContent: {
        title: '',
				imgSrc: '',
				link: '',
			}
		},
		
		Exist_url : [],
		Exist_producturl : [],
		Exist_url_err : '',
		preview : false,
		
		account: {
			accountBank : '',
			accountNumber : '',
			accountName : ''
		},
		
		reward_add_check : false
	}

  async componentDidMount() {
    try {
      // 서버에서 State를 가져와 채워야 한다면 ...
      const {
        user,
        data
      } = await fetchUserAndData()
			
			let Exist_url = []

      let tabLinkBase = `/${(document.URL.match(/products\/.+\/edit/) || ['product-editor'])[0]}`
			
			if(tabLinkBase == '/product-editor') {
				Exist_url = data.home.products
					this.setState({
          Exist_url,
        })
			}
			else null
			
      appUtils.setUser(user)

      if(data && data.product) {
        this.setState({
          ...this.server2client(data.product),
          tabLinkBase,
          userType : data.userType,
          authorizedUser : data.product.authorizedUser
        })
      } else {
        this.setState({
          tabLinkBase,
          userType : data.userType,
          authorizedUser : user.email,
          creator: {
						creatorName: user.displayName,
						creatorImgSrc: user.image,
						creatorEmail: user.real_email || user.email,
						creatorEmailCheck: user.mailCheck,
						creatorNumber: user.contact,
						creatorNumberCheck: user.number_check,
						creatorDescription: user.intro
					}
        })
      }
    } catch (e) {
      console.error(e);
      alert(e.message)
      this.props.history.goBack()
    }
    
    let last_segment_url = document.URL.substr(document.URL.lastIndexOf('/') + 1)
    
  	if(last_segment_url == 'product-editor') {
  		window.location.href = 'https://netflix-salon.co.kr/product-editor/abstract'
  	}
  	else if(last_segment_url == 'edit') {
  		window.location.href = 'https://netflix-salon.co.kr/products/' + this.state.abstract.productName + '/edit/abstract'
  	}
    
	}

  render() {
		let {
			children
		}  = this.props
	
		for(var i in this.state.Exist_url) {
			if(this.state.Exist_url[i] != null) {
	    	this.state.Exist_producturl.push(this.state.Exist_url[i].abstract.productName)
			}
	  }
	  
	  let pathname = this.props.location.pathname
		let last_path = pathname.substr(pathname.lastIndexOf('/') + 1)
		
		this.state.reward_add_check = this.state.funding.reward.newReward.title == "" ||
																	this.state.funding.reward.newReward.description == "" ||
																	this.state.funding.reward.newReward.thresholdMoney == 0 ||
																	this.state.funding.reward.newReward.shippingDay == "" ? false : true

		children = children && React.cloneElement(children, {
			...this.state,
			// Abstract
			...this.abstractSubmitCallbacks,
      contentHandlers: this.contentHandlers,
      categoryHandlers: this.categoryHandlers,

			// Funding
			...this.fundingSubmitCallbacks,
			rewardHandlers: this.rewardHandlers,
      faqHandlers: this.faqHandlers,
      AccountHandlers: this.AccountHandlers,

			// Overview
			...this.overviewSubmitCallbacks,
		})
		
		let product_edit_title = this.state.abstract.longTitle == "" ? "프로젝트 등록" : this.state.abstract.longTitle
		let require_state = this.state.abstract.longTitle == "" || 
							this.state.abstract.shortTitle == "" || 
							this.state.abstract.postIntro == "" || 
							this.state.abstract.imgSrc == "" || 
							this.state.abstract.productName == "" ||
							this.state.abstract.category == "" ||
							this.state.creator.creatorName == "" || 
							this.state.creator.creatorEmail == "" ||
							this.state.creator.creatorNumber == "" ||
							this.state.creator.creatorImgSrc == "" || 
							this.state.creator.creatorDescription == "" || 
							this.state.funding.cancellation == "" || 
							this.state.funding.targetMoney == 0 ||
							this.state.funding.dateTo == "" || 
							this.state.funding.reward.rewards.length == 0 ||
							this.state.overview_new == "" ?
							false : true
							
		let require_state_sub = this.state.abstract.longTitle == "" || 
							this.state.abstract.shortTitle == "" || 
							this.state.abstract.productName == "" ||
							this.state.overview_new == "" ?
							false : true
		
		let abstract_check = this.state.abstract.longTitle == "" || 
							this.state.abstract.shortTitle == "" || 
							this.state.abstract.postIntro == "" || 
							this.state.abstract.imgSrc == "" || 
							this.state.abstract.productName == "" ||
							this.state.abstract.category == "" ||
							this.state.creator.creatorName == "" || 
							this.state.creator.creatorEmail == "" ||
							this.state.creator.creatorNumber == "" ||
							this.state.creator.creatorImgSrc == "" || 
							this.state.creator.creatorDescription == "" ? false : true
		
		let overview_check = this.state.funding.cancellation == "" || 
							this.state.overview_new == "" ? false : true
		
		let funding_check = this.state.funding.targetMoney == 0 ||
							this.state.funding.dateTo == "" || 
							this.state.account.accountName == "" ||
							this.state.account.accountNumber == "" ||
							this.state.account.accountBank == "" ||
							this.state.funding.reward.rewards.length == 0 ? false : true
							
		
		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="exhibition-editor">
					{ this.state.tabLinkBase == "/product-editor" ?
						<Helmet
	            title="프로젝트 등록"
	            meta={[
	                {property: 'og:title', content: '프로젝트 등록'},
	            ]}
	          />
	          :
	          <Helmet
	            title={this.state.abstract.longTitle}
	            meta={[
	                {property: 'og:title', content: this.state.abstract.longTitle },
	            ]}
	          />
					}
					{ last_path == 'preview' 
					? null
					:	<ProductEditorTab
	            tabLinkBase={this.state.tabLinkBase}
	            editor_title={product_edit_title}
	            abstract_check={abstract_check}
	            overview_check={overview_check}
	            funding_check={funding_check}
						/> 
					}
					 { children }
					<div className="store-editor-save-container">
						
						<div className="editor-button-container-first">
						{ last_path == 'preview' || this.state.abstract.state == 'in-progress' 
							? null
							: require_state_sub == false
								?	<button className="store-editor-temporary-save-cant">임시저장</button>
								: <button className="store-editor-temporary-save" onClick={this.temporary_save}>임시저장</button>
						}
						{ last_path == 'preview' 
						?	<Link to={`${this.state.tabLinkBase}/abstract`}><button className="store-editor-modify">수정하기</button></Link>
						: <Link to={`${this.state.tabLinkBase}/preview`}><button className="store-editor-preview">미리보기</button></Link>
						}
						</div>
						
						<div className="editor-button-container-second">
						{ last_path == 'preview' ? null
							: this.state.abstract.state == "preparing" ?
								require_state == false
								? <button className="store-editor-save-cant">검토 요청하기</button> 
								: <button className="store-editor-save" onClick={this.save}>검토 요청하기</button>
							: this.state.userType == 'admin' && this.state.abstract.state == 'completed' ?
								require_state == false
								? <button className="store-editor-save-cant">검토 완료</button>
								: <button className="store-editor-save" onClick={this.confirm}>검토 완료</button>
							: this.state.userType != 'admin' && this.state.abstract.state == 'completed' ?
								require_state == false
								? <button className="store-editor-save-cant">프로젝트 시작하기</button>
								: <button className="store-editor-save" onClick={this.start}>프로젝트 시작하기</button>
							:
								require_state == false
								? <button className="store-editor-save-cant">프로젝트 업데이트</button>
								: <button className="store-editor-save" onClick={this.save}>프로젝트 업데이트</button>
						}
						</div>
						
					<div className="start-body-space-20"></div>
					{ this.state.userType == "admin" ? <div><button className="store-editor-save" onClick={this.save}>저 장[관리자용]</button></div> : null }
					</div>
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
				category: { $set: value2mainvalue(SelectOptions.MainCategory, category) },
				sub_category: { $set: category }
			}
		})),
		_onCategoryArraySubmit: (category_array) => {
			if(this.state.abstract.category_array.indexOf(category_array) == -1 && this.state.abstract.category_array.length < 3) {		
				this.setState(update(this.state, {
					abstract: {
						category_array: { $push: [category_array] }
					}
				}
			))}
			else {
				this.setState(update(this.state, {
					
				}
			))}
		},
		_onCategoryArrayClose: () => 
				this.setState(update(this.state, {
					abstract: {
						category_array: { $set: [] }
					}
				}
			)),
		_onProductNameSubmit: (productName) => {
      if( this.state.Exist_producturl.indexOf(productName) == -1 ) {
	      if(!this.props.params.productName) {
	        this.setState(update(this.state, {
	    			abstract: {
	    				productName: { $set: productName }
	    			},
	    			Exist_url_err: { $set: '' }
	    		}))
	      } 
	      else {
	        this.setState(update(this.state, {
	    				Exist_url_err: { $set: '페이지 주소는 수정할 수 없습니다!' }
	    		}))
	      }
      }
      else {
      	this.setState(update(this.state, {
      				abstract: {
	    					productName: { $set: '' }
	    				},
	    				Exist_url_err: { $set: '이미 존재하는 페이지 주소입니다!' }
	    		}))
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
		_onCreatorEmailSubmit: (creatorEmail) => this.setState(update(this.state, {
			creator: {
				creatorEmail: { $set: creatorEmail }
			}
		})),
		_onCreatorEmailSubmitSub: (mailCheck) => this.setState(update(this.state, {
			creator: {
				creatorEmailCheck: { $set: mailCheck }
			}
		})),
		_onCreatorNumberSubmit: (creatorNumber) => this.setState(update(this.state, {
			creator: {
				creatorNumber: { $set: creatorNumber }
			}
		})),
		_onCreatorNumberSubmitSub: (creatorNumberCheck) => this.setState(update(this.state, {
			creator: {
				creatorNumberCheck: { $set: creatorNumberCheck }
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
		})),
		_onAccountSubmit: ({account}) => this.setState(update(this.state, {
				
		}))
	}
	
	AccountHandlers = {
		_onAccountBank: (e) => {
			this.setState(update(this.state, {
				account: {
					accountBank: { $set: e.value }
				}
			}))
		},
		_onAccountNumber: (e) => {
			this.setState(update(this.state, {
				account: {
					accountNumber: { $set: e.target.value }
				}
			}))
		},
		_onAccountName: (e) => {
			this.setState(update(this.state, {
				account: {
					accountName: { $set: e.target.value }
				}
			}))
		}
	}
	
	categoryHandlers = {
		deleteCategory: (index) => this.setState(update(this.state, {
       abstract: {
         category_array: {
           $splice: [
             [index, 1]
           ]
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
		_onShippingCompanySubmit: (shippingCompany) => this.setState(update(this.state, {
			funding: {
				shippingCompany: { $set: shippingCompany }
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
    
    _onEtcrewardActiveSubmit: (etcrewardActive) => this.setState(update(this.state, {
			funding: {
				etcrewardActive: { $set: etcrewardActive }
			}
		})),
		
		_onMustrewardActiveSubmit: (mustrewardActive) => this.setState(update(this.state, {
			funding: {
				mustrewardActive: { $set: mustrewardActive }
			}
		})),
    
		_onRewardSubmit: ({newReward}) => 
				this.setState(update(this.state, {
					funding: {
						reward: {
							rewards: {
								$push: [{...newReward}]
							},
							newReward: {
		            title: { $set: '' },
								description: { $set: '' },
								isDirectSupport: { $set: true },
								rewardComment: { $set: false },
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
    })),
    _onCancellationSubmit: (cancellation) => this.setState(update(this.state, {
			funding: {
				cancellation: { $set: cancellation }
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
		_onIsRewardComment: (e) => {
			this.setState(update(this.state, {
				funding: {
					reward: {
						newReward: {
							rewardComment: { $set: e.value }
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
		},
		RewardUp: (index) => {
			var tem_1, tem_2;
			if(index > 0) {
				tem_1 = this.state.funding.reward.rewards[index]
				tem_2 = this.state.funding.reward.rewards[index - 1]
			}
			else {
				tem_1 = this.state.funding.reward.rewards[index - 1]
				tem_2 = this.state.funding.reward.rewards[index]
			}
			
			this.setState(update(this.state, {
				funding: {
					reward: {
						rewards: {
							[index] : { $set: tem_2 },
							[index-1] : { $set: tem_1 }
						}
					}
				}
			}))
		},
		RewardDown: (index) => {
			var tem_1, tem_2;
			if(index < this.state.funding.reward.rewards.length - 1) {
				tem_1 = this.state.funding.reward.rewards[index]
				tem_2 = this.state.funding.reward.rewards[index + 1]
			}
			else {
				tem_1 = this.state.funding.reward.rewards[index + 1]
				tem_2 = this.state.funding.reward.rewards[index]
			}
			
			this.setState(update(this.state, {
				funding: {
					reward: {
						rewards: {
							[index] : { $set: tem_2 },
							[index+1] : { $set: tem_1 }
						}
					}
				}
			}))
		},
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
		})),
		_onOverviewSubmit: (raw) => this.setState(update(this.state, {
			overview_new: { $set: raw }
		})),
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
    // console.log('state', this.state);
    return {
      abstract: this.state.abstract,
      creator: this.state.creator,
      funding: {
        currentMoney: this.state.funding.currentMoney,
        targetMoney: this.state.funding.targetMoney,
        dateFrom: this.state.funding.dateFrom,
        dateTo: this.state.funding.dateTo,
        shippingFee: this.state.funding.shippingFee,
        shippingCompany: this.state.funding.shippingCompany,
        minPurchaseVolume: this.state.funding.minPurchaseVolume,
        maxPurchaseVolume: this.state.funding.maxPurchaseVolume,
        etcrewardActive: this.state.funding.etcrewardActive,
        mustrewardActive: this.state.funding.mustrewardActive,
        cancellation: this.state.funding.cancellation,
        rewards: this.state.funding.reward.rewards,
        faqs: this.state.funding.faq.faqs,
      },
      /*
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
      */
      overview_new: this.state.overview_new,
      isNew: this.state.tabLinkBase.includes('editor'),
      relatedContents: this.state.relatedContent.contents,
      authorizedUser: this.state.authorizedUser,
      account: this.state.account
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
      shippingCompany: { $set: p.funding.shippingCompany },
      minPurchaseVolume: { $set: p.funding.minPurchaseVolume },
      maxPurchaseVolume: { $set: p.funding.maxPurchaseVolume },
      etcrewardActive: { $set: p.funding.etcrewardActive },
      mustrewardActive: { $set: p.funding.mustrewardActive },
      cancellation: { $set: p.funding.cancellation },
      reward: {
        rewards: { $set: p.funding.rewards }
      },
      faq: {
        faqs: { $set: p.funding.faqs }
      }
    },
    /*
    overview: {
      intro: { $set: p.overview.intro },
      part1: { $set: JSON.parse(p.overview.part1.raw) },
      part2: { $set: JSON.parse(p.overview.part2.raw) },
    },
    */
    overview_new : { $set: !p.overview_new ? p.overview.part1.html : p.overview_new },
    relatedContent: {
      contents: { $set: p.relatedContents },
    },
    account: { $set: p.account }
  })

	// 서버로 전송
	save = async () => {
    let body = this.client2server()

    try {
      let r;

      if(this.props.params.productName) {
        r = await updateProduct(this.props.params.productName, body)
      } else {
        r = await createProduct(body)
      	this.state.preview = true
      }

      console.log(r);
      if(this.state.abstract.state == "in-progress") {
      	appUtils.setFlash({title: '프로젝트가 수정되었습니다.', level: 'success', autoDismiss: 3})
      } else if(this.state.abstract.state == "preparing") {
      	appUtils.setFlash({title: '감사합니다! 검토 완료 후 <프로젝트 시작하기> 버튼을 눌러주세요.', level: 'success', autoDismiss: 3})
      	await MakeNoticeSMSandEmail(this.state.abstract.shortTitle, "프로젝트",  "https://netflix-salon.co.kr/products/" + this.state.abstract.productName);
      } else {
      	appUtils.setFlash({title: '프로젝트가 수정되었습니다.', level: 'success', autoDismiss: 3})
      }
    } catch (e) { // error from axios.request
      console.log(e);
      if(this.state.abstract.state == "in-progress") {
      	appUtils.setFlash({title: '프로젝트 수정 실패!', level: 'error', autoDismiss: 3, dismissible: true})
      } else if(this.state.abstract.state == "preparing") {
      	appUtils.setFlash({title: '검토 요청 실패!', level: 'error', autoDismiss: 3, dismissible: true})
      } else {
      	appUtils.setFlash({title: '프로젝트 수정 실패!', level: 'error', autoDismiss: 3, dismissible: true})
      }
    }
	}
	
	temporary_save = async () => {
    let body = this.client2server()

    try {
      let r;

      if(this.props.params.productName) {
        r = await updateProduct(this.props.params.productName, body)
        appUtils.setFlash({title: '임시저장 완료!', level: 'success', autoDismiss: 3})
      } else {
        r = await createProduct(body)
        window.location.href = 'https://netflix-salon.co.kr/user/me'
      }
      
    } catch (e) { 
    	appUtils.setFlash({title: '임시저장 실패!', level: 'error', autoDismiss: 3, dismissible: true})
    }
	}
	
	start = async () => {
		this.state.abstract.state = 'in-progress'
    let body = this.client2server()
    let r;
		
	    r = await updateProduct(this.props.params.productName, body)
	  	this.state.preview = true

    console.log(r);
  	appUtils.setFlash({title: '프로젝트가 시작되었습니다.', level: 'success', autoDismiss: 3})
	}
	
	confirm = async () => {
    let body = this.client2server()
    let r;
		
    r = await updateProduct(this.props.params.productName, body)
  	this.state.preview = true
  	
  	appUtils.setFlash({title: '검토 완료!', level: 'success', autoDismiss: 3})
  	await sendConfirmSMSandEmail(this.state.abstract.shortTitle, this.state.creator.creatorNumber, this.state.creator.creatorEmail);
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
