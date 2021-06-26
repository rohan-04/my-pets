import React from 'react';
import './Card.css';

const Card = ({ pets }) => {
	return (
		<div className="card-container">
			{pets.map((pet) => (
				<div className="card">
					<h3 className="pet-name">{pet.name}</h3>
					<p className="pet-age">Age: {pet.bornAt}</p>
				</div>
			))}
		</div>
	);
};

export default Card;
