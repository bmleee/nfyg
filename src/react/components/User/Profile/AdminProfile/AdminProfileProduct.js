import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// TODO: correct link url
const editFormatter = (cell, row) => {
	// console.log('row', row);
	return <Link to={`/project-editor?id=${row.id}`}><button className='btn btn-info'>Edit</button></Link>;
}

// TODO: correct link url
const detailFormatter = (cell, row) => {
	// console.log('row', row);
	return <Link to={`/project-editor?id=${row.id}`}><button className='btn btn-info'>Detail</button></Link>;
}

const linkFormatter = (cell, row) => {
	return <Link to={`/products/${row.productName}`}>{cell}</Link>;
}

const AdminProfileProduct = ({ profile }) => {
	const { product } = profile

	return (
		<div className="admin-profile-main-container">
			Admin Profile Product

			{/* // TODO: New button */}
			{/* // TODO: Export CSV with not broken encoding */}
			{
				!!product && !!product.list
					? <BootstrapTable data={product.list} exportCSV={true}
							search
							columnFilter
							hover
							pagination >
							<TableHeaderColumn width='50' dataSort={true} dataFormat={linkFormatter} dataField="id" isKey hidden>id</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="productName" >Project Name</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="state" dataAlign="center">Product State</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="longTitle" >Long Title</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="dateFrom" >Date From</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="dateTo" >Date To</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="currentMoney" >Current Money</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="targetMoney" >Target Money</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="numSupporters" >Num Supporters</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="numBuyers" >Num Buyers</TableHeaderColumn>
							<TableHeaderColumn width='150' dataSort={true} dataFormat={linkFormatter} dataField="numSharers" >Num Sharers</TableHeaderColumn>
							<TableHeaderColumn width='100' dataField="detail" dataFormat={detailFormatter} export={false} >Detail</TableHeaderColumn>
							<TableHeaderColumn width='100' dataField="edit" dataFormat={editFormatter} export={false} >Edit</TableHeaderColumn>
						</BootstrapTable>
					: 'table is loading...'
			}
		</div>
	)
}

export default AdminProfileProduct
