import { ProjectEditorConstants as CONSTANTS } from '../constants'
import 'isomorphic-fetch'

// Used in ProjectEditor.inputOnChangeHandlers
export const updateCreatorName = (name) => ({ type: CONSTANTS.Creator.NAME_UPDATED, name })
export const updateCreatorDescription = (description) => ({ type: CONSTANTS.Creator.DESCRIPTION_UPDATED, description })
export const updateCreatorIconSrc = (iconSrc) => ({ type: CONSTANTS.Creator.ICONSRC_UPDATED, iconSrc })

export const updateHeadingImgSrc = (imgSrc) => ({ type: CONSTANTS.Heading.IMGSRC_UPDATED, imgSrc})
export const updateHeadingLogoSrc = (logoSrc) => ({ type: CONSTANTS.Heading.LOGOSRC_UPDATED, logoSrc})
export const updateHeadingTitle = (title) => ({type: CONSTANTS.Heading.TITLE_UPDATED, title})
export const updateHeadingDateFrom = (dateFrom) => ({type: CONSTANTS.Heading.DATEFROM_UPDATED, dateFrom})
export const updateHeadingDateTo = (dateTo) => ({type: CONSTANTS.Heading.DATETO_UPDATED, dateTo})
export const updateHeadingTargetMoney = (targetMoney) => ({type: CONSTANTS.Heading.TARGETMONEY_UPDATED, targetMoney})

export const part1NewContent = (contentType, content) => ({type: CONSTANTS.Overview.Part1.NEW_CONTENT, contentType, content})
export const part1ContentChanged = (contentIndex, content) => ({type: CONSTANTS.Overview.Part1.CONTENT_CHANGED, contentIndex, content})
export const part1ContentMoved = (preIndex, postIndex) => ({type: CONSTANTS.Overview.Part1.CONTENT_MOVED, preIndex, postIndex})
export const part1ContentDeleted = (contentIndex) => ({type: CONSTANTS.Overview.Part1.CONTENT_DELETED, contentIndex})

export const part2NewContent = (contentType, content) => ({type: CONSTANTS.Overview.Part2.NEW_CONTENT, contentType, content})
export const part2ContentChanged = (contentIndex, content) => ({type: CONSTANTS.Overview.Part2.CONTENT_CHANGED, contentIndex, content})
export const part2ContentMoved = (preIndex, postIndex) => ({type: CONSTANTS.Overview.Part2.CONTENT_MOVED, preIndex, postIndex})
export const part2ContentDeleted = (contentIndex) => ({type: CONSTANTS.Overview.Part2.CONTENT_DELETED, contentIndex})

// 실패 ...
// export const part2Handlers = {
// 	create: function (contentType, content) { return {type: CONSTANTS.Overview.Part2.NEW_CONTENT, contentType, content} },
// 	changed: function (contentType, content) { return {type: CONSTANTS.Overview.Part2.CONTENT_CHANGED, contentType, content} },
// 	moved: function (preIndex, postIndex) { return {type: CONSTANTS.Overview.Part2.CONTENT_MOVED, preIndex, postIndex} },
// 	delete: function (contentIndex) { return {type: CONSTANTS.Overview.Part2.CONTENT_DELETED, contentIndex} }
// }

export const asyncPart2Handlers = (dispatch) => async (contentType, content) => {
	const ret = await fetch('/api/test-api/read/magazines')
	console.log(ret)
	return ({type: CONSTANTS.Overview.Part2.NEW_CONTENT, contentType, content})
}

// new version
import { ProjectEditorNewConstants as _CONSTANTS } from '../constants'

// project.abstract
export const updateProjectAbstractLongTitle = (longTitle) => ({ type: _CONSTANTS.project.abstract.longTitle, payload: { longTitle } })
export const updateProjectAbstractShortTitle = (shortTitle) => ({ type: _CONSTANTS.project.abstract.shortTitle, payload: { shortTitle } })
export const updateProjectAbstractImgSrc = (imgSrc) => ({ type: _CONSTANTS.project.abstract.imgSrc, payload: {imgSrc} })
export const updateProjectAbstractCategory = (category) => ({ type: _CONSTANTS.project.abstract.category, payload: {category} })
export const updateProjectAbstractProjectName = (projectName) => ({ type: _CONSTANTS.project.abstract.projectName, payload: {projectName} })

// project.funding
export const updateProjectFundingCurrentMoney = (currentMoney) => ({ type: _CONSTANTS.project.funding.currentMoney, payload: {currentMoney}, })
export const updateProjectFundingTargetMoney = (targetMoney) => ({ type: _CONSTANTS.project.funding.targetMoney, payload: {targetMoney}, })
export const updateProjectFundingDateFrom = (dateFrom) => ({ type: _CONSTANTS.project.funding.dateFrom, payload: {dateFrom}, })
export const updateProjectFundingDateTo = (dateTo) => ({ type: _CONSTANTS.project.funding.dateTo, payload: {dateTo}, })

// project.funding.rewards
export const updateProjectFundingRewardsCreated = (reward) => ({ type: _CONSTANTS.project.funding.rewards.created, payload: {reward}, })
export const updateProjectFundingRewardsChanged = (index, reward) => ({ type: _CONSTANTS.project.funding.rewards.changed, payload: {index, reward}, })
export const updateProjectFundingRewardsRemoved = (index, reward) => ({ type: _CONSTANTS.project.funding.rewards.removed, payload: {index, reward}, })
export const updateProjectFundingRewardsMoved = (preIndex, postIndex) => ({ type: _CONSTANTS.project.funding.rewards.moved, payload: {preIndex, postIndex}, })

