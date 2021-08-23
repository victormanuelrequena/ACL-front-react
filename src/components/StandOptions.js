import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Voucher from './modals/Voucher';
import RentVoucher from './modals/RentVoucher';
import CancelReserve from './modals/CancelReserve';
import SetDaysModal from './modals/SetDaysModal';
import { API } from '../config.js';
import * as ClientHttp from './utils/ClientHttp';
import ShowModal from './utils/ShowModals';

function StandOptions({ state, clase, id }) {
	const modalRentRef = useRef();
	const modalVoucherRef = useRef();
	const cancelReserveRef = useRef();
	const rentVoucherRef = useRef();
	const rpRef = useRef();

	const [rentDays, setRentDays] = useState({
		idBody: id,
		diasDeApartado: ''
	});
	const [Key, setKey] = useState('');
	const [dataVoucher, setDataVoucher]= useState({});
	const [dataRentVoucher, setDataRentVoucher] = useState({});

	function park() {
	ClientHttp.PUT(`${API}estacionar`, {idBody: id});
	};

	async function rent() {
	const data = await ClientHttp.PUT(`${API}reservar`, rentDays)
	setDataRentVoucher(data)
	ShowModal(modalRentRef)
	ShowModal(rentVoucherRef);
	};

	async function reservedParking(e) {
	const data = await ClientHttp.PUT(`${API}reservado/estacionar`, { idBody: id, key: Key });
	console.log(data);
	if(data.intento === 3) {
		rpRef.current.style.display="none";
		setTimeout(() => {
			rpRef.current.style.display="flex";
		}, 300000);
	}
	};

	function cancelReservation() {
	ClientHttp.PUT(`${API}reservado/cancelar`, {idBody: id});
	ShowModal(cancelReserveRef, 'limit')
	};

	async function retract() {
	const data = await ClientHttp.PUT(`${API}retirar`, {idBody: id});
	setDataVoucher(data);
	ShowModal(modalVoucherRef, 'limit');
	}

	async function deleteStand() {
		const data = await ClientHttp.DELETE(`${API}eliminar`, {idBody: id});
	};

	function handleChange(e) {
		setRentDays({
			...rentDays,
			diasDeApartado: e.target.value
		})
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
			<button className="btn-option" onClick={() => ShowModal(modalRentRef)}>Rent</button>
			<Close onClick={deleteStand}>delete</Close>
		</StandOptionsStyled>
	)
	};

	if(state === 'reservado') {
	return (
		<StandOptionsStyled className={clase}>
			<SetKey type="password" onChange={(e) => setKey(e.target.value)} />
			<button className="btn-option" onClick={reservedParking} ref={rpRef}>Park</button>
			<button className="btn-option" onClick={cancelReservation}>Cancel Reservation</button>
			<CancelReserve reference={cancelReserveRef}/>
		</StandOptionsStyled>
	)
	};

	if(state === 'ocupado') {
	return (
		<StandOptionsStyled className={clase}>
			<button className="btn-option" onClick={retract}>Retract</button>
			<Voucher
			reference={modalVoucherRef}
			amount={dataVoucher.amount}
			entry={dataVoucher.In}
			out={dataVoucher.out}
			/>
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