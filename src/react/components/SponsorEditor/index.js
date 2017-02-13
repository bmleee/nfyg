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
			}
		},
	}

	async componentDidMount() {
		try {

			const {
				user,
				data
			} = await fetchUserAndData()

      appUtils.setUser(user)

      if(data && data.sponsor) {
        this.setState({
          sponsor: data.sponsor,
        })

        console.log(this.state)
      }
    } catch (e) {
      console.error(e);
      alert(e.message)
      // this.props.history.goBack()
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
    let body = this.state.sponsor;

    try {
      let r;

      if(this.props.params.sponsorName) {
        r = await updateSponsor(this.props.params.sponsorName, body)
      } else {
        r = await createSponsor(body)
      }

      console.log(r);
      this.props.appUtils.setFlash({title: '스폰서가 등록되었습니다.', message: JSON.stringify(r, undefined, 4), level: 'success', autoDismiss: 3})
    } catch (e) { // error from axios.request
      console.log(e);
      this.props.appUtils.setFlash({title: '등록에 실패하였습니다.', message: JSON.stringify(e.response, undefined, 4), level: 'error', autoDismiss: 3, dismissible: true})
    }
	}

}
