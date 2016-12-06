import {
  ProjectEditorConstants as CONSTANTS
} from '../constants';

import update from 'react-addons-update';

import 'babel-polyfill';

const defaultNewState = () => ({
  project: {
    abstract: {
      longTitle: '',     //
      shortTitle: '',    //
      imgSrc: '',         //
      category: '',       // 건강, 라이프, ...
      projectName: '',   // projects/:project_name
    },
    fuding: {
      currentMoney: 0,   // 직접 / 간접 후원에 의해 추가됨
      targetMoney: 0,
      dateFrom: null,     // 작성 완료 한 시간
      dateTo: null,
      rewards: []         // { title, description, isDirectSupport: T/F, threshold: 직접 후원 금액 또는 좋아요, 리공유 수 }
    },
    overview: {           // Overview 탭에 보여줄 내용
      intro: null,
      part1: [],          // { cointentType, content }
      part2: []
    },
    post: {
      intro: '',  // POST 탭 가장 위에 보여줄 메시지
      posts: []           // { opened, author: {name, iconSrc}, title, created_at, numSupporters, likes, contents: [ {contentType, content} ], comments: [ { author: {name, iconSrc}, content}] }
      // OPOST 댓글 .좋아요...
    },
    qna: {
      selectOptions: [],  // { value, label }
      posts: []           // same as post.posts
    },
    ranking: {
      recent3DirectSupporters: [],    // user fb_id
      recent3IndirectSupporters: [],  // user fb_id
      directSupporters: [],           // { uid, fb_id, display_name, photoURL, money, support_at }
      indirectSupporters: [],         // { uid, fb_id, display_name, photoURL, message, likes, comments, shares, rank, support_at }
    }
  },
  creator: {
    imgSrc: '',
    name: '',
    location: '',
  }
})

const defaultState = () => {
  return {
    creator: {
      name: '',
      iconSrc: '',
      description: '',
    },
    heading: {
      imgSrc: '',
      logoSrc: '',
      title: '',
      dateFrom: null,
      dateTo: null,
      currentMoney: -1,
      targetMoney: -1,
    },
    overview: {
      // part1: [ {contentType: 'text', content: 'sample text content' } ], // { type, content }
      // part2: [ {contentType: 'image', content: '/assets/images/sample-icon.svg'} ], // { type, content }
      part1: [],
      part2: []
    },
    rewards: [], // { title, description }
    post: {
      heading: { // Post탭에 보일 아이콘, 설명
        iconSrc: '',
        description: '',
      }
    },
  }
}

