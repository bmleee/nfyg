import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const editFormatter = (cell, row) => {
	return <Link to={`/store/${row.storeLink}/edit`}><button className='btn btn-info'>수 정</button></Link>;
}
const linkFormatter = (cell, row) => {
	return <Link to={`/store/${row.storeLink}`}>{cell}</Link>;
}
const detailFormatter = (cell, row) => {
	return <Link to={`/store/${row.storeLink}/summary`}><button className='btn btn-info'>판매내역</button></Link>;
}

export default class Products extends Component {
  render() {
    const {
      stores // raw project model
    } = this.props
    
    const storenotnull = stores.filter(function(val) { return val !== null; })

    return (
      <div>
        {
          !!storenotnull
            ? <BootstrapTable data={storenotnull} exportCSV={true}
                search
                columnFilter
                hover
                pagination >
                <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="storeLink" isKey dataAlign="center">링 크</TableHeaderColumn>
                <TableHeaderColumn width='100' dataSort={true} dataFormat={linkFormatter} dataField="state" dataAlign="center">상 태</TableHeaderColumn>
                <TableHeaderColumn width='200' dataSort={true} dataFormat={linkFormatter} dataField="title" dataAlign="center">상점명</TableHeaderColumn>
                <TableHeaderColumn width='80' dataField="detail" dataFormat={detailFormatter} export={false} dataAlign="center">판매내역</TableHeaderColumn>
                <TableHeaderColumn width='80' dataField="edit" dataFormat={editFormatter} export={false} dataAlign="center">수 정</TableHeaderColumn>
              </BootstrapTable>
            : 'Loading...'
        }
      </div>
    )
  }
}
