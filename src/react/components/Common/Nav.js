import React, { Component, PropTypes } from 'react';

import Headermenufixed from './Headers/Headermenufixed'
import Headermenuabsolute from './Headers/Headermenuabsolute'
import Headermenumobile from './Headers/Headermenumobile'

import { canUseDOM } from '~/src/lib/utils'

const Nav = () => {
	
	if (canUseDOM )
	 return (
	 	<div className="nav">
			{
				document.URL.match(/(sponsor)|(purchase)|(editor)|(magazine)|(exhibition)|(login)|(signup)|(me)|(profile)|(edit)/) 
					? <Headermenuabsolute/>
					: <Headermenufixed/>
			}
			<Headermenumobile/>
		</div>
		)
	else return <div/>
};

export default Nav;
