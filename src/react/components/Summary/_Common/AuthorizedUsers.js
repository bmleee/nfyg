import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default class AuthorizedUsers extends Component {
  render() {
    const {
      authorizedUsers = null,
      isAdmin = false
    } = this.props
    
    console.log(this)

    return (
      <div>
        { authorizedUsers && this._renderAuthorizedUsers() }
        <div className="authorized-user-button-container">
        {
          authorizedUsers && isAdmin && (
          <button className="authorized-user-button" onClick={this.addNewAuthorizedUser}>관리자 추가하기</button>
          )
        }
        </div>
      </div>
    )
  }

  _renderAuthorizedUsers = () => {
    const {
      authorizedUsers = [],
      isAdmin = false
    } = this.props
    
    const deleteFormatter = (cell, row) => {
    	return <button className='btn btn-info' disabled={!isAdmin} >Delete</button>
    }
  
    const linkFormatter = (cell, row) => {
    	return <Link to={`/users/${row.id || ''}`}>{cell || ''}</Link>;
    }
  
    const detailFormatter = (cell, row) => {
    	return <Link to={`/users/${row.id || ''}/summary`}><button className='btn btn-info'>Detail</button></Link>;
    }

    return (
      <div className="authorized-user-container">
        {
          authorizedUsers && (
            <BootstrapTable data={authorizedUsers} exportCSV={true}
              search
              columnFilter
              hover
              pagination 
            >
              <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="id" isKey>id</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="name" >본명</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="display_name" dataAlign="center">닉네임</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="local_email" >로컬 이메일</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="fb_email" >페이스북 이메일</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="created_at" >생성일</TableHeaderColumn>
              <TableHeaderColumn width='100' dataField="detail" dataFormat={detailFormatter} export={false} >Detail</TableHeaderColumn>
              <TableHeaderColumn width='100' dataField="edit" dataFormat={deleteFormatter} export={false} >Delete</TableHeaderColumn>
            </BootstrapTable>
          )
        }
      </div>
    )
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
