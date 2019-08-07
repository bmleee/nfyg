import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const editFormatter = (cell, row) => {
	return <Link to={`/products/${row.productName}/edit`}><button className='btn btn-info'>수 정</button></Link>;
}
const linkFormatter = (cell, row) => {
	return <Link to={`/products/${row.productName}`}>{cell}</Link>;
}
const detailFormatter = (cell, row) => {
	return <Link to={`/products/${row.productName}/summary`}><button className='btn btn-info'>내 역</button></Link>;
}

export default class Products extends Component {
  render() {
    const {
      products // raw project model
    } = this.props
    
    const productnotnull = products.filter(function(val) { return val !== null; })

    return (
      <div>
        {
          !!productnotnull
            ? <BootstrapTable data={productnotnull} exportCSV={true}
                search
                columnFilter
                hover
                pagination >
                <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="productName" isKey dataAlign="center">링 크</TableHeaderColumn>
                <TableHeaderColumn width='100' dataSort={true} dataFormat={linkFormatter} dataField="state" dataAlign="center">상 태</TableHeaderColumn>
                <TableHeaderColumn width='200' dataSort={true} dataFormat={linkFormatter} dataField="longTitle" dataAlign="center">제 목</TableHeaderColumn>
                <TableHeaderColumn width='100' dataSort={true} dataFormat={linkFormatter} dataField="dateFrom" dataAlign="center">시작일</TableHeaderColumn>
                <TableHeaderColumn width='100' dataSort={true} dataFormat={linkFormatter} dataField="dateTo" dataAlign="center">종료일</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="currentMoney_sub" >모금액</TableHeaderColumn>
                <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="numValidPurchases_sub" >후원자수</TableHeaderColumn>
                <TableHeaderColumn width='100' dataSort={true} dataFormat={linkFormatter} dataField="created_at" dataAlign="center">생성일</TableHeaderColumn>
                <TableHeaderColumn width='80' dataField="detail" dataFormat={detailFormatter} export={false} dataAlign="center">내 역</TableHeaderColumn>
                <TableHeaderColumn width='80' dataField="edit" dataFormat={editFormatter} export={false} dataAlign="center">수 정</TableHeaderColumn>
              </BootstrapTable>
            : 'Loading...'
        }
      </div>
    )
  }
}