let contentIndex, preIndex, postIndex;
let content, contentType;
let reward, rewardIndex;
const ProjectEditor = (state = defaultState(), action) => {
  switch (action.type) {
    // Creator
    case CONSTANTS.Creator.NAME_UPDATED:
      return update(state, { creator: {name: {$set: action.name } } } )
    case CONSTANTS.Creator.ICONSRC_UPDATED:
      return update(state, { creator: {iconSrc: {$set: action.iconSrc } } } )
    case CONSTANTS.Creator.DESCRIPTION_UPDATED:
      return update(state, { creator: {description: {$set: action.description } } } )

    // Heading
    case CONSTANTS.Heading.IMGSRC_UPDATED:
      return update(state, { heading: {imgSrc: {$set: action.imgSrc} } } )
    case CONSTANTS.Heading.LOGOSRC_UPDATED:
      return update(state, { heading: {logoSrc: {$set: action.logoSrc} } } )
    case CONSTANTS.Heading.TITLE_UPDATED:
      return update(state, { heading: {title: {$set: action.title} } } )
    case CONSTANTS.Heading.DATEFROM_UPDATED:
      return update(state, { heading: {dateFrom: {$set: action.dateFrom} } } )
    case CONSTANTS.Heading.DATETO_UPDATED:
      return update(state, { heading: {dateTo: {$set: action.dateTo} } } )
    case CONSTANTS.Heading.TARGETMONEY_UPDATED:
      return update(state, { heading: {targetMoney: {$set: action.targetMoney} } } )

    // Overview
    // Part1
    case CONSTANTS.Overview.Part1.NEW_CONTENT:
      return update(state, { overview: { part1: { $push: [{contentType: action.contentType, content: action.content}] }  } })
    case CONSTANTS.Overview.Part1.CONTENT_CHANGED:
      contentIndex = action.contentIndex
      return update(state, { overview: { part1: { [contentIndex]: { content: { $set: action.content } } } } } )
    case CONSTANTS.Overview.Part1.CONTENT_MOVED:
      preIndex = action.preIndex
      postIndex = action.postIndex
      content = getPart1Content(state, preIndex)

      return update(state, { overview: { part1: {
        $splice: [
          [preIndex, 1],
          [postIndex, 0, content]
        ]
      }  } })
    case CONSTANTS.Overview.Part1.CONTENT_DELETED:
      contentIndex = action.contentIndex
      return update(state, { overview: { part1: { $splice: [ [contentIndex, 1] ] } } })
    // Part2
    case CONSTANTS.Overview.Part2.NEW_CONTENT:
      return update(state, { overview: { part2: { $push: [{contentType: action.contentType, content: action.content}] }  } })
    case CONSTANTS.Overview.Part2.CONTENT_CHANGED:
      contentIndex = action.contentIndex
      return update(state, { overview: { part2: { [contentIndex]: { content: { $set: action.content } } } } } )
    case CONSTANTS.Overview.Part2.CONTENT_MOVED:
      preIndex = action.preIndex
      postIndex = action.postIndex
      content = getPart2Content(state, preIndex)

      return update(state, { overview: { part2: {
        $splice: [
          [preIndex, 1],
          [postIndex, 0, content]
        ]
      }  } })
    case CONSTANTS.Overview.Part2.CONTENT_DELETED:
      contentIndex = action.contentIndex
      return update(state, { overview: { part2: { $splice: [ [contentIndex, 1] ] } } })

    // Rewards
    case CONSTANTS.Rewards.NEW_REWARD:
      reward = action.reward
      return update(state, { rewards: { $push: [reward] } })
    case CONSTANTS.Rewards.REWARD_CHANGED:
      rewardIndex = action.rewardIndex
      reward = action.reward
      return update(state, { rewards: { $splice: [ [rewardIndex, 1, reward] ] } })
    case CONSTANTS.Rewards.REWARD_MOVED:
      [ preIndex, postIndex ] = [action.preIndex, action.postIndex]
      reward = getReward(state, preIndex)
      return update(state, { rewards: {
        $splice: [
          [preIndex, 1],
          [postIndex, 0, reward]
        ]
      } } )
    case CONSTANTS.Rewards.REWARD_DELETED:
      rewardIndex = action.rewardIndex
      return update(state, {
        rewards: {
          $splice: [
            [rewardIndex, 1]
          ]
        }
      });

    // Post
    // Heading
    case CONSTANTS.Post.Heading.ICONSRC_UPDATED:
      return update(state, {post: {heading: {iconSrc: {$set: action.iconSrc}}}})
    case CONSTANTS.Post.Heading.DESCRIPTION_UPDATED:
      return update(state, {post: {heading: {description: {$set: action.description}}}})


    ///**
  // * Fetch Todos
  // */
  //  case RECEIVE_TODOS:
  //    return action.success ? action.todos : [];
  //
  ///**
  // * Create Todo
  // */
  //  case REQUEST_CREATE_TODO :
  //    return update(state, { $push: action.todo });
  //
  //  case RECEIVE_CREATE_TODO :
  //    todoIndex = state.findIndex( t => t._id === action.todo._id );
  //
  //    return action.success ?
  //      udpate(state, { $splice: [ [todoIndex, 1, action.todo], ], }) :
  //      update(state, { $splice: [ [todoIndex, 1, ], ], });
  //
  ///**
  // * Toggle Todos
  // */
  //  case REQUEST_TOGGLE_TODO :
  //    todoIndex = getTodoIndex(state, action.todo._id);
  //
  //    return update(state, {
  //      [todoIndex]: {
  //        completed: {
  //          $apply: v => !v
  //        }
  //      }
  //    });
  //
  //  case RECEIVE_TOGGLE_TODO :
  //    todoIndex = state.findIndex( t => t._id === action.todo._id );
  //    return action.success ?
  //      update(state, { $splice: [ [todoIndex, 1, action.todo, ], ], }) :
  //      update(state, { $splice: [ [todoIndex, 1, ] ] });

    default:
      return state;
  }
}

export default ProjectEditor
export const getPart1Content = (state, index) => Object.assign({}, state.overview.part1[index])
export const getPart2Content = (state, index) => Object.assign({}, state.overview.part2[index])
export const getReward = (state, index) => Object.assign({}, state.rewards[index])
