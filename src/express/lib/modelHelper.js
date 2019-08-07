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
      created_at: Date.now(),
    },
    text,
    comments: [],
  }

  if (project) body.project = project
  else if (product) body.product = product
  else throw new Error(`can't create qna. one of project or product must be specified`)

  return await QnAModel.create(body)
}

export async function createContactQnA({title, text, user}) {
  let body = {
    author: {
      name: user.display_name,
      iconSrc: user.image,
      user: user._id,
    },
    abstract: {
      title,
      likes: [],
      created_at: Date.now(),
    },
    text,
    comments: [],
    user,
    user_info: user,
  }
  
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
    created_at: Date.now(),
  }

  return await QnAModel.update(
    { _id: _id },
    { $addToSet: { comments: body } }
  )
}

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
      created_at: Date.now(),
    },
    content,
    comments: [],
  }

  return await PostModel.create(body)
}

// DEPRECIATED. refer PostModel.methods.commentedByUser
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
