import React from 'react'

export default function (comments) {
  return (
    <div>
      {
        comments.map(({
          author: {
            name
          },
          likes, // TODO: activate!
          text,
        }, index) => (
          <div key={index}>
            <span>작성자: {name}</span>
            <span>내용: {text}</span>
          </div>
        ))
      }
    </div>
  )
}
