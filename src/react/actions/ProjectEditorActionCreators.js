import { ProjectEditorConstants as CONSTANTS } from '../constants'

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