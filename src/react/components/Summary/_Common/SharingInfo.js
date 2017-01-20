import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const linkFormatter = (cell, row) => {
	return <Link to={`/users/${row.id}`}>{cell}</Link>;
}
const detailFormatter = (cell, row) => {
	return <Link to={`/users/${row.id}/summary`}><button className='btn btn-info'>Detail</button></Link>;
}

export default class SharingInfo extends Component {
  render() {
    const {
      sharingInfo: {
        comments,
        likes,
        shares,
        num_posts,
        num_users,
        money_by_sharing,
        users,
      },
      isAdmin,
    } = this.props

    let users_info = users.map(({
      comments,
      likes,
      shares,
      name, // name from facebook
      user: {
        display_name,
        // name, // TODO: Get name from Web Server DB
        id,
        local_email,
        fb_email,
      }
    }) => ({ comments, likes, shares, name, display_name, id, local_email, fb_email}))

    console.log(users_info);

    return (
      <div className="sharing-info-container">
        <div className="sharing-info-overview">
          <h4>공유후원 명단</h4>
          {/* <span>댓글: {comments}</span>
              <span>좋아요: {likes}</span>
              <span>공유: {shares}</span>
              <span>총 유저: {num_users}</span>
              <span>총 공유 글: {num_posts}</span>
              <span>총 모금액: {money_by_sharing}</span> */}
        </div>
        <div className="charing-info-users-wrapper">
          <BootstrapTable data={users_info} exportCSV={true}
              search
              columnFilter
              hover
              pagination >
              <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="id" isKey>id</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="name" >본명</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="display_name" dataAlign="center">닉네임</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="local_email" >로컬 이메일</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="fb_email" >페이스북 이메일</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="likes" >좋아요</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="shares" >공유</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="comments" >댓글</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="created_at" >생성일</TableHeaderColumn>
              <TableHeaderColumn width='100' dataField="detail" dataFormat={detailFormatter} export={false} >Detail</TableHeaderColumn>
            </BootstrapTable>
        </div>
      </div>
    )
  }
}
