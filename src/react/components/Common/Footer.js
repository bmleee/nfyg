import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Mainfooter from './Footer/Mainfooter'
import Subfooter from './Footer/Subfooter'
import Mobilefooter from './Footer/Mobilefooter'
import Mobilefootersub from './Footer/Mobilefootersub'

import { canUseDOM } from '~/src/lib/utils'

const Footer = () => {
	
	if (canUseDOM )
	return (
	 	<div className="footer">
			{
				document.URL.match(/(purchase)|(summary)/)
				?  <Mainfooter/>
				:
					document.URL.match(/(projects)|(products)|(sticker)|(blind-poster)/) 
					? <Subfooter/>
					: <Mainfooter/>
			}
			{
				document.URL.match(/(purchase)|(summary)/)
				?  <Mobilefooter/>
				:
					document.URL.match(/(projects)|(products)|(sticker)|(blind-poster)/) 
					? <Mobilefootersub/>
					: <Mobilefooter/>
			}
		</div>
		)
	else return <div/>
};

export default Footer;
