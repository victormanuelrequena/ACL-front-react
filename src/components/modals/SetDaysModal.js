import React, { useRef } from 'react';
import styled from 'styled-components';
import ShowModal from '../utils/ShowModals';

function SetDaysModal({ modalRentRef, handleChange, rent}) {

	const setDaysReserveRef = useRef();

	const rentStand = () => {
		if(setDaysReserveRef.current.value < 12 || setDaysReserveRef.current.value > 79) {
			setDaysReserveRef.current.style.border="3px solid red";
			return;
		};
		rent(setDaysReserveRef.current.value);
	};

	const cancelRent = () => {
		ShowModal(modalRentRef)
		setDaysReserveRef.current.style.border="none";
	};

	return (
		<SetDaysModalStyled ref={modalRentRef} style={{display: 'none'}}>
			<ModalCreate>
					<TextModal>Ingrese la cantidad de dias que desea reservar.</TextModal>
					<SetDays type="number" onChange={handleChange} ref={setDaysReserveRef}/>
					<ButtonModal onClick={rentStand}>Rent</ButtonModal>
					<ButtonModal onClick={cancelRent}>Cancel</ButtonModal>
			</ModalCreate>
		</SetDaysModalStyled>
	)
}

const SetDaysModalStyled = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	background: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	display: none;
	z-index: 50;
`;

const ModalCreate = styled.div`
	width: 480px;
	height: 380px;
	background: #121121;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	z-index: 2;
	row-gap: 1.4em;
`;

const TextModal = styled.h5`
	display: block;
	padding: 0 .8em;
	text-align: center;
	color: white;
	font-family: sans-serif;
	font-size: 19px;
`;

const ButtonModal = styled.button`
	border: none;
	outline: none;
	padding: .7em 1.4em;
	margin-top: .4em;
	background: white;
	font-size: 19px;
	font-family: sans-serif;
	color: #121121;
	border-radius: 10px;
	transition: .4s;
	cursor: pointer;
	opacity:1;
	margin: 0 1em;
	font-weight: bold;
	&:hover {
		opacity:1;
	}
`;

const SetDays = styled.input`
	width: 120px;
	font-size: 19px;
	padding: 1em 1.6em;
	border-radius: 10px;
	border: 2px solid black;
	outline: none;
`;

export default SetDaysModal