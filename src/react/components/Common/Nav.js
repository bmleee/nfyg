import React, { Component, PropTypes } from 'react';

import Headermenufixed from './Headers/Headermenufixed'
import Headermenuabsolute from './Headers/Headermenuabsolute'
import Headermenumobile from './Headers/Headermenumobile'
import Favicon from 'react-favicon'

import { canUseDOM } from '~/src/lib/utils'

const Nav = () => {
	
	if (canUseDOM )
	 return (
	 	<div className="nav">
	 	<Favicon url="/assets/images/7pictures_favicon_black.png"/>
			{
				document.URL.match(/(search)|(privacy)|(termofuse)|(faq)|(about)|(sponsors)|(purchase)|(editor)|(magazine)|(exhibition)|(login)|(signup)|(me)|(profile)|(edit)|(summary)|(user)/) 
					? <Headermenuabsolute/>
					: <Headermenufixed/>
			}
			<Headermenumobile/>
		</div>
		)
	else return <div/>
};

export default Nav;
