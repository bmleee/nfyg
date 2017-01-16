import QnAModel from '../models/qna'
import PostModel from '../models/post'

export async function createQnA({project, product, title, text, user}) {
  let body = {
    author: {
      name: user.display_name,
      iconSrc: user.image,
      user: user._id,
    },
    abstract: {
      title,
      likes: [],
    },
    text,
    comments: [],
  }

  if (project) body.project = project
  else if (product) body.product = product
  else throw new Error(`can't create qna. one of project or product must be specified`)

  return await QnAModel.create(body)
}

// DEPRECIATED. refer QnAModel.methods.commentedByUser
export async function createCommentOnQnA({_id, text, user}) {
  let body = {
    author: {
      name: user.display_name,
      iconSrc: user.image,
      user: user._id,
    },
    text,
    likes: [],
  }

  return await QnAModel.update(
    { _id: _id },
    { $addToSet: { comments: body } }
  )
}

// DEPRECIATED. refer PostModel.methods.commentedByUser
export async function createPost({project, product, user, title, content, thresholdMoney, isDirectSupport}) {
  let body = {
    author: {
      name: user.display_name,
      iconSrc: user.image,
      user: user._id,
    },
    project: project,
    product: product,
    abstract: {
      isDirectSupport,
      title,
      thresholdMoney,
      likes: [],
    },
    content,
    comments: [],
  }

  return await PostModel.create(body)
}

export async function createCommentOnPost({_id, text, user}) {
  let body = {
    author: {
      name: user.display_name,
      iconSrc: user.image,
      user: user._id,
    },
    text,
    likes: [],
  }

  return await PostModel.update(
    { _id: _id },
    { $addToSet: { comments: body } }
  )
}
