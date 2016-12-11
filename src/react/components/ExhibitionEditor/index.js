import React, { Component, PropType } from 'react'
import ExhibitionEditorTab from './ExhibitionEditorTab'

import update from 'immutability-helper'

import axios from 'axios'

import { canUseDOM } from '~/src/lib/utils'

const API_URL = '/api/test-api/exhibition'

export default class ExhibitionEditor extends Component {

	state = {
		abstract: {
			longTitle: '',
			shortTitle: '',
			imgSrc: '',
			location: '',
			dateFrom: '',
			dateTo: '',
			exhibitionName: '',
		},

		creator: {
			creatorName: '',
			creatorImgSrc: '',
			creatorLocation: '',
			creatorDescription: '',
		},

		overview: {
			part1: '',
			part2: '',
		},

		artwork: {
			artworks: [], // [{imgSrc, title, description, price, soldOut}]
			newArtwork: {
				imgSrc:'',
				title: '',
				description: '',
				price: 0,
				soldOut: false
			}
		},

		recommend: {
			recommends: [],
			newRecommend: {
				imgSrc: '',
				title: '',
				description: '',
			}
		},
	}

	render() {

		let {
			children
		} = this.props;

		children = children && React.cloneElement(children, {
			...this.state,

		 // Abstract
		 ...this.abstractSubmitCallbacks,
		 // Overview
		 ...this.overviewSubmitCallbacks,
		 // Artworks
		 ...this.artworkSubmitCallbacks,
		 artworkHandlers: this.artworkHandlers,
		 // Recommend
		 ...this.recommendSubmitCallbacks,
		 recommendHandlers: this.recommendHandlers
		})

		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="exhibition-editor">
					<ExhibitionEditorTab save={this.save} />
					 {children}
				</div>
			)
		}
	}


	// Abstract
	abstractSubmitCallbacks = {
		_onLongTitleSubmit:(longTitle) => this.setState(update(this.state, {
			abstract: {
				longTitle: { $set: longTitle }
			}
		})),
		_onShortTitleSubmit:(shortTitle) => this.setState(update(this.state, {
			abstract: {
				shortTitle: { $set: shortTitle }
			}
		})),
		_onImgSrcSubmit:(imgSrc) => this.setState(update(this.state, {
			abstract: {
				imgSrc: { $set: imgSrc }
			}
		})),
		_onLocationSubmit:(location) => this.setState(update(this.state, {
			abstract: {
				location: { $set: location }
			}
		})),
		_onDateFromSubmit:(dateFrom) => this.setState(update(this.state, {
			abstract: {
				dateFrom: { $set: dateFrom }
			}
		})),
		_onDateToSubmit:(dateTo) => this.setState(update(this.state, {
			abstract: {
				dateTo: { $set: dateTo }
			}
		})),
		_onExhibitionNameSubmit:(exhibitionName) => this.setState(update(this.state, {
			abstract: {
				exhibitionName: { $set: exhibitionName }
			}
		})),
		_onCreatorNameSubmit:(creatorName) => this.setState(update(this.state, {
			creator: {
				creatorName: { $set: creatorName }
			}
		})),
		_onCreatorImgSrcSubmit:(creatorImgSrc) => this.setState(update(this.state, {
			creator: {
				creatorImgSrc: { $set: creatorImgSrc }
			}
		})),
		_onCreatorLocationSubmit:(creatorLocation) => this.setState(update(this.state, {
			creator: {
				creatorLocation: { $set: creatorLocation }
			}
		})),
		_onCreatorDescriptionSubmit:(creatorDescription) => this.setState(update(this.state, {
			creator: {
				creatorDescription: { $set: creatorDescription }
			}
		})),
	}

	// Overview
	overviewSubmitCallbacks = {
		_onPart1Submit: (raw) => {
			console.log('overviewSUbmitCallback.raw', raw);
			this.setState(update(this.state, {
				overview: {
					part1: { $set: raw }
				}
			}))
		},
		_onPart2Submit: (raw) => this.setState(update(this.state, {
			overview: {
				part2: { $set: raw }
			}
		}))
	}

	// Artworks
	artworkSubmitCallbacks = {
		_onArtworkSubmit: ({newArtwork}) => this.setState(update(this.state, {
			artwork: {
				artworks: {
					$push: [{...newArtwork}]
				},
				newArtwork: {
					title: { $set: '' },
					description: { $set: '' },
					price: { $set: 0 },
					imgSrc: { $set: '' },
					soldOut: { $set: false },
				}
			}
		}))
	}

	artworkHandlers = {
		_onTitle: (e) => this.setState(update(this.state, {
			artwork: {
				newArtwork: {
					title: { $set: e.target.value }
				}
			}
		})),
		_onDescription: (e) => this.setState(update(this.state, {
			artwork: {
				newArtwork: {
					description: { $set: e.target.value }
				}
			}
		})),
		_onPrice: (e) => this.setState(update(this.state, {
			artwork: {
				newArtwork: {
					price: { $set: Number(e.target.value) }
				}
			}
		})),
		_onImgSrc: (e) => this.setState(update(this.state, {
			artwork: {
				newArtwork: {
					imgSrc: { $set: Number(e.target.value) }
				}
			}
		})),
		_onSoldOut: (e) => this.setState(update(this.state, {
			artwork: {
				newArtwork: {
					soldOut: { $set: e.value } // react-select
				}
			}
		})),
		deleteArtwork: (index) => this.setState(update(this.state, {
			artwork: {
				artworks: {
					$splice: [
						[index, 1]
					]
				}
			}
		})),
	}

	// Recommend
	recommendSubmitCallbacks = {
		_onRecommendSubmit: ({newRecommend}) => this.setState(update(this.state, {
			recommend: {
				recommends: {
					$push: [{...newArtwork}]
				},
				newRecommend: {
					title: { $set: '' },
					description: { $set: '' },
					imgSrc: { $set: '' },
				}
			}
		}))
	}

	recommendHandlers = {
		_onTitle: (e) => this.setState(update(this.state, {
			recommend: {
				newRecommend: {
					title: { $set: e.target.value }
				}
			}
		})),
		_onDescription: (e) => this.setState(update(this.state, {
			recommend: {
				newRecommend: {
					description: { $set: e.target.value }
				}
			}
		})),
		_onImgSrc: (e) => this.setState(update(this.state, {
			recommend: {
				newRecommend: {
					imgSrc: { $set: e.target.value }
				}
			}
		})),
	}

	save = async () => {
		console.log('state', this.state);
		try {
			const res = await axios.post(API_URL, {...this.state})
			console.log('save response', res);
		} catch (e) {
			console.error('save error', e);
		}
	}
}
