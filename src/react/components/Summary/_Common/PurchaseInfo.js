import React, { Component } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import renderStat from './lib/renderStat'

const userLinkFormatter = (cell, row) => {
	return <Link to={`/users/${row.user_id}`}>{cell}</Link>;
}
// TODO:
const linkFormatter = (cell, row) => {
	return <Link to={`/users/${row.id}`}>{cell}</Link>;
}
const detailFormatter = (cell, row) => {
	return <Link to={`/users/${row.id}`}>{cell}</Link>;
}

export default class PurchaseInfo extends Component {
  render() {
    const {
      purchaseInfo: {
				stat,
				purchases,
			},
      isAdmin,
    } = this.props

		let purchase_info = purchases.map(({
			_id,
			purchaseAmount,
			shippingFee,
			address: {
				addressee_name,
				address1,
				address2,
				zipcode,
			},
			purchase_info: {
				amount,
				customer_uid,
				merchant_uid,
				schedule_at,
			},
			reward: {
				title,
				thresholdMoney,
			},
			user: {
				display_name,
				name,
				id,
			},
		}) => ({
			_id,
			addressee_name,
			address: `${address1} ${address2} ${zipcode}`,
			purchaseAmount,
			shippingFee,
			title,
			thresholdMoney,
			name,
			display_name,
			user_id: id,
			amount,
		}))

    return (
      <div className="purchase-info-wrapper">
        <div className="purchase-info-overview">
					{ renderStat(stat) }
        </div>
        <div className="purchase-info-container">
          <BootstrapTable data={purchase_info} exportCSV={true}
              search
              columnFilter
              hover
              pagination >
              <TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="_id" isKey hidden>_id</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="title" >물품 명</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="name" >본명</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={userLinkFormatter} dataField="display_name" dataAlign="center">닉네임</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="addressee_name" >수취인 명</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="address" >주소</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="purchaseAmount" >주문 수량</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="thresholdMoney" >단가</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="shippingFee" >배송료</TableHeaderColumn>
              <TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="amount" >총 금액</TableHeaderColumn>
            </BootstrapTable>
        </div>
      </div>
    )
  }
}