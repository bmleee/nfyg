import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const editFormatter = (cell, row) => {
	return <Link to={`/projects/${row.productName}/edit`}><button className='btn btn-info'>Edit</button></Link>;
}
const linkFormatter = (cell, row) => {
	return <Link to={`/products/${row.productName}`}>{cell}</Link>;
}
const detailFormatter = (cell, row) => {
	return <Link to={`/products/${row.productName}/summary`}><button className='btn btn-info'>Detail</button></Link>;
}

export default class Products extends Component {
  render() {
    const {
      products // raw project model
    } = this.props

    return (
      <div>
        {
          !!products
            ? <BootstrapTable data={products} exportCSV={true}
                search
                columnFilter
                hover
                pagination >
                <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="_id" isKey hidden>id</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="productName" >Project Name</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="state" dataAlign="center">상태</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="longTitle" >긴 제목</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="dateFrom" >시작일</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="dateTo" >종료일</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="minPurchaseVolume" >최소 구매 수량</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="maxPurchaseVolume" >최대 구매 수량</TableHeaderColumn>
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
