import { expect } from 'chai'
import reducer from '../../src/react/reducers/ProjectEditor'
import { ProjectEditorConstants as CONSTANTS } from '../../src/react/constants';


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
      part1: [], // { type, content }
      part2: [], // { type, content }
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

describe('src/react/ProjectEditor', () => {

  describe('creator', () => {
    it('name can be changed', () => {
      const state = defaultState()
      const name = 'CHANGED_NAME'
      const action = { type: CONSTANTS.Creator.NAME_UPDATED, name }

      const finalState = reducer(state, action)
      expect( finalState.creator.name).to.equal(name)
    })

    it('iconSrc can be changed', () => {
      const state = defaultState()
      const iconSrc = 'CHANGED_ICON_SRC'
      const action = { type: CONSTANTS.Creator.ICONSRC_UPDATED, iconSrc }

      const finalState = reducer(state, action)
      expect( finalState.creator.iconSrc).to.equal(iconSrc)
    })

    it('description can be changed', () => {
      const state = defaultState()
      const description = 'changed description'
      const action = { type: CONSTANTS.Creator.DESCRIPTION_UPDATED, description }

      const finalState = reducer(state, action)
      expect( finalState.creator.description ).to.equal(description)
    })

    it('set all members correctly', () => {
      const state = defaultState()
      const [name, iconSrc, description] = ['new name', 'new icon src', 'new description']
      const actions = [
        { type: CONSTANTS.Creator.NAME_UPDATED, name },
        { type: CONSTANTS.Creator.ICONSRC_UPDATED, iconSrc},
        { type: CONSTANTS.Creator.DESCRIPTION_UPDATED, description},
      ]

      const finalState = actions.reduce(reducer, state)

      expect(finalState.creator.name).to.equal(name)
      expect(finalState.creator.iconSrc).to.equal(iconSrc)
      expect(finalState.creator.description).to.equal(description)
    })
  })

  describe('heading', () => {
    it('members can be changed the way like creator')
  })

  describe('overview', () => {

    describe('part1', () => {
      it('can add new content', () => {
        const state = defaultState()
        const contentType = 'h1'
        const action = {
          type: CONSTANTS.Overview.Part1.NEW_CONTENT,
          contentType,
        }
        const nextState = reducer(state, action)
        const lastIndex = nextState.overview.part1.length - 1
        expect(nextState.overview.part1[lastIndex].contentType).to.equal(contentType)
      })


      it('can change content', () => {
        const state = defaultState()
        const content = 'This is changed content'
        const contentIndex = 0
        const actions = [
          { type: CONSTANTS.Overview.Part1.NEW_CONTENT, contentType: 'H1' },
          { type: CONSTANTS.Overview.Part1.CONTENT_CHANGED, content, contentIndex }
        ]
        const nextState = actions.reduce(reducer, state)

        expect(nextState.overview.part1[contentIndex].content).to.equal(content)
      })

      it('can move content', () => {
        const state = defaultState()
        const preIndex = 0
        const postIndex = 1
        const content = 'Changed Content'

        const actions = [
          {
            type: CONSTANTS.Overview.Part1.NEW_CONTENT,
            contentType: 'H1',
          },
          {
            type: CONSTANTS.Overview.Part1.CONTENT_CHANGED,
            content,
            contentIndex: 0,
          },
          {
            type: CONSTANTS.Overview.Part1.NEW_CONTENT,
            contentType: 'H2',
          },
          {
            type: CONSTANTS.Overview.Part1.CONTENT_MOVED,
            preIndex,
            postIndex,
          }
        ]
        const nextState = actions.reduce(reducer, state)

        expect(nextState.overview.part1[postIndex].content).to.equal(content)
      })

      it('can delete content', () => {
        const state = defaultState()
        const contentIndex = 0
        const content = 'Changed Content'

        const actions = [
          {
            type: CONSTANTS.Overview.Part1.NEW_CONTENT,
            contentType: 'H1',
          },
          {
            type: CONSTANTS.Overview.Part1.CONTENT_CHANGED,
            content,
            contentIndex,
          },
          {
            type: CONSTANTS.Overview.Part1.NEW_CONTENT,
            contentType: 'H2',
          },
          {
            type: CONSTANTS.Overview.Part1.CONTENT_DELETED,
            contentIndex: 0,
          }
        ]
        const nextState = actions.reduce(reducer, state)

        expect(nextState.overview.part1[contentIndex].contentType).to.equal('H2')
      })
    })

    describe('part2', () => {
      it('part2 is the same as part1')
    })
  })

  describe('rewards', () => {
    it('can add new reward', () => {
      const state = defaultState()
      const reward = {title: 'new reward title', description: 'new reward description'}
      const action = { type: CONSTANTS.Rewards.NEW_REWARD, reward }
      const nextState = reducer(state, action)

      expect(nextState.rewards[0].title).to.equal(reward.title)
      expect(nextState.rewards[0].description).to.equal(reward.description)
    })

    it('can change reward content', () => {
      const state = defaultState()
      const reward = {title: 'new reward title', description: 'new reward description'}
      const rewardIndex = 0
      const newReward =  {title: 'changed reward title', description: 'changed reward description'}
      const actions = [
        { type: CONSTANTS.Rewards.NEW_REWARD, reward },
        { type: CONSTANTS.Rewards.REWARD_CHANGED, reward: newReward, rewardIndex }
      ]
      const nextState = actions.reduce(reducer, state)

      expect(nextState.rewards[0]).to.deep.equal(newReward)
    })

    it('can move reward', () => {
      const state = defaultState()
      const reward1 = {title: 'first reward title', description: 'first reward description'}
      const reward2 = {title: 'second reward title', description: 'second reward description'}
      const actions = [
        { type: CONSTANTS.Rewards.NEW_REWARD, reward: reward1 },
        { type: CONSTANTS.Rewards.NEW_REWARD, reward: reward2},
        { type: CONSTANTS.Rewards.REWARD_MOVED, preIndex: 1, postIndex: 0 }
      ]
      const nextState = actions.reduce(reducer, state)

      expect(nextState.rewards[0]).to.deep.equal(reward2)
      expect(nextState.rewards[1]).to.deep.equal(reward1)
    })

    it('can delete reward', () => {
      const state = defaultState()
      const reward1 = {title: 'first reward title', description: 'first reward description'}
      const reward2 = {title: 'second reward title', description: 'second reward description'}
      const actions = [
        { type: CONSTANTS.Rewards.NEW_REWARD, reward: reward1 },
        { type: CONSTANTS.Rewards.NEW_REWARD, reward: reward2},
        { type: CONSTANTS.Rewards.REWARD_DELETED, rewardIndex: 0 }
      ]
      const nextState = actions.reduce(reducer, state)

      expect(nextState.rewards.length).to.equal(1)
      expect(nextState.rewards[0]).to.deep.equal(reward2)
    })
  })

  describe('post', () => {

    describe('heading', () => {
      it('iconSrc can be updated', () => {
        const state = defaultState()
        const iconSrc = 'test icon src'
        const action = { type: CONSTANTS.Post.Heading.ICONSRC_UPDATED, iconSrc }
        const nextState = reducer(state, action)

        expect(nextState.post.heading.iconSrc).to.equal(iconSrc)
      })

      it('description caan be updated', () => {
        const state = defaultState()
        const description = 'test description'
        const action = { type: CONSTANTS.Post.Heading.DESCRIPTION_UPDATED, description }
        const nextState = reducer(state, action)

        expect(nextState.post.heading.description).to.equal(description)
      })
    })

  })

})