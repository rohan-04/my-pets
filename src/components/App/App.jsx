import React, { useState, useEffect } from 'react';
import './App.css';

import Header from '../Header/Header';
import Searchbox from '../Searchbox/Searchbox';
import Card from '../Card/Card';

const App = () => {
	const [searchField, setSearchField] = useState('dog');
	const [pets, setPets] = useState([]);

	useEffect(() => {
		requestSearchedPets();
	}, [searchField]);

	// Search pets according to searchbox
	const requestSearchedPets = () => {
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?name=${searchField}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPets(data);
				console.log(data);
			});
	};

	// Update pets list for new search
	const searchFieldUpdate = (e) => {
		e.preventDefault();
		setSearchField(e.target.value);
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

			{/* Card */}
			<Card pets={pets} />
		</div>
	);
};

export default App;
