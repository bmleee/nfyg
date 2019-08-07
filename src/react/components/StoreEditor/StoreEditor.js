import React, { Component, PropType } from 'react'
import StoreEditorTab from './StoreEditorTab'
import ScrollToTop from 'react-scroll-up';
import Helmet from 'react-helmet'
import update from 'immutability-helper'
import { fetchUserAndData, upload_file, createStore, updateStore, MakeNoticeSMSandEmail } from '../../api/AppAPI'
import { canUseDOM } from '~/src/lib/utils'
import draftToHtml from 'draftjs-to-html'
import _ from 'lodash' // use throttle or debounce

import { value2mainvalue } from '~/src/react/lib/utils'
import { SelectOptions } from '~/src/react/constants'

const scrollStyle = {
  cursor: 'pointer',
}

export default class StoreEditor extends Component {

	state = {
	    tabLinkBase: '',
	    userType: '',
		
		authorizedUsers: '',
		
		abstract: {
			title: '',
			description: '',
			main_img: '',
			category: '',
			storeLink: '',
			state: 'preparing',
			cancellation: '',
			first_char: [],
		},

		storeInfo: {
			storeNumber: '',
			storeEmail: '',
			storeLocation: '',
			storeShippingFee: 0,
			storeShippingCompany: ''
		},
		
		storeShippingCycle: {
			shippingStart: '월요일',
			orderEnd: '금요일',
			shipping_array: []
		},
		
		storeNotice: {
			Notice: '',
			NoticeBoolean: false,
		},
		
		storeOverview: {
			storeOverviewList: [],
			storeOverviewNew: {
				img: '',
				text : '',
				img_link : ''
			},
		},
		
		items: {
			itemList: [],
			itemNew: {
				name: '',
				description : '',
				options : [{
					opt : '',
					add_price : 0,
				}],
				imgSrc: '',
				category: '',
				sub_category: '',
				main_category: '',
				price : 0,
				saleprice: 0,
				itemLink : '',
				created_at : '',
				overview: {
					raw: '',
					html: ''
				},
				overview_new : '',
				accept : false,
				rewardComment: false,
				temporary_outofstock: false,
				maxPurchaseVolume: 0
			},
			relatedContent: {
				contents: [],
				newContent: {
	        		title: '',
					imgSrc: '',
					link: '',
				}
			},
			optionNew: {
				opt: '',
				add_price: 0
			},
		},
		
		Exist_url : [],
		Exist_storeurl : [],
		Exist_url_err : '',
	}

  async componentDidMount() {
    try {
      const {
        user,
        data
      } = await fetchUserAndData()
      
      let Exist_url = []
		
      let tabLinkBase = `/${(document.URL.match(/store\/.+\/edit/) || ['store-editor'])[0]}`
	  
	  if(tabLinkBase == '/store-editor') {
		Exist_url = data.home.stores
		this.setState({
          Exist_url,
        })
		}
		else null
	  		
      appUtils.setUser(user)

      if(data && data.store) {
        this.setState({
          ...this.server2client(data.store),
          tabLinkBase,
          userType : data.userType,
          authorizedUsers : data.store.authorizedUsers
        })
      } else {
        this.setState({
          tabLinkBase,
          userType : data.userType,
          authorizedUsers : user.email
        })
      }
    } catch (e) {
      console.error(e);
      alert(e.message)
      this.props.history.goBack()
    }
    
    let last_segment_url = document.URL.substr(document.URL.lastIndexOf('/') + 1)
    
  	if(last_segment_url == 'store-editor') {
  		window.location.href = 'https://netflix-salon.co.kr/store-editor/abstract'
  	}
  	else if(last_segment_url == 'edit') {
  		window.location.href = 'https://netflix-salon.co.kr/store/' + this.state.abstract.storeLink + '/edit/abstract'
  	}
    
}

