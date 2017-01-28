import React, { Component, PropType } from 'react'
import MagazineEditorTab from './MagazineEditorTab'
import ScrollToTop from 'react-scroll-up';

import update from 'immutability-helper'

import { fetchUserAndData, upload_file, createMagazine, updateMagazine } from '../../api/AppAPI'
import axios from 'axios'

import { canUseDOM } from '~/src/lib/utils'
import draftToHtml from 'draftjs-to-html'

const scrollStyle = {
  cursor: 'pointer',
}

const API_URL = '/api/test-api/magazine'

export default class MagazineEditor extends Component {

	state = {
    tabLinkBase: '',

		abstract: {
			longTitle: '',
			shortTitle: '',
			imgSrc: '',
      category: '',       // 건강, 라이프, ...
			magazineName: '',
			description: '',
		},

		creator: {
			creatorName: '',
			creatorImgSrc: '',
			creatorLocation: '',
			creatorDescription: '',
		},

		content: '',

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

      let tabLinkBase = `/${(document.URL.match(/magazines\/.+\/edit/) || ['magazine-editor'])[0]}`

      appUtils.setUser(user)

      if(data && data.magazine) {
        this.setState({
          ...this.server2client(data.magazine),
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
		} = this.props;

		children = children && React.cloneElement(children, {
			...this.state,

		 // Abstract
		 ...this.abstractSubmitCallbacks,
		 // Content
		 ...this.contentSubmitCallbacks,

		 // related contents
		 ...this.relatedContentSubmitCallbacks,
     contentHandlers: this.contentHandlers,

		})

		if (!canUseDOM) {
			return (<div>Loading...</div>)
		} else {
			return (
				<div className="exhibition-editor">
					<MagazineEditorTab
            tabLinkBase={this.state.tabLinkBase}
            save={this.save}
          />
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
    _onCategorySubmit: (category) => this.setState(update(this.state, {
			abstract: {
				category: { $set: category }
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
		_onDescriptionSubmit: (description)  => this.setState(update(this.state, {
			abstract: {
				description: { $set: description }
			}
		}))
	}

	// Content
	contentSubmitCallbacks = {
		_onContentSubmit: (raw) => this.setState(update(this.state, {
			content: { $set: raw }
		}))
	}


	// Recommended Magazines
	relatedContentSubmitCallbacks = {
    _onRelatedContentSubmit: ({newContent}) => this.setState(update(this.state, {
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
      content: {
        raw: JSON.stringify(this.state.content),
        html: draftToHtml(this.state.content),
      },
      relatedContents: this.state.relatedContent.contents
    }
  }

  server2client = (m) => update(this.state, {
    abstract: { $set: m.abstract },
    creator: { $set: m.creator },
    content: { $set: m.content.raw },
    relatedContent: {
      contents: { $set: m.relatedContents }
    }
  })

	save = async () => {
		console.log('body', this.client2server());
    const body = this.client2server()

		try {
      let res;
      if (this.props.params.magazineName) {
        res = await updateMagazine(this.props.params.magazineName, body)
        console.log('update result', res);
      } else {
        res = await createMagazine(body)
        console.log('create result', res);
      }

      appUtils.etFlash({title: 'magazine saved', message: JSON.stringify(res, undefined, 4), level: 'success'})
		} catch (e) {
			console.error('save error', e);
      appUtils.setFlash({title: 'magazine save error', message: JSON.stringify(e.response, undefined, 4), level: 'error', autoDismiss: 0, dismissible: true})
		}
	}
}
