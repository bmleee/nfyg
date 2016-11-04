module.exports = {
	REQUEST_TODOS: 'request todos',
	RECEIVE_TODOS: 'receive todos',

	REQUEST_CREATE_TODO: 'request create todo',
	RECEIVE_CREATE_TODO: 'receive create todo',

	REQUEST_TOGGLE_TODO: 'request update todo',
	RECEIVE_TOGGLE_TODO: 'receive update todo',

	ProjectEditorConstants: {
		Creator: {
			NAME_UPDATED: 'CREATOR_NAME_UPDATED',
			ICONSRC_UPDATED: 'CREATOR_ICONSRC_UPDATED',
			DESCRIPTION_UPDATED: 'CREATOR_DESCRIPTION_UPDATED',
		},
		Heading: {
			IMGSRC_UPDATED: 'HEADING_IMGSRC_UPDATED',
			LOGOSRC_UPDATED: 'HEADING_LOGOSRC_UPDATED',
			TITLE_UPDATED: 'HEADING_TITLE_UPDATED',
			DATEFROM_UPDATED: 'HEADING_DATEFROM_UPDATED',
			DATETO_UPDATED: 'HEADING_DATETO_UPDATED',
			CURRENTMONEY_UPDATED: 'HEADING_CURRENTMONEY_UPDATED',
			TARGETMONEY_UPDATED: 'HEADING_TARGETMONEY_UPDATED',
		},
		Overview: {
			Part1: {
				NEW_CONTENT: 'OVERVIEW_PART1_NEW_CONTENT',
				CONTENT_CHANGED: 'OVERVIEW_PART1_CONTENT_CHANGED',
				CONTENT_MOVED: 'OVERVIEW_PART1_CONTENT_MOVED',
				CONTENT_DELETED: 'OVERVIEW_PART1_CONTENT_DELETED',
			},
			Part2: {
				NEW_CONTENT: 'OVERVIEW_PART2_NEW_CONTENT',
				CONTENT_CHANGED: 'OVERVIEW_PART2_CONTENT_CHANGED',
				CONTENT_MOVED: 'OVERVIEW_PART2_CONTENT_MOVED',
				CONTENT_DELETED: 'OVERVIEW_PART2_CONTENT_DELETED',
			}
		},
		Rewards: {
			NEW_REWARD: 'REWARDS_NEW_REWARD',
			REWARD_CHANGED: 'REWARDS_REWARD_CHANGED',
			REWARD_MOVED: 'REWARDS_REWARD_MOVED',
			REWARD_DELETED: 'REWARDS_REWARD_DELETED',

		},
		Post: {
			Heading: {
				ICONSRC_UPDATED: 'POST_HEADING_ICONSRC_UPDATED',
				DESCRIPTION_UPDATED: 'POST_HEADING_DESCRIPTION_UPDATED',
			}
		}
	},

	/**
	 * 한번에 작성 / 수정 할 부분(Read도 Project 객체 받을 때 한번에 받아옴)
	 *  - creator.*
	 *  - project.abstract.*
	 *  - project.funding.*
	 *  - project.overview.*
	 *  - project.posts.intro_message
	 * CRUD 부분(부분적으로 CRUD)
	 *	C: 서버에 올리고, 업로드 성공하면 로컬 상태 변경
	 *	R: 서버에서 Posts를 읽어 옴. 로컬 상태 업데이트 (배열 사이즈가 0에서 Posts.length로)
	 *	U: 서버에 PUT request 요청 후, 변경 성공하면 로컬 상태 변경
	 *	D: 서버에 DELETE request 요청 후, 삭제 성공하면 로컬 상태 변경
	 *  - project.posts.posts
	 *  - project.posts.posts.comments
	 *  - project.qna.posts
	 *  - project.ranking.{directSupporters, indirectSupporters}
	 *			수정 페이지에서 열람 가능해야 함
	 *
	 * 다른 API에 의해 변경 되는 부분. (단순히 Read, Update만 해도 됨)
	 *  - project.ranking.{recent3DirectSupporters, recent3IndirectSupporters} :
	 */
	ProjectEditorNewConstants: {
		project: {
			abstract: {
				longTitle: 'PROJECT ABSTRACT LONG TITLE',
	      shortTitle: 'PROJECT ABSTRACT SHORT TITLE',
	      imgSrc: 'PROJECT ABSTRACT IMAGE SOURCE',
	      category: 'PROJECT ABSTRACT CATEGORY',
	      projectName: 'PROJECT ABSTRACT PROJECT NAME',
			},
			funding: {
				currentMonoey: 'PROJECT FUNDING CURRENT MONEY',
				targetMoney: 'PROJECT FUNDING TARGET MONEY',
				dateFrom: 'PROJECT FUNDING DATE FROM',
				dateTo: 'PROJECT FUNDING DATE TO',
				rewards: { // array
					created: 'PROJECT FUNDING REWARD CREATED',
					changed: 'PROJECT FUNDING REWARD CHANGED',
					removed: 'PROJECT FUNDING REWARD REMOVED',
					moved: 'PROJECT FUNDING REWARD MOVED',
				}
			},
			overview: {
				intro: 'PROJECT OVERVIEW INTRO',
				part1: { // array
					created: 'PROJECT OVERVIEW PART1 CREATED',
					changed: 'PROJECT OVERVIEW PART1 CHANGED',
					removed: 'PROJECT OVERVIEW PART1 REMOVED',
					moved: 'PROJECT OVERVIEW PART1 MOVED',
				},
				part2: { // array
					created: 'PROJECT OVERVIEW PART2 CREATED',
					changed: 'PROJECT OVERVIEW PART2 CHANGED',
					removed: 'PROJECT OVERVIEW PART2 REMOVED',
					moved: 'PROJECT OVERVIEW PART2 MOVED',
				},
			},
			post: {
				intro: 'PROJECT POST INTRO',
				posts: { // CRUID
					created: 'PROJECT POST POSTS CREATED',
					read: 'PROJECT POST POSTS READ',
					updated: 'PROJECT POST POSTS UPDATED',
					deleted: 'PROJECT POST POSTS DELETED',
					error: 'PROJECT POST POSTS ERROR',
					comments: { // CRUD
						created: 'PROJECT POST POSTS COMMENTS CREATED',
						read: 'PROJECT POST POSTS COMMENTS READ',
						updated: 'PROJECT POST POSTS COMMENTS UPDATED',
						deleted: 'PROJECT POST POSTS COMMENTS DELETED',
						error: 'PROJECT POST POSTS COMMENTS ERROR'
					}
				},
			},
			qna: {
				intro: 'PROJECT QNA INTRO',
				posts: { // CRUD
					created: 'PROJECT QnA POSTS CREATED',
					read: 'PROJECT QnA POSTS READ',
					updated: 'PROJECT QnA POSTS UPDATED',
					deleted: 'PROJECT QnA POSTS DELETED',
					error: 'PROJECT QnA POSTS ERROR',
					comments: { // CRUD
						created: 'PROJECT QnA POSTS COMMENTS CREATED',
						read: 'PROJECT QnA POSTS COMMENTS READ',
						updated: 'PROJECT QnA POSTS COMMENTS UPDATED',
						deleted: 'PROJECT QnA POSTS COMMENTS DELETED',
						error: 'PROJECT QnA POSTS COMMENTS ERROR'
					}
				}
			},
			ranking: {
				recent3DirectSupporters: 'PROJECT RANKING RECENT 3 DIRECT SUPPORTERS',
				recent3IndirectSupporters: 'PROJECT RANKING RECENT 3 INDIRECT SUPPORTERS',
				directSupporters: { // CRUD
					created: 'PROJECT RANKING POSTS CREATED',
					read: 'PROJECT POST POSTS READ',
					updated: 'PROJECT POST POSTS UPDATED',
					deleted: 'PROJECT POST POSTS DELETED',
					error: 'PROJECT POST POSTS ERROR'
				},
				indirectSupporters: { // CRUD
					created: 'PROJECT POST POSTS CREATED',
					read: 'PROJECT POST POSTS READ',
					updated: 'PROJECT POST POSTS UPDATED',
					deleted: 'PROJECT POST POSTS DELETED',
					error: 'PROJECT POST POSTS ERROR'
				},
			}
		},
		creator: {
			imgSrc: 'CREATOR IAMGE SOURCE',
			name: 'CREATOR NAME',
			location: 'CREATOR LOCATION'
		}
	},

	Display: {
		MOBILE: 'display is mobilde',
		TABLET: 'display is tablet',
		DESKTOP: 'display is desktop',
	}
}