  render() {
		let {
			children
		}  = this.props
		
		for(var i in this.state.Exist_url) {
			if(this.state.Exist_url[i] != null) {
	    		this.state.Exist_storeurl.push(this.state.Exist_url[i].abstract.storeLink)
			}
	    }
	    
	    console.log('store-editor this.state', this.state)

		children = children && React.cloneElement(children, {
			...this.state,
			
			// Abstract
			...this.abstractSubmitCallbacks,
			overviewHandlers: this.overviewHandlers,
			shippingCycleHandlers: this.shippingCycleHandlers,
			storeNoticeHandlers: this.storeNoticeHandlers,
			FirstCharHandlers: this.FirstCharHandlers,
			
			// items
			...this.ItemSubmitCallbacks,
			itemHandlers: this.itemHandlers,
    		contentHandlers: this.contentHandlers,
    		
		})
		
		let store_edit_title = this.state.abstract.title == "" ? "상점 개설하기" : (this.state.abstract.title + " 관리자 페이지")
		let require_state = this.state.abstract.title == "" || 
							this.state.abstract.description == "" || 
							this.state.abstract.storeLink == "" || 
							this.state.abstract.main_img == "" || 
							this.state.abstract.cancellation == "" || 
							this.state.storeInfo.storeEmail == "" || 
							this.state.storeInfo.storeNumber == "" || 
							this.state.storeInfo.storeShippingCompany == "" || 
							this.state.storeInfo.storeShippingFee == 0 || 
							this.state.storeOverview.storeOverviewList.length == 0 ||
							this.state.items.itemList.length == 0 ||
							this.state.storeShippingCycle.shipping_array.length == 0 ?
							false : true
		
		let require_state_sub = this.state.abstract.title == "" || 
							this.state.abstract.storeLink == "" ?
							false : true
		
		let abstract_check = this.state.abstract.title == "" || 
							this.state.abstract.description == "" || 
							this.state.abstract.storeLink == "" || 
							this.state.abstract.main_img == "" || 
							this.state.abstract.cancellation == "" || 
							this.state.storeInfo.storeEmail == "" || 
							this.state.storeInfo.storeNumber == "" || 
							this.state.storeInfo.storeShippingCompany == "" || 
							this.state.storeInfo.storeShippingFee == 0 || 
							this.state.storeOverview.storeOverviewList.length == 0 ||
							this.state.storeShippingCycle.shipping_array.length == 0 ?
							false : true
		
		let items_check = this.state.items.itemList.length == 0 ? false : true
		
		
		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="exhibition-editor">
					<Helmet title={store_edit_title} meta={[ {property: 'og:title', content: {store_edit_title} } ]} />
						<StoreEditorTab
	            			tabLinkBase={this.state.tabLinkBase}
							editor_title={store_edit_title}
							abstract_check={abstract_check}
	            			items_check={items_check}
						/>
						{ children }
						<div className="store-editor-save-container">
							<div>
							{ this.state.abstract.state == 'in-progress'
								? null
								: require_state_sub == false
									? <button className="store-editor-temporarysave-cant">임시저장</button>
									: <button className="store-editor-temporarysave" onClick={this.temporary_save}>임시저장</button>
							}
							</div>
						{ this.state.abstract.state == 'preparing' ?
								require_state == false 
								? <button className="store-editor-save-cant">검토 요청하기</button> 
								: <button className="store-editor-save" onClick={this.save}>검토 요청하기</button>
							:
								require_state == false
								? <button className="store-editor-save-cant">상점 정보 업데이트</button>
								: <button className="store-editor-save" onClick={this.update}>상점 정보 업데이트</button>
						}
						<div className="start-body-space-20"></div>
						{ this.state.userType == "admin" ? <div><button className="store-editor-save" onClick={this.admin_save}>저 장[관리자용]</button></div> : null }
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
		_onTitleSubmit: (title) => {
			this.setState(update(this.state, {
				abstract: {
					title: { $set: title }
				}
			}))
		},
		_onDescriptionSubmit: (description) => this.setState(update(this.state, {
			abstract: {
				description: { $set: description }
			}
		})),
		_onMainImgSubmit: (main_img) => this.setState(update(this.state, {
			abstract: {
				main_img: { $set: main_img }
			}
		})),
		_onCategorySubmit: (category) => this.setState(update(this.state, {
			abstract: {
				category: { $push: [{ ...category }]}
		}})),
		_onStoreLinkSubmit: (storeLink) => {
		      if( this.state.Exist_storeurl.indexOf(storeLink) == -1 ) {
			      if(!this.props.params.storeLink) {
			        this.setState(update(this.state, {
			    			abstract: {
			    				storeLink: { $set: storeLink }
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
			    					storeLink: { $set: '' }
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
		_onCancellationSubmit: (cancellation) => this.setState(update(this.state, {
			abstract: {
				cancellation: { $set: cancellation }
			}
		})),
		
		_onFirstCharSubmit: (first_char) => {
			if(this.state.abstract.first_char.indexOf(first_char) == -1 && this.state.abstract.first_char.length < 2) {		
				this.setState(update(this.state, {
					abstract: {
						first_char: { $push: [first_char] }
					}
				}
			))}
			else {
				this.setState(update(this.state, {
					
				}
			))}
		},
		_onFirstCharClose: () => 
			this.setState(update(this.state, {
				abstract: {
					first_char: { $set: [] }
				}
			}
		)),
		
		_onShippingArraySubmit: (shipping_array) => {
			if(this.state.storeShippingCycle.shipping_array.indexOf(shipping_array) == -1 && this.state.storeShippingCycle.shipping_array.length < 5) {		
				this.setState(update(this.state, {
					storeShippingCycle: {
						shipping_array: { $push: [shipping_array] }
					}
				}
			))}
			else {
				this.setState(update(this.state, {
					
				}
			))}
		},
		_onShippingArrayClose: () => 
			this.setState(update(this.state, {
				storeShippingCycle: {
					shipping_array: { $set: [] }
				}
			}
		)),
		
		_onStoreNumberSubmit: (storeNumber) => this.setState(update(this.state, {
			storeInfo: {
				storeNumber: { $set: storeNumber }
			}
		})),
		_onStoreEmailSubmit: (storeEmail) => this.setState(update(this.state, {
			storeInfo: {
				storeEmail: { $set: storeEmail }
			}
		})),
		_onStoreLocationSubmit: (storeLocation) => this.setState(update(this.state, {
			storeInfo: {
				storeLocation: { $set: storeLocation }
			}
		})),
		_onStoreShippingCompanySubmit: (storeShippingCompany) => this.setState(update(this.state, {
			storeInfo: {
				storeShippingCompany: { $set: storeShippingCompany }
			}
		})),
		_onFacebookSubmit: (facebook) => this.setState(update(this.state, {
			storeInfo: {
				facebook: { $set: facebook }
			}
		})),
		_onInstagramSubmit: (instagram) => this.setState(update(this.state, {
			storeInfo: {
				instagram: { $set: instagram }
			}
		})),
		_onTwitterSubmit: (twitter) => this.setState(update(this.state, {
			storeInfo: {
				twitter: { $set: twitter }
			}
		})),
		_onStoreShippingFeeSubmit: (storeShippingFee) => this.setState(update(this.state, {
			storeInfo: {
				storeShippingFee: { $set: Number(storeShippingFee) }
			}
		})),
		_onStoreOverviewSubmit: ({storeOverviewNew}) => this.setState(update(this.state, {
				storeOverview: {
					storeOverviewList: {
						$push: [{...storeOverviewNew}]
					},
					storeOverviewNew: {
            			text: { $set: '' },
						img: { $set: '' },
						img_link: { $set: '' }
					}
				}
		})),
		_onStoreShippingCycleSubmit: ({storeShippingCycle}) => this.setState(update(this.state, {
				
		}))
	}
	
	// items
	ItemSubmitCallbacks = {
		_onItemSubmit: ({itemNew}) => this.setState(update(this.state, {
				items: {
					itemList: {
						$push: [{...itemNew}]
					},
					itemNew: {
            			name: { $set: '' },
						description: { $set: '' },
						options : { $set: [] },
						imgSrc: { $set: '' },
						price: { $set: 0 },
						saleprice: { $set: 0 },
						category: { $set: '' },
						sub_category: { $set: '' },
						main_category: { $set: '' },
			            itemLink: { $set: '' },
			            created_at: { $set: '' },
			            overview: { 
	        				raw: { $set: '' },
	            			html: { $set: '' }
        				},
        				overview_new : { $set: '' },
        				accept: { $set: false },
        				rewardComment: { $set: false },
        				temporary_outofstock: { $set: false },
        				maxPurchaseVolume: { $set: 0 }
					}
				}
			})),
		_onContentSubmit: ({newContent}) => this.setState(update(this.state, {
			items: {	
				relatedContent: {
	        		contents: { $push: [{...newContent}] },
	        		newContent: {
	        		imgSrc: { $set: '' },
	        		link: { $set: '' },
	        		title: { $set: '' },
	        		}
	    		}
			}
		}))
	}
	
	FirstCharHandlers = {
		deleteFirstChar: (index) => this.setState(update(this.state, {
			abstract: {
				first_char: {
					$splice: [
						[index, 1]
					]
				}
			}
		}))
	}
	
	shippingCycleHandlers = {
		_onOrderEnd: (e) => {
			this.setState(update(this.state, {
				storeShippingCycle: {
					orderEnd: { $set: e.value }
				}
			}))
		},
		_onShippingStart: (e) => {
			this.setState(update(this.state, {
				storeShippingCycle: {
					shippingStart: { $set: e.value }
				}
			}))
		},
		_onShippingStartSub: (e) => {
			this.setState(update(this.state, {
				storeShippingCycle: {
					shippingStartSub: { $set: e.value }
				}
			}))
		},
		deleteShippingArray: (index) => this.setState(update(this.state, {
			storeShippingCycle: {
				shipping_array: {
					$splice: [
						[index, 1]
					]
				}
			}
		}))
	}
	
	storeNoticeHandlers = {
		_onNotice: (e) => {
			this.setState(update(this.state, {
				storeNotice: {
					Notice: { $set: e.target.value }
				}
			}))
		},
		_onNoticeBoolean: (e) => {
			this.setState(update(this.state, {
				storeNotice: {
					NoticeBoolean: { $set: e.value }
				}
			}))
		}
	}
	
	overviewHandlers = {
		_onText: (e) => {
			this.setState(update(this.state, {
				storeOverview: {
					storeOverviewNew: {
						text: { $set: e.target.value }
					}
				}
			}))
		},
		_onImg: async (e) => {
	        let { sourceURL } = await upload_file(e.target.files[0])
	        this.setState(update(this.state, {
				storeOverview: {
					storeOverviewNew: {
						img: { $set: sourceURL }
					}
				}
			}))
		},
		_onImgLink: (e) => {
			this.setState(update(this.state, {
				storeOverview: {
					storeOverviewNew: {
						img_link: { $set: e.target.value }
					}
				}
			}))
		},
		deleteOverview: (index) => {
			this.setState(update(this.state, {
				storeOverview: {
					storeOverviewList: {
						$splice: [
							[index, 1]
						]
					}
				}
			}))
		},
		modifyOverview: (index, open) => {
			this.setState(update(this.state, {
				storeOverview: {
					storeOverviewList: {
						[index] : {
							open: {
								$set : open
							}
						}
					}
				}
			}))
		},
		modifyOverviewDone: (index, close) => {
			this.setState(update(this.state, {
				storeOverview: {
					storeOverviewList: {
						[index] : {
							open: {
								$set : close
							}
						}
					}
				}
			}))
		},
		modifyOverviewText: (index, e) => {
			this.setState(update(this.state, {
				storeOverview: {
					storeOverviewList: {
						[index] : {
							text: { $set : e.target.value }
						}
					}
				}
			}))
		},
		modifyOverviewImg: async (index, e) => {
	        let { sourceURL } = await upload_file(e.target.files[0])
	        this.setState(update(this.state, {
				storeOverview: {
					storeOverviewList: {
						[index] : {
							img: { $set: sourceURL }
						}
					}
				}
			}))
		},
		modifyOverviewImgLink: (index, e) => {
			this.setState(update(this.state, {
				storeOverview: {
					storeOverviewList: {
						[index] : {
							img_link: { $set : e.target.value }
						}
					}
				}
			}))
		},
	}
	
	//item handlers
	itemHandlers = {
		_onName: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						name: { $set: e.target.value }
					}
				}
			}))
		},
		_onDescription: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						description: { $set: e.target.value }
					}
				}
			}))
		},
		_onCategory: (category) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						category: { $set: category }
					}
				}
			}))
		},
		_onMainCategory: (category) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						main_category: { $set: value2mainvalue(SelectOptions.MainCategory, category) },
						sub_category: { $set: category }
					}
				}
			}))
		},
		_onImgSrc: async (e) => {
	        let { sourceURL } = await upload_file(e.target.files[0])
	        this.setState(update(this.state, {
				items: {
					itemNew: {
						imgSrc: { $set: sourceURL }
					}
				}
			}))
		},
		_onPrice: (e) => {
			var n = Date.now();
		    var n_str = n.toString();
		    n_str = n_str.substring(7, 15)
		    
			this.setState(update(this.state, {
				items: {
					itemNew: {
						price: { $set: Number(e.target.value) },
						itemLink: { $set: n_str }
					}
				}
			}))
		},
		_onSalePrice: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						saleprice: { $set: Number(e.target.value) }
					}
				}
			}))
		},
		_onSize: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						size: { $set: e.target.value }
					}
				}
			}))
		},
		_onMadeIn: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						madein: { $set: e.target.value }
					}
				}
			}))
		},
		_onItemLink: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						itemLink: { $set: e.target.value }
					}
				}
			}))
		},
		_onOverview: (raw) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						overview: {
							raw : { $set: JSON.stringify(raw) },
							html : { $set: draftToHtml(raw) }
						}
					}
				}
			}))
		},
		_onOverview_new: (raw) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						overview_new : { $set: !raw.level.content ? raw.level.fragments.join("") : raw.level.content }
					}
				}
			}))
		},
		_onAccept: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						accept: { $set: e.value },
						created_at: { $set: e.value == true ? Date.now() : null }
					}
				}
			}))
		},
		_onIsRewardComment: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						rewardComment: { $set: e.value }
					}
				}
			}))
		},
		_onIsTemporaryOut: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						temporary_outofstock: { $set: e.value }
					}
				}
			}))
		},
		_onMaxPurcahseVolum: (e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
						maxPurchaseVolume: { $set: Number(e.target.value) }
					}
				}
			}))
		},
		
		/////////////////////////////////
		_onOptionOpt: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
	        			options: {
	        				[index] : {
								opt: { $set: e.target.value }
	        				}
        				}
        			}
				}
			}))
		},
		_onOptionsAddPrice: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
	        			options: {
	        				[index] : {
								add_price: { $set: e.target.value }
	        				}
        				}        		
        			}
				}
			}))
		},
		_onNewOptionPush: () => this.setState(update(this.state, {
			items: {	
				itemNew: {
	        		options: { $push: [{...this.state.items.optionNew}] }
	    		},
	    		optionNew: {
					opt: { $set: '' },
	        		add_price: { $set: 0 }
				}
			},
		})),
		
		deleteOption: (index) => {
			this.setState(update(this.state, {
				items: {
					itemNew: {
	        			options: {
		        			$splice: [
								[index, 1]
							]	
        				}
        			}
				}
			}))
		},
		ModifyOptionOpt: (index, index2, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
		        			options: {
		        				[index2] : {
									opt: { $set: e.target.value }
		        				}
	        				}
						}
        			}
				}
			}))
		},
		ModifyOptionsAddPrice: (index, index2, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
		        			options: {
		        				[index2] : {
									add_price: { $set: e.target.value }
		        				}
	        				}
						}
        			}
				}
			}))
		},
		ModifydeleteOption: (index, index2) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
		        			options: {
		        				$splice: [
									[index2, 1]
								]	
	        				}
						}
        			}
				}
			}))
		},
		ModifyOptionPush: (index) => this.setState(update(this.state, {
			items: {	
				itemList: {
					[index] : {
	        			options: { $push: [{...this.state.items.optionNew}] }
					}
	    		},
	    		optionNew: {
					opt: { $set: '' },
	        		add_price: { $set: 0 }
				}
			},
		})),
		///////////////////////////////////
		
		deleteItem: (index) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						$splice: [
							[index, 1]
						]
					}
				}
			}))
		},
		modifyItem: (index, open) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							open: {
								$set : open
							}
						}
					}
				}
			}))
		},
		modifyItemDone: (index, close) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							open: {
								$set : close
							}
						}
					}
				}
			}))
		},
		modifyItemName: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							name: { $set : e.target.value }
						}
					}
				}
			}))
		},
		modifyItemDescription: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							description: { $set : e.target.value }
						}
					}
				}
			}))
		},
		modifyItemCategory: (index, category) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							category: { $set : category }
						}
					}
				}
			}))
		},
		modifyItemMainCategory: (index, category) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							main_category: { $set: value2mainvalue(SelectOptions.MainCategory, category) },
							sub_category: { $set : category }
						}
					}
				}
			}))
		},
		modifyItemImgSrc: async (index, e) => {
	        let { sourceURL } = await upload_file(e.target.files[0])
	        this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							imgSrc: { $set: sourceURL }
						}
					}
				}
			}))
		},
		modifyItemAccept: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							accept: { $set : e.value },
							created_at: { $set: e.value == true ? Date.now() : null }
						}
					}
				}
			}))
		},
		modifyItemComment: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							rewardComment: { $set : e.value }
						}
					}
				}
			}))
		},
		modifyItemTemporaryOut: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							temporary_outofstock: { $set : e.value }
						}
					}
				}
			}))
		},
		modifyItemPrice: (index, e) => {
			var n = Date.now();
		    var n_str = n.toString();
		    n_str = n_str.substring(7, 15)
			
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							price: { $set : Number(e.target.value) },
							itemLink: { $set: n_str }
						}
					}
				}
			}))
		},
		modifyItemSalePrice: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							saleprice: { $set : Number(e.target.value) },
						}
					}
				}
			}))
		},
		modifyItemSize: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							size: { $set : e.target.value }
						}
					}
				}
			}))
		},
		modifyItemMadeIn: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							madein: { $set : e.target.value }
						}
					}
				}
			}))
		},
		modifyItemOverview: (index, raw) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							overview: { 
								raw  : { $set: JSON.stringify(raw) },
								html : { $set: draftToHtml(raw) }
							}
						}
					}
				}
			}))
		},
		modifyItemOverview_new: (index, raw) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							overview_new: { $set: !raw.level.content ? raw.level.fragments.join("") : raw.level.content }
						}
					}
				}
			}))
		},
		modifyMaxPurcahseVolum: (index, e) => {
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : {
							maxPurchaseVolume: { $set: Number(e.target.value) }
						}
					}
				}
			}))
		},
		ItemUp: (index) => {
			var tem_1, tem_2;
			if(index > 0) {
				tem_1 = this.state.items.itemList[index]
				tem_2 = this.state.items.itemList[index - 1]
			}
			else {
				tem_1 = this.state.items.itemList[index - 1]
				tem_2 = this.state.items.itemList[index]
			}
			
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : { $set: tem_2 },
						[index-1] : { $set: tem_1 }
					}
				}
			}))
		},
		ItemDown: (index) => {
			var tem_1, tem_2;
			if(index < this.state.items.itemList.length - 1) {
				tem_1 = this.state.items.itemList[index]
				tem_2 = this.state.items.itemList[index + 1]
			}
			else {
				tem_1 = this.state.items.itemList[index + 1]
				tem_2 = this.state.items.itemList[index]
			}
			
			this.setState(update(this.state, {
				items: {
					itemList: {
						[index] : { $set: tem_2 },
						[index+1] : { $set: tem_1 }
					}
				}
			}))
		},
	}
	
	//related content handler
	contentHandlers = {
	   _onImgSrc: async (e) => {
       let { sourceURL } = await upload_file(e.target.files[0])
       this.setState(update(this.state, {
         items: {
	         relatedContent: {
	           newContent: {
	             imgSrc: { $set: sourceURL },
	           }
	         }
         }
       }))
     },
     _onLink: (e) => this.setState(update(this.state, {
       items: {
	       relatedContent: {
	         newContent: {
	           link: { $set: e.target.value },
	         }
	       }
       }
     })),
     _onTitle: (e) => this.setState(update(this.state, {
       items: {
	       relatedContent: {
	         newContent: {
	           title: { $set: e.target.value },
	         }
	       }
       }
     })),
     deleteContent: (index) => this.setState(update(this.state, {
       items: {
	       relatedContent: {
	         contents: {
	           $splice: [
	             [index, 1]
	           ]
	         }
	       }
       }
     })),
	}

  client2server = () => {
    return {
      abstract: this.state.abstract,
      storeInfo: this.state.storeInfo,
      storeShippingCycle: this.state.storeShippingCycle,
      storeNotice: this.state.storeNotice,
      authorizedUsers: this.state.authorizedUsers,
      items: this.state.items.itemList,
      storeOverview: this.state.storeOverview.storeOverviewList,
      isNew: this.state.tabLinkBase.includes('editor'),
    }
  }
  
  server2client = (store) => update(this.state, {
    abstract: { $set: store.abstract },
    storeInfo: { $set: store.storeInfo },
    storeShippingCycle: { $set: store.storeShippingCycle },
    storeNotice: { $set: store.storeNotice },
    items: {
      itemList: { $set: store.items },
      relatedContent: {
	      contents: { $set: store.items.relatedContents },
      }
    },
    storeOverview : {
      storeOverviewList: { $set: store.storeOverview }
    }
  })

	// 서버로 전송
	save = async () => {
	    let body = this.client2server()
	    try {
	      let r;
	
	      if(this.props.params.storeLink) {
	        r = await updateStore(this.props.params.storeLink, body)
	      } else {
	        r = await createStore(body)
	      }
	
	      console.log(r);
	      if(this.props.params.storeLink) { 
	      	appUtils.setFlash({title: '상점 정보가 수정되었습니다.', level: 'success', autoDismiss: 3})
	      } else {
	      	appUtils.setFlash({title: '감사합니다! 검토 후 상점이 오픈됩니다.', level: 'success', autoDismiss: 3})
	      	await MakeNoticeSMSandEmail(this.state.abstract.title, "상점", "https://netflix-salon.co.kr/store/" + this.state.abstract.storeLink);
	      }
	    } catch (e) {
	      console.log(e);
	      if(this.props.params.storeLink) { 
	    	appUtils.setFlash({title: '상점 정보 수정 실패!', level: 'error', autoDismiss: 3, dismissible: true})
	      } else {
	      	appUtils.setFlash({title: '검토 요청 실패!', level: 'error', autoDismiss: 3, dismissible: true})
	      }
	    }
	}
	
	temporary_save = async () => {
		let body = this.client2server()
		try {
			let r;
			
			if(this.props.params.storeLink) {
			r = await updateStore(this.props.params.storeLink, body)
			appUtils.setFlash({title: '임시저장 완료!', level: 'success', autoDismiss: 3})
		} else {
			r = await createStore(body)
			window.location.href = 'https://netflix-salon.co.kr/user/me'
			}
		} catch (e) {
			appUtils.setFlash({title: '임시저장 실패!', level: 'error', autoDismiss: 3, dismissible: true})
		}
	}
	
	update = async () => {
	    let body = this.client2server()
	    try {
	      let r;
	
	      if(this.props.params.storeLink) {
	        r = await updateStore(this.props.params.storeLink, body)
	      } else {
	        r = await createStore(body)
	      }
      	  appUtils.setFlash({title: '상점 정보가 수정되었습니다.', level: 'success', autoDismiss: 3})
	    } catch (e) {
	      appUtils.setFlash({title: '상점 정보 수정 실패!', level: 'error', autoDismiss: 3, dismissible: true})
	    }
	}
	
	admin_save = async () => {
	    let body = this.client2server()
	    try {
	      let r;
	
	      if(this.props.params.storeLink) {
	        r = await updateStore(this.props.params.storeLink, body)
	      } else {
	        r = await createStore(body)
	      }
	      	appUtils.setFlash({title: '관리자용 상점 저장!', level: 'success', autoDismiss: 3})
	    } catch (e) {
	      	appUtils.setFlash({title: '관리자용 상점 저장실패!', level: 'error', autoDismiss: 3, dismissible: true})
	    }
	}
	
}

