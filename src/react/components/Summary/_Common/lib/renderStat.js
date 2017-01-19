import React from 'react'

export default function (stat) {

  let arr = []

  for (let k of Object.keys(stat)) {
    arr.push((
      <span>{k}: {stat[k]}</span>
    ))
  }

  return (
    <div>
      <h2>판매 현황</h2>
      {
        // Object.keys(stat).map((k, index) => {
        //   <span key={index}>{k}: {stat[k]}</span>
        // })
        arr
      }
    </div>
  )
}
