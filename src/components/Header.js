import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ShowModal from './utils/ShowModals';
import { API } from '../config';

function Header() {
	const [lugar, setLugar] = useState({
		lugar: 0
	});
	const modalCreateRef = useRef();

	function createStand() {
		window.fetch(`${API}crear`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(lugar)
		})
		.then(res => res.json())
		.then(data => console.log(data))
		ShowModal(modalCreateRef)
	};

	function showCreateModal() {
		if(modalCreateRef.current.style.display === 'none') {
			modalCreateRef.current.style.display="flex";
		}else {
			modalCreateRef.current.style.display="none";
		}
	}

	function handleChange(e) {
		setLugar({
			lugar: e.target.value
		})
	};

	return (
		<HeaderStyled>
			<Title><i>Estacion Amé</i></Title>
			<div>
			<Button onClick={() => ShowModal(modalCreateRef)}>Create Stand</Button>
			</div>
			<BoxModalCreate ref={modalCreateRef}>
				<ModalCreate>
					<TextModal>Ingresa el numero de estacionamiento con el que deseas crear el puesto</TextModal>
					<SetLugar type="number" onChange={handleChange} />
					<ButtonModal onClick={createStand}>Crear</ButtonModal>
				</ModalCreate>
			</BoxModalCreate>
		</HeaderStyled>
	)
}

const HeaderStyled = styled.div`
	width: 100%;
	height: 300px;
	background: #121121;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	row-gap: 2em;
`;

const Title = styled.h1`
	font-family: sans-serif;
	font-size: 70px;
	color: white;
	padding: 0;
	margin: 0;
`;

const Button = styled.button`
	border: none;
	outline: none;
	padding: 1em 2em;
	background: #f3f3f3;
	font-size: 19px;
	font-family: sans-serif;
	color: black;
	border-radius: 10px;
	transition: .4s;
	cursor: pointer;
	opacity:.8;
	margin: 0 1em;
	&:hover {
		opacity:1;
	}
`;

const BoxModalCreate = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	background: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	display: none;
	z-index: 1;
`;

const ModalCreate = styled.div`
	width: 480px;
	height: 380px;
	background: rgba(240,240,240, .8);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 8em;
	z-index: 2;
	row-gap: 1.4em;
`;

const TextModal = styled.h5`
	display: block;
	text-align: center;
	color: #121121;
	font-family: sans-serif;
	font-size: 19px;
`;

const ButtonModal = styled.button`
	border: none;
	outline: none;
	padding: 1em 1.6em;
	margin-top: 1em;
	background: #121121;
	font-size: 19px;
	font-family: sans-serif;
	color: white;
	border-radius: 10px;
	transition: .4s;
	cursor: pointer;
	opacity:1;
	margin: 0 1em;
	&:hover {
		opacity:1;
	}
`;

const SetLugar = styled.input`
	width: 120px;
	font-size: 19px;
	padding: 1em 1.6em;
	border-radius: 10px;
	border: 2px solid black;
	outline: none;
`;

export default Header;