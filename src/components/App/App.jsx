import React, { useState, useEffect } from 'react';
import './App.css';

import Header from '../Header/Header';
import Searchbox from '../Searchbox/Searchbox';
import FilterOption from '../FilterOption/FilterOption';
import Card from '../Card/Card';

const App = () => {
	const [searchField, setSearchField] = useState('dog');
	const [pets, setPets] = useState([]);
	let order = 'asc';

	useEffect(() => {
		requestSearchedPets();
	}, [searchField]);

	// Search pets according to searchbox
	const requestSearchedPets = () => {
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?name=${searchField}&orderBy=${order}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPets(data);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Update pets list for new search
	const searchFieldUpdate = (e) => {
		e.preventDefault();
		setSearchField(e.target.value);
	};

	// Filter data in ascending/descending order
	const FilterAscDecOrder = () => {
		// order = order === 'acs' ? 'desc' : 'asc';
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1//animals?name=${searchField}&sortBy=createdAt&orderBy=${order}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPets(data);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="app">
			{/* Header */}
			<Header />

			{/* Searchbar */}
			<Searchbox
				searchFieldUpdate={searchFieldUpdate}
				searchField={searchField}
			/>

			{/* FilterOption */}
			<FilterOption FilterAscDecOrder={FilterAscDecOrder} />

			{/* Card */}
			<Card pets={pets} />
		</div>
	);
};

export default App;
