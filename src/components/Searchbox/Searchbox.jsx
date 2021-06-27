import React from 'react';
import './Searchbox.css';

const Searchbox = ({ searchTextUpdate, searchText }) => {
	return (
		<div className="searchbox icon-input">
			<input
				onChange={(e) => searchTextUpdate(e)}
				className="searchbox-input"
				type="text"
				placeholder="Search pets"
				value={searchText}
			/>
			<i className="fa fa-search search-icon" />
		</div>
	);
};

export default Searchbox;
