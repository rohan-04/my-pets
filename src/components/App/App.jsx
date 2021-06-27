import React, { useState, useEffect } from 'react';
import './App.css';

import Header from '../Header/Header';
import Searchbox from '../Searchbox/Searchbox';
import FilterOption from '../FilterOption/FilterOption';
import Card from '../Card/Card';

const App = () => {
	const [searchText, setSearchText] = useState('');
	const [pets, setPets] = useState([]);
	const [filteredPets, setFilteredPets] = useState([]);
	const [sortOrder, setSortOrder] = useState('asc');

	useEffect(() => {
		// Initial render
		if (!searchText) {
			requestSearchedPets('dog');
		} else {
			// Delay search to avoid multiple api calls
			const timeOutId = setTimeout(() => {
				if (searchText) {
					requestSearchedPets(searchText);
				}
			}, 500);

			return () => {
				clearTimeout(timeOutId);
			};
		}
	}, [searchText]);

	// Search pets according to searchbox
	const requestSearchedPets = (searchterm) => {
		fetch(
			`https://60d075407de0b20017108b89.mockapi.io/api/v1/animals?name=${searchterm}&sortBy=name&order=${sortOrder}`
		)
			.then((response) => response.json())
			.then((data) => {
				data.forEach((pet) => {
					// Coverting date to age
					let dateString = pet.bornAt.split('T')[0];
					let ageInMilliseconds = new Date() - new Date(dateString);
					pet.age = Math.floor((ageInMilliseconds / 31536000000) * 12);
					// console.log(pet.bornAt);
				});
				// Set updated age of pets
				setPets(data);
				setFilteredPets(data);
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
		if (sortOrder === 'desc') {
			setSortOrder('asc');
		} else {
			setSortOrder('desc');
		}

		requestSearchedPets(searchText);
	};

	// Filter pets less than one month
	const FilterLessThanOneMonth = () => {
		let filteredPetsArray = pets.filter((pet) => pet.age <= 1);
		setFilteredPets(filteredPetsArray);
	};

	// Filter pets more than one month
	const FilterMoreThanOneMonth = () => {
		let filteredPetsArray = pets.filter((pet) => pet.age > 1);
		setFilteredPets(filteredPetsArray);
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
			<Card pets={filteredPets} />
		</div>
	);
};

export default App;
