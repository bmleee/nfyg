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
				document.URL.match(/products\/.+\/summary/) || document.URL.match(/projects\/.+\/summary/) || document.URL.match(/products\/.+\/purchase/) || document.URL.match(/projects\/.+\/purchase/) || document.URL.match(/products\/.+\/edit/) || document.URL.match(/projects\/.+\/edit/)
				?	<Headermenuabsolute/>
				:	document.URL.match(/kr\/\products/) || document.URL.match(/kr\/\projects/) || document.URL == 'https://netflix-salon.co.kr/' ||  document.URL == 'https://netflix-salon.co.kr/#_=_' || document.URL == 'https://netflix-salon.co.kr/product-editor/preview'
				?	<Headermenufixed/>
				:	<Headermenuabsolute/>
			}
			<Headermenumobile/>
		</div>
		)
	else return <div/>
};

export default Nav;
