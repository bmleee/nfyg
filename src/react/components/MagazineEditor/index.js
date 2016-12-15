import React, { Component, PropType } from 'react'
import MagazineEditorTab from './MagazineEditorTab'
import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

import axios from 'axios'

import { canUseDOM } from '~/src/lib/utils'

const scrollStyle = {
  cursor: 'pointer',
}

const API_URL = '/api/test-api/magazine'

export default class ExhibitionEditor extends Component {

	state = {
		abstract: {
			longTitle: '',
			shortTitle: '',
			imgSrc: '',
			magazineName: '',
		},

		creator: {
			creatorName: '',
			creatorImgSrc: '',
			creatorLocation: '',
			creatorDescription: '',
		},

		content: '',

		recommendedExhibitions: {
			recommends: [],
			newRecommend: {
				imgSrc: '',
				title: '',
				description: '',
				link: '',
			}
		},

		recommendedMagazines: {
			recommends: [],
			newRecommend: {
				imgSrc: '',
				title: '',
				description: '',
				link: '',
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
		 // Content
		 ...this.contentSubmitCallbacks,
		 // Recommended exhibitions
		 ...this.exhibitionSubmitCallbacks,
		 exhibitionHandlers: this.exhibitionHandlers,
		 // Recommended exhibitions
		 ...this.magazineSubmitCallbacks,
		 magazineHandlers: this.magazineHandlers,
		})

		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="exhibition-editor">
					<MagazineEditorTab save={this.save} />
					 {children}
				<ScrollToTop showUnder={180} style={scrollStyle} duration={0} >
				<button className="back-to-top" />
				</ScrollToTop>	
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
		_onMagazineNameSubmit:(magazineName) => this.setState(update(this.state, {
			abstract: {
				magazineName: { $set: magazineName }
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

	// Content
	contentSubmitCallbacks = {
		_onContentSubmit: (raw) => this.setState(update(this.state, {
			content: { $set: raw }
		}))
	}

	// Recommended Exhibitions
	exhibitionSubmitCallbacks = {
		_onExhibitionSubmit: ({recommends, newRecommend}) => this.setState(update(this.state, {
			recommendedExhibitions: {
				recommends: {
					$push: [{...newRecommend}]
				},
				newRecommend: {
					title: { $set: '' },
					description: { $set: '' },
					imgSrc: { $set: '' },
					link: { $set: '' },
				}
			}
		}))
	}

	exhibitionHandlers = {
		_onTitle: (e) => this.setState(update(this.state, {
			recommendedExhibitions: {
				newRecommend: {
					title: { $set: e.target.value }
				}
			}
		})),
		_onDescription: (e) => this.setState(update(this.state, {
			recommendedExhibitions: {
				newRecommend: {
					description: { $set: e.target.value }
				}
			}
		})),
		_onImgSrc: (e) => this.setState(update(this.state, {
			recommendedExhibitions: {
				newRecommend: {
					imgSrc: { $set: e.target.value }
				}
			}
		})),
		_onLink: (e) => this.setState(update(this.state, {
			recommendedExhibitions: {
				newRecommend: {
					link: { $set: e.target.value }
				}
			}
		})),
		deleteExhibition: (index) => this.setState(update(this.state, {
			recommendedExhibitions: {
				recommends: {
					$splice: [
						[index, 1]
					]
				}
			}
		})),
	}

	// Recommended Magazines
	magazineSubmitCallbacks = {
		_onMagazineSubmit: ({recommends, newRecommend}) => this.setState(update(this.state, {
			recommendedMagazines: {
				recommends: {
					$push: [{...newRecommend}]
				},
				newRecommend: {
					title: { $set: '' },
					description: { $set: '' },
					imgSrc: { $set: '' },
					link: { $set: '' },
				}
			}
		}))
	}

	magazineHandlers = {
		_onTitle: (e) => this.setState(update(this.state, {
			recommendedMagazines: {
				newRecommend: {
					title: { $set: e.target.value }
				}
			}
		})),
		_onDescription: (e) => this.setState(update(this.state, {
			recommendedMagazines: {
				newRecommend: {
					description: { $set: e.target.value }
				}
			}
		})),
		_onImgSrc: (e) => this.setState(update(this.state, {
			recommendedMagazines: {
				newRecommend: {
					imgSrc: { $set: e.target.value }
				}
			}
		})),
		_onLink: (e) => this.setState(update(this.state, {
			recommendedMagazines: {
				newRecommend: {
					link: { $set: e.target.value }
				}
			}
		})),
		deleteMagazine: (index) => this.setState(update(this.state, {
			recommendedMagazines: {
				recommends: {
					$splice: [
						[index, 1]
					]
				}
			}
		})),
	}

	save = async () => {
		try {
			const res = await axios.post(API_URL, {...this.state})
			console.log('save response', res);
		} catch (e) {
			console.error('save error', e);
		}
	}
}
