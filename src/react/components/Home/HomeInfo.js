import React, { Component, PropTypes } from 'react';

const HomeInfo = ({ title, amount }) => (
	<div>
		<h3>{ title }</h3>
		<h3>{ amount }</h3>
	</div>
)

export default HomeInfo;
