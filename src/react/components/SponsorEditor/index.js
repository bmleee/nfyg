import React, { Component, PropType } from 'react'
import update from 'immutability-helper'

import Body from './Body'
import Tab from './Tab'

import axios from 'axios'

import { fetchUserAndData } from '../../api/AppAPI'

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

			if(this.props.setUser) this.props.setUser(user)

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
