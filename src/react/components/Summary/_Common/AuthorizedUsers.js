import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default class AuthorizedUsers extends Component {
  render() {
    const {
      authorizedUsers,
      isAdmin
    } = this.props

    return (
      <div>
        { authorizedUsers && this._renderAuthorizedUsers() }
        {
          isAdmin && (
            <button onClick={this.addNewAuthorizedUser}>New</button>
          )
        }
      </div>
    )
  }

  _renderAuthorizedUsers() {
    const {
      authorizedUsers,
      isAdmin
    } = this.props

    return (
      <div className="authorized-user-container">
        <BootstrapTable data={authorizedUsers} exportCSV={true}
            search
            columnFilter
            hover
            pagination >
            <TableHeaderColumn width='50' dataSort={true} dataFormat={this.linkFormatter} dataField="id" isKey>id</TableHeaderColumn>
            <TableHeaderColumn width='150' dataSort={true} dataFormat={this.linkFormatter} dataField="name" >본명</TableHeaderColumn>
            <TableHeaderColumn width='150' dataSort={true} dataFormat={this.linkFormatter} dataField="display_name" dataAlign="center">닉네임</TableHeaderColumn>
            <TableHeaderColumn width='150' dataSort={true} dataFormat={this.linkFormatter} dataField="local_email" >로컬 이메일</TableHeaderColumn>
            <TableHeaderColumn width='150' dataSort={true} dataFormat={this.linkFormatter} dataField="fb_email" >페이스북 이메일</TableHeaderColumn>
            <TableHeaderColumn width='150' dataSort={true} dataFormat={this.linkFormatter} dataField="created_at" >생성일</TableHeaderColumn>
            <TableHeaderColumn width='100' dataField="detail" dataFormat={this.detailFormatter} export={false} >Detail</TableHeaderColumn>
            { isAdmin && <TableHeaderColumn width='100' dataField="edit" dataFormat={this.deleteFormatter} export={false} >Delete</TableHeaderColumn> }
          </BootstrapTable>
      </div>
    )
  }

  deleteFormatter = (cell, row) => {
  	return <button className='btn btn-info' onClick={this.deleteAuthorizedUser(row.id)}>Delete</button>
  }

  linkFormatter = (cell, row) => {
  	return <Link to={`/users/${row.id}`}>{cell}</Link>;
  }

  detailFormatter = (cell, row) => {
  	return <Link to={`/users/${row.id}/summary`}><button className='btn btn-info'>Detail</button></Link>;
  }

  // TODO:
  async addNewAuthorizedUser() {

  }

  // TODO:
  deleteAuthorizedUser(user_id) {
    return async () => {

    }
  }



}
