import React from 'react';
import './FilterOption.css';
import filterIcon from '../../assets/images/filter-icon.png';

const FilterOption = ({
	FilterAscDecOrder,
	FilterLessThanOneMonth,
	FilterMoreThanOneMonth,
}) => {
	return (
		<div className="filter-container">
			<button onClick={() => FilterAscDecOrder()} className="filter">
				<img src={filterIcon} /> Filters
			</button>

			<button onClick={() => FilterLessThanOneMonth()} className="filter">
				Less than 1 Month Old
			</button>

			<button onClick={() => FilterMoreThanOneMonth()} className="filter">
				More than 1 Month Old
			</button>
		</div>
	);
};

export default FilterOption;
