import React, { useState, useEffect } from 'react';
import './App.css';

import Header from '../Header/Header';
import Searchbox from '../Searchbox/Searchbox';
import FilterOption from '../FilterOption/FilterOption';
import Card from '../Card/Card';

const App = () => {
	const [searchText, setSearchText] = useState('dog');
	const [pets, setPets] = useState([]);
	const [sortOrder, setSortOrder] = useState('asc');

	useEffect(() => {
		// Initial render
		if (searchText && !pets) {
			requestSearchedPets();
		} else {
			// Delay search to avoid multiple api calls
			const timeOutId = setTimeout(() => {
				if (searchText) {
					requestSearchedPets();
				}
			}, 500);

			return () => {
				clearTimeout(timeOutId);
			};
		}
	}, [searchText]);

	// Search pets according to searchbox
	const requestSearchedPets = () => {
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?name=${searchText}&sortBy=createdAt&order=${sortOrder}`
		)
			.then((response) => response.json())
			.then((data) => {
				data.forEach((pet) => {
					let dateString = pet.bornAt.split('T')[0];
					let ageInMilliseconds = new Date() - new Date(dateString);
					pet.age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 12);
					console.log(pet.age);
				});
				// Set updated age of pets
				setPets(data);
				// console.log(data);
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
		if (sortOrder === 'asc') {
			setSortOrder('desc');
		} else {
			setSortOrder('asc');
		}

		requestSearchedPets();
	};

	const FilterLessThanOneMonth = () => {
		let filteredPets = pets.filter((pet) => pet.age <= 1);
		setPets(filteredPets);
	};

	const FilterMoreThanOneMonth = () => {
		let filteredPets = pets.filter((pet) => pet.age > 1);
		setPets(filteredPets);
	};

	return (
		<div className="app">
			{/* Header */}
			<Header />

			{/* Searchbar */}
			<Searchbox searchTextUpdate={searchTextUpdate} searchText={searchText} />

			{/* FilterOption */}
			<FilterOption
				FilterAscDecOrder={FilterAscDecOrder}
				FilterLessThanOneMonth={FilterLessThanOneMonth}
				FilterMoreThanOneMonth={FilterMoreThanOneMonth}
			/>

			{/* Card */}
			<Card pets={pets} />
		</div>
	);
};

export default App;
