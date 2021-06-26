import React from 'react';
import './FilterOption.css';

const FilterOption = ({ FilterAscDecOrder }) => {
	return (
		<div className="filter-container">
			<button onClick={() => FilterAscDecOrder()} className="filter chip">
				Filters
			</button>

			<button className="chip">Less than 1 Month Old</button>

			<button className="chip">More than 1 Month Old</button>
		</div>
	);
};

export default FilterOption;