// project.overview
export const updateProjectOverviewIntro = (intro) => ({ type: _CONSTANTS.project.overview.intro, payload: {intro}, })

// project.overview.part1
export const updateProjectOverviewPart1Created = (contentType, content) => ({ type: _CONSTANTS.project.overview.part1.created, payload: { contentType, content }, })
export const updateProjectOverviewPart1Changed = (index, content) => ({ type: _CONSTANTS.project.overview.part1.changed, payload: { index, content }, })
export const updateProjectOverviewPart1Removed = (index, content) => ({ type: _CONSTANTS.project.overview.part1.removed, payload: { index, content }, })
export const updateProjectOverviewPart1Moved = (preIndex, postIndex) => ({ type: _CONSTANTS.project.overview.part1.moved, payload: { preIndex, postIndex }, })

// project.overview.part2
export const updateProjectOverviewPart2Created = (contentType, content) => ({ type: _CONSTANTS.project.overview.part2.created, payload: { contentType, content }, })
export const updateProjectOverviewPart2Changed = (index, content) => ({ type: _CONSTANTS.project.overview.part2.changed, payload: { index, content }, })
export const updateProjectOverviewPart2Removed = (index, content) => ({ type: _CONSTANTS.project.overview.part2.removed, payload: { index, content }, })
export const updateProjectOverviewPart2Moved = (preIndex, postIndex) => ({ type: _CONSTANTS.project.overview.part2.moved, payload: { preIndex, postIndex }, })

// project.post
export const updateProjectPostIntro = (intro) => ({ type: _CONSTANTS.project.post.intro, payload: { intro }, })

// project.post.posts
export const updateProjectPostPostsCreated = (post) => ({ type: _CONSTANTS.project.post.posts.created, payload: { post }, })
export const updateProjectPostPostsRead = (posts) => ({ type: _CONSTANTS.project.post.posts.read, payload: { posts }, })
export const updateProjectPostPostsUpdated = (postId, post) => ({ type: _CONSTANTS.project.post.posts.updated, payload: { postId, post }, })
export const updateProjectPostPostsDeleted = (postId, post) => ({ type: _CONSTANTS.project.post.posts.deleted, payload: { postId, post }, })
export const updateProjectPostPostsError = (posts) => ({ type: _CONSTANTS.project.post.posts.error, payload: { posts }, })

// project.post.posts.comments
export const updateProjectPostPostsCommentsCreated = (comment) => ({ type: _CONSTANTS.project.post.posts.comments.created, payload: { comment }, })
export const updateProjectPostPostsCommentsRead = (comments) => ({ type: _CONSTANTS.project.post.posts.comments.read, payload: { comments }, })
export const updateProjectPostPostsCommentsUpdated = (commentId, comment) => ({ type: _CONSTANTS.project.post.posts.comments.updated, payload: { commentId, comment }, })
export const updateProjectPostPostsCommentsDeleted = (commentId, comment) => ({ type: _CONSTANTS.project.post.posts.comments.deleted, payload: { commentId, comment }, })
export const updateProjectPostPostsCommentsError = (comments) => ({ type: _CONSTANTS.project.post.posts.comments.error, payload: { comments }, })

// project.qna
export const updateProjectQnAIntro = (intro) => ({ type: _CONSTANTS.project.qna.intro, payload: { intro }, })

// project.qna.posts
export const updateProjectQnAPostsCreated = (post) => ({ type: _CONSTANTS.project.qna.posts.created, payload: { post }, })
export const updateProjectQnAPostsRead = (posts) => ({ type: _CONSTANTS.project.qna.posts.read, payload: { posts }, })
export const updateProjectQnAPostsUpdated = (postId, post) => ({ type: _CONSTANTS.project.qna.posts.updated, payload: { postId, post }, })
export const updateProjectQnAPostsDeleted = (postId, post) => ({ type: _CONSTANTS.project.qna.posts.deleted, payload: { postId, post }, })
export const updateProjectQnAPostsError = (posts) => ({ type: _CONSTANTS.project.qna.posts.error, payload: { posts }, })

// project.qna.posts.comments
export const updateProjectQnAPostsCommentsCreated = (comment) => ({ type: _CONSTANTS.project.qna.posts.comments.created, payload: { comment }, })
export const updateProjectQnAPostsCommentsRead = (comments) => ({ type: _CONSTANTS.project.qna.posts.comments.read, payload: { comments }, })
export const updateProjectQnAPostsCommentsUpdated = (commentId, comment) => ({ type: _CONSTANTS.project.qna.posts.comments.updated, payload: { commentId, comment }, })
export const updateProjectQnAPostsCommentsDeleted = (commentId, comment) => ({ type: _CONSTANTS.project.qna.posts.comments.deleted, payload: { commentId, comment }, })
export const updateProjectQnAPostsCommentsError = (comments) => ({ type: _CONSTANTS.project.qna.posts.comments.error, payload: { comments }, })

// project.ranking
export const updateProjectRankingRecent3DirectSupporters = (comments) => ({ type: _CONSTANTS.project.qna.posts.comments.error, payload: { comments }, })
