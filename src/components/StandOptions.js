import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Voucher from './modals/Voucher';
import RentVoucher from './modals/RentVoucher';
import SetDaysModal from './modals/SetDaysModal';
import { API } from '../config.js';
import * as ClientHttp from './utils/ClientHttp';
import ShowModal from './utils/ShowModals';

function StandOptions({ state, clase, id }) {
	const modalRentRef = useRef(),
	modalVoucherRef = useRef(),
	rentVoucherRef = useRef(),
	rpRef = useRef(),
	setKeyRef = useRef();

	const [rentDays, setRentDays] = useState({
		idBody: id,
		diasDeApartado: ''
	});
	const [Key, setKey] = useState('');
	const [dataVoucher, setDataVoucher]= useState({});
	const [dataRentVoucher, setDataRentVoucher] = useState({});

	async function park() {
	await ClientHttp.PUT(`${API}estacionar`, {idBody: id});
	window.location.reload();
	};

	async function rent(days) {

	if(days < 12 || days > 78) {
		return;
	};

	const data = await ClientHttp.PUT(`${API}reservar`, rentDays)
	setDataRentVoucher(data);
	ShowModal(rentVoucherRef);
	};

	async function reservedParking(e) {
	if(Key.length < 6) {
		setKeyRef.current.style.border="2px solid red";
		return;
	};

	const data = await ClientHttp.PUT(`${API}reservado/estacionar`, { idBody: id, key: Key });

	if(data.intento === 3) {
		rpRef.current.style.display="none";
		setTimeout(() => {
			rpRef.current.style.display="flex";
		}, 300000);
	}else {
		window.location.reload();
		setKeyRef.current.style.border="none"
	}
	};

	async function cancelReservation() {
	await ClientHttp.PUT(`${API}reservado/cancelar`, {idBody: id});
	window.location.reload();
	};

	async function retract() {
	const data = await ClientHttp.PUT(`${API}retirar`, {idBody: id});
	setDataVoucher(data);
	if(!data.fixed) {
		ShowModal(modalVoucherRef, 'limit');
		return;
	}
	window.location.reload();

	}

	async function deleteStand() {
		await ClientHttp.DELETE(`${API}eliminar`, {idBody: id});
		window.location.reload();
	};

	function handleChange(e) {
		setRentDays({
			...rentDays,
			diasDeApartado: e.target.value
		})
	};

	const showModalRent = () => {
		ShowModal(modalRentRef)
	};

	if(state === 'disponible') {
	return (
		<StandOptionsStyled className={clase}>
			<SetDaysModal
			modalRentRef={modalRentRef}
			handleChange={handleChange}
			rent={rent}
			/>
			<RentVoucher
			reference={rentVoucherRef}
			days={dataRentVoucher.Dias}
			keyRent={dataRentVoucher.key}
			mount={dataRentVoucher.monto}
			/>
			<button className="btn-option" onClick={park}>Park</button>
			<button className="btn-option" onClick={showModalRent}>Rent</button>
			<Close onClick={deleteStand}>delete</Close>
		</StandOptionsStyled>
	)
	};

	if(state === 'reservado') {
	return (
		<StandOptionsStyled className={clase}>
			<SetKey ref={setKeyRef} type="password" onChange={(e) => setKey(e.target.value)} />
			<button className="btn-option" onClick={reservedParking} ref={rpRef}>Park</button>
			<button className="btn-option" onClick={cancelReservation}>Cancel Reservation</button>
		</StandOptionsStyled>
	)
	};

	if(state === 'ocupado') {
	return (
		<StandOptionsStyled className={clase}>
			<Voucher
			reference={modalVoucherRef}
			amount={dataVoucher.amount}
			entry={dataVoucher.In}
			out={dataVoucher.out}
			/>
			<button className="btn-option" onClick={retract}>Retract</button>
		</StandOptionsStyled>
	)
	};
};

const StandOptionsStyled = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0em;
	background: rgba(0,0,0, .4);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 1em;
	transition: .5s;
	transform: translateY(100%);

	.btn-option {
	border: none;
	outline: none;
	padding: .7em 2em;
	background: #f3f3f3;
	font-size: 19px;
	font-family: sans-serif;
	color: black;
	border-radius: 10px;
	transition: .4s;
	cursor: pointer;
	&:hover {
		transform: scale(.9);
	}
	}
`;

const SetKey = styled.input`
	border: none;
	outline: none;
	border-radius: 4px;
	font-size: 16px;
	padding: .4em .2em;
	font-weight: bold;
`;

const Close = styled.strong`
	position: absolute;
	z-index: 30;
	top: .6em;
	left: 1em;
	cursor: pointer;
	font-size: 21px;
	color: white;
`;

export default StandOptions;