import React, { Component, PropType } from 'react'
import update from 'immutability-helper'

import Body from './Body'
import Tab from './Tab'

import axios from 'axios'

import { fetchUserAndData, createSponsor, updateSponsor } from '../../api/AppAPI'

import { canUseDOM } from '~/src/lib/utils'

const API_URL = '/api/test-api/sponsor'

export default class ProjectEditor extends Component {

	state = {
		// Sponsor
		sponsor: {
			sponsorName: '',
			displayName: '',
			description: '',
			imgSrc: '',
			logoSrc: '',
			money: 0,
			contacts: {
				facebook: '',
				homepage: '',
				blog: '',
				tweeter: '',
			}
		},
	}

	async componentDidMount() {
		try {

			const {
				user,
				data: {
					sponsor
				}
			} = await fetchUserAndData()

			if(this.props.appUtils.setUser) this.props.appUtils.setUser(user)

			this.setState({sponsor})

		} catch (e) {
			console.error(e);
		}
	}

  render() {
		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="project-editor">
					<Tab save={this.save} />
					<Body
						{...this.state}

						// Sponsor
						{...this.sponsorSubmitCallbacks}
				 	/>
				</div>
			)
		}
	}

	// Sponsor
	sponsorSubmitCallbacks = {
		_onSponsorName: (sponsorName) => {
			this.setState(update(this.state, {
				sponsor: {
					sponsorName: { $set: sponsorName }
				}
			}))
		},
		_onDisplayName: (displayName) => {
			this.setState(update(this.state, {
				sponsor: {
					displayName: { $set: displayName }
				}
			}))
		},
		_onDescription: (description) => {
			this.setState(update(this.state, {
				sponsor: {
					description: { $set: description }
				}
			}))
		},
		_onImgSrc: (imgSrc) => {
			this.setState(update(this.state, {
				sponsor: {
					imgSrc: { $set: imgSrc }
				}
			}))
		},
		_onLogoSrc: (logoSrc) => {
			this.setState(update(this.state, {
				sponsor: {
					logoSrc: { $set: logoSrc }
				}
			}))
		},
		_onMoney: (money) => {
			this.setState(update(this.state, {
				sponsor: {
					money: { $set: Number(money) }
				}
			}))
		},
		_onFacebook: (facebook) => {
			this.setState(update(this.state, {
				sponsor: {
					contacts: {
						facebook: { $set: facebook }
					}
				}
			}))
		},
		_onHomepage: (homepage) => {
			this.setState(update(this.state, {
				sponsor: {
					contacts: {
						homepage: { $set: homepage }
					}
				}
			}))
		},
		_onBlog: (blog) => {
			this.setState(update(this.state, {
				sponsor: {
					contacts: {
						blog: { $set: blog }
					}
				}
			}))
		},
	}
	
	client2server = () => {
    console.log('state', this.state);
    return {
      sponsorName: this.state.sponsorName,
      displayName: this.state.displayName,
      description: this.state.description,
      imgSrc: this.state.imgSrc,
      logoSrc: this.state.logoSrc,
      money: this.state.money,
      contacts: this.state.contacts,
	    }
	 }
	
	  server2client = (s) => update(this.state, {
	    sponsorName: { $set: s.sponsorName },
	    displayName: { $set: s.displayName },
	    description: { $set: s.description },
	    imgSrc: { $set: s.imgSrc },
	    logoSrc: { $set: s.logoSrc },
	    money: { $set: s.money },
	    contacts: { $set: s.contacts },
	  })

	// 서버로 전송
	save = async () => {
		console.log('state', this.state);
		let body = this.client2server()
		
		try {
	      let r;
	
	      if(this.props.params.productName) {
	        r = await updateSponsor(this.props.params.sponsorName, body)
	      } else {
	        r = await createSponsor(body)
	      }
	
	      console.log(r);
	      appUtils.setFlash({title: '스폰서가 등록되었습니다.', message: JSON.stringify(r, undefined, 4), level: 'success', autoDismiss: 3})
	    } catch (e) { // error from axios.request
	      console.log(e);
	      appUtils.setFlash({title: '등록에 실패하였습니다.', message: JSON.stringify(e.response, undefined, 4), level: 'error', autoDismiss: 3, dismissible: true})
	    }
		{/* try {
			const res = await axios.post(API_URL, {...this.state})
			console.log('save response', res);
		} catch (e) {
			console.error('save error', e);
		}
		*/}
	}

	// 서버에서 받기
	fetchProject = async () => {

	}
}
