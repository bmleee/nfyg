import QnAModel from '../models/qna'

export async function createQnA({project, product, title, text, user}) {
  let body = {
    author: {
      name: user.nick_name,
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

export async function createCommentOnQnA({_id, text, user}) {
  let body = {
    author: {
      name: user.nick_name,
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
