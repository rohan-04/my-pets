import React from 'react';
import './Card.css';

const Card = ({ pets }) => {
	return (
		<div className="card-container">
			{pets.length > 0 ? (
				pets.map((pet) => (
					<div className="card" key={pet.id}>
						<h3 className="pet-name">{pet.name}</h3>
						<p className="pet-age">
							Age: {pet.age <= 1 ? `${pet.age} month` : `${pet.age} months`}
						</p>
					</div>
				))
			) : (
				<p className="notFound">Not found!</p>
			)}
		</div>
	);
};

export default Card;
