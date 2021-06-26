import React, { useState, useEffect } from 'react';
import './App.css';

import Header from '../Header/Header';
import Searchbox from '../Searchbox/Searchbox';

const App = () => {
	const [searchField, setSearchField] = useState('dog');
	const [pets, setPets] = useState([]);

	useEffect(() => {
		requestPets();
	}, []);

	const requestPets = () => {
		fetch('https://60d075407de0b20017108b89.mockapi.io/api/v1/animals')
			.then((response) => response.json())
			.then((data) => {
				setPets(data);
				console.log(data);
			});
	};

	const requestSearchedPets = () => {
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?search=${searchField}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPets(data);
				console.log(data);
			});
	};

	const searchFieldUpdate = (e) => {
		e.preventDefault();
		setSearchField(e.target.value);
		requestSearchedPets();
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
		</div>
	);
};

export default App;
