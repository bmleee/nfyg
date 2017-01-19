import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

// TODO: correct editor url
const editFormatter = (cell, row) => {
	return <Link to={`/projects/${row.projectName}/edit`}><button className='btn btn-info'>Edit</button></Link>;
}

// TODO: correct detail link
const linkFormatter = (cell, row) => {
	return <Link to={`/products/${row.productName}`}>{cell}</Link>;
}

// TODO: correct link url
const detailFormatter = (cell, row) => {
	return <Link to={`/project-editor?id=${row.id}`}><button className='btn btn-info'>Detail</button></Link>;
}

export default class Users extends Component {
  render() {
    const {
      users // raw project model
    } = this.props

    return (
      <div>
        {
          !!users
            ? <BootstrapTable data={users} exportCSV={true}
                search
                columnFilter
                hover
                pagination >
                <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="id" isKey>id</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="name" >본명</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="display_name" dataAlign="center">닉네임</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="local_email" >로컬 이메일</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="fb_email" >페이스북 이메일</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="created_at" >생성일</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField="detail" dataFormat={detailFormatter} export={false} >Detail</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField="edit" dataFormat={editFormatter} export={false} >Edit</TableHeaderColumn>
              </BootstrapTable>
            : 'Loading...'
        }
      </div>
    )
  }
}
