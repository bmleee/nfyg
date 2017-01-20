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
      <h4>구매자 명단</h4>
      {/*
        // Object.keys(stat).map((k, index) => {
        //   <span key={index}>{k}: {stat[k]}</span>
        // })
        arr
      */}
    </div>
  )
}
