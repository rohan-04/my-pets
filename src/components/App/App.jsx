import React, { useState, useEffect } from 'react';
import './App.css';

import Header from '../Header/Header';
import Searchbox from '../Searchbox/Searchbox';
import FilterOption from '../FilterOption/FilterOption';
import Card from '../Card/Card';

const App = () => {
	const [searchText, setSearchText] = useState('dog');
	const [pets, setPets] = useState([]);
	let order = 'asc';

	useEffect(() => {
		// Initial render
		if (searchText && !pets) {
			requestSearchedPets();
		} else {
			// Delay search to avoid multiple api calls
			const timeOutId = setTimeout(() => {
				requestSearchedPets();
			}, 500);

			return () => {
				clearTimeout(timeOutId);
			};
		}
	}, [searchText]);

	// Search pets according to searchbox
	const requestSearchedPets = () => {
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?name=${searchText}&orderBy=${order}`
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
	const searchTextUpdate = (e) => {
		e.preventDefault();
		setSearchText(e.target.value);
	};

	// Filter data in ascending/descending order
	const FilterAscDecOrder = () => {
		// order = order === 'acs' ? 'desc' : 'asc';
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1//animals?name=${searchText}&sortBy=createdAt&orderBy=${order}`
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
			<Searchbox searchTextUpdate={searchTextUpdate} searchText={searchText} />

			{/* FilterOption */}
			<FilterOption FilterAscDecOrder={FilterAscDecOrder} />

			{/* Card */}
			<Card pets={pets} />
		</div>
	);
};

export default App;
