import React from 'react';
import './Searchbox.css';

const Searchbox = ({ searchTextUpdate, searchText }) => {
	return (
		<div className="searchbox">
			<input
				onChange={(e) => searchTextUpdate(e)}
				className="searchbox-input"
				type="text"
				placeholder="Search pets"
				value={searchText}
			/>
		</div>
	);
};

export default Searchbox;
