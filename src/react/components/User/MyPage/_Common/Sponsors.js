import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const editFormatter = (cell, row) => {
	return <Link to={`/sponsors/${row.sponsorName}/edit`}><button className='btn btn-info'>Edit</button></Link>;
}

// TODO: correct detail link
const linkFormatter = (cell, row) => {
	return <Link to={`/sponsors/${row.sponsorName}`}>{cell}</Link>;
}

// TODO: correct link url
const detailFormatter = (cell, row) => {
	return <Link to={`/project-editor?id=${row.id}`}><button className='btn btn-info'>Detail</button></Link>;
}

export default class Sponsors extends Component {
  render() {
    const {
      sponsors // raw project model
    } = this.props

    return (
      <div>
        {
          !!sponsors
            ? <BootstrapTable data={sponsors} exportCSV={true}
                search
                columnFilter
                hover
                pagination >
                <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="sponsorName" isKey>영문이름</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="displayName" >Display Name</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="money" dataAlign="center">후원액</TableHeaderColumn>
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
