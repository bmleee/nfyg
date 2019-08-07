import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

import Masonry from 'react-masonry-component';

class MagazineDetailArtworkContents extends Component {
	render() {
		let { artworks } = this.props;

		let contents = artworks && artworks.map( ({id, artist, imgSrc, title, year, price }, index) => (
					<div className="magazine-detail-artwork-content-container">
						<img className="magazine-detail-artwork-img" src={imgSrc}/>
						<div className="magazine-detail-artwork-artist">{artist}</div>
						<div className="magazine-detail-artwork-title">{title}, {year}</div>
						<div className="magazine-detail-artwork-price">{price}</div>
					</div>
		))
		
		// console.log('contents', contents)

		return (
			<div className="magazine-detail-artwork-contents-list">
				{ contents.length > 0 ?
					<Masonry className={'magazine-detail-artwork-masonry'}
		                disableImagesLoaded={false}
		                >
		             {contents}
		             </Masonry>
				: null }
			</div>
		)
	}
}

export default MagazineDetailArtworkContents;
