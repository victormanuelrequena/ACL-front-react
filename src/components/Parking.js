import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Stand from './Stand';
import { API } from '../config';

function Parking() {
	const [listStand, setListStand] = useState([]);
	const [filter, setFilter] = useState('All');
	const listOptRef = useRef();
	useEffect(() => {
		window.fetch(API)
		.then(res => res.json())
		.then(data => {
			setListStand(data);
		});

	},[]);

	console.log(listStand)

	const handleShowOptions = (e) => {
		if(listOptRef.current.style.display === 'none') {
			listOptRef.current.style.display = 'block';
		} else {
			listOptRef.current.style.display = 'none';
		}
	};

	const selectOption = (e) => {
		setFilter(e.target.value)
		handleShowOptions(e)
	}

	const listStandFiltered = listStand.filter(stand => {
		if(stand.estado === filter) return (
			stand
		);
		if(filter === 'All') return (
			stand
		);
	});

	return (
		<>
		<OrderLine>
			<H2>State</H2>
			<P>by</P>
		<List>
			<Button
			onClick={handleShowOptions}
			className="select-filter"
			value={filter}
			>
			{filter || 'All'}
			{/*<ArrowDropDownIcon />*/}
		</Button>
		<ListOptions ref={listOptRef} style={{display: 'none'}}>
			<OptionsFilter>
				<ButtonFilter
				value="All"
				onClick={selectOption}
				>
				All
				</ButtonFilter>
				<ButtonFilter
				value="disponible"
				onClick={selectOption}
				>
				Disponibles
				</ButtonFilter>
			</OptionsFilter>
			<OptionsFilter>
				<ButtonFilter
				value="reservado"
				onClick={selectOption}
				>
				Reservados
				</ButtonFilter>
			</OptionsFilter>
			<OptionsFilter>
				<ButtonFilter
				value="ocupado"
				onClick={selectOption}
				>
				Ocupados
				</ButtonFilter>
			</OptionsFilter>
		</ListOptions>
		</List>
		</OrderLine>

		<ParkingStyled>
		{
			listStandFiltered.map(stand => (
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
		</>
	)
};

const ParkingStyled = styled.div`
	width: 90%;
	height: 100%;
	margin: auto;
	// border: 1px solid blue;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 360px));
	grid-template-rows: 1fr 1fr;
	padding: 1em 2em;
	justify-content: center;
	align-items: center;
	grid-gap: 1em;
`;

const OrderLine = styled.div`
	display: flex;
	align-items: center;
	width: 76%;
	margin: 0 auto;
`;

const H2 = styled.div`
	display: inline-block;
	font-family: 'Inter', Arial, sans-serif;
	font-size: 2.2rem;
	font-weight: 500;
	letter-spacing: -2px;
`;

const P = styled.div`
	font-family: 'Inter';
	font-size: 1.6rem;
	color: #ccc;
	padding-left: .4em;
`;

const List = styled.div`
	position: relative;
	// border: 1px solid red;
	margin-left: 2em;
`;

const Button = styled.div`
	width: 100px;
	padding: .8em .2em .8em .6em;
	border: 1px solid rgba(124,127,198, .4);
	border-radius: 10px;
	position: relative;
	font-size: .8rem;
	color: #121121;
	cursor: pointer;
	display: flex;
	background: transparent;
	align-items: center;
	justify-content: space-between;
	&:hover {

	}
`;

const ListOptions = styled.div`
	// border: 1px solid red;
	position: absolute;
	top: 100%;
	padding: 0;
	margin: 0;
	transform: translateY(1px);
	// background: rgba(0, 118, 255, 0.1);
	border-radius: 10px;
	display: none;
	z-index: 1;
`;

const OptionsFilter = styled.li`
	// border: 1px solid green;
	list-style: none;
`;

const ButtonFilter = styled.button`
	width: 100px;
	padding: .8em .2em .3em .8em;
	border: 1px solid rgba(124,127,198, .4);
	border-radius: 7px;
	position: relative;
	font-size: .8rem;
	color: #121121;
	cursor: pointer;
	display: flex;
	background: white;
	box-shadow: 3px 3px 7px rgba(0,0,0, .2);
	align-items: center;
	justify-content: space-between;
	&:hover {
		box-shadow: 1px 1px 10px rgba(0,0,0, .2);
	}
`;

export default Parking;