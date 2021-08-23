import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Stand from './Stand';
import { API } from '../config';

function Parking() {
	const [listStand, setListStand] = useState([]);

	useEffect(() => {
		window.fetch(API)
		.then(res => res.json())
		.then(data => {
			setListStand(data);
		});

	},[]);

	console.log(listStand)

	return (
		<ParkingStyled>
		{
			listStand.map(stand => (
				<Stand
				key={stand._id}
				state={stand.estado}
				place={stand.lugar}
				fixed={stand.fijo}
				id={stand._id}
				/>
			))
		}
		</ParkingStyled>
	)
};

const ParkingStyled = styled.div`
	width: 90%;
	height: 100%;
	margin: auto;
	// border: 1px solid blue;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 360px));
	padding: 1em 2em;
	justify-content: center;
	align-items: center;
	grid-gap: 1em;
`;

export default Parking;