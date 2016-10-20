import React, { Component, PropTypes } from 'react';

const style = {
	border: 'solid 1px gray',
	width: '100%',
}

const HomeHeading = ({ title, }) => (
	<div className="home-heading">
		<h4>{ title }</h4>
		<div className="home-heading-seperator"
		 	style={style} />
	</div>

)

export default HomeHeading;
