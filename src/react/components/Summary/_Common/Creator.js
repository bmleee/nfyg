import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default class Creator extends Component {
  render() {
    const {
      creator: {
        creatorDescription,
        creatorImgSrc,
        creatorLocation,
        creatorName
      },
    } = this.props

    return (
      <div>
        <img src={creatorImgSrc} alt=""/>
        <span>창작자 이름: {creatorName}</span>
        <span>창작자 설명: {creatorDescription}</span>
      </div>
    )
  }

}
