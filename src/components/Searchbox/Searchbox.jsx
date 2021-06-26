import React from 'react';
import './Searchbox.css';

const Searchbox = ({ searchFieldUpdate, searchField }) => {
	return (
		<div className="searchbox">
			<input
				onChange={(e) => searchFieldUpdate(e)}
				className="searchbox-input"
				type="text"
				placeholder="Search pets"
				value={searchField}
			/>
		</div>
	);
};

export default Searchbox;
