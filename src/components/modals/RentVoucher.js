import React from 'react';
import styled from 'styled-components';
import ShowModal from '../utils/ShowModals';

function RentVoucher({reference, days, keyRent, mount}) {
	const rentVoucherHidden = () => {
		ShowModal(reference)
		window.location.reload();
	};
	return (
		<RentVoucherStyled ref={reference} style={{display: 'none'}}>
			<h4>Voucher</h4>
			<div className="camp">
			<p>Days: </p>
			<p>{days}</p>
			</div>
			<div className="camp">
			<p>Key: </p>
			<p>{keyRent}</p>
			</div>
			<div className="camp">
			<p>Mount: </p>
			<p>{`${mount}$`}</p>
			</div>
			<strong onClick={rentVoucherHidden}>X</strong>
		</RentVoucherStyled>
	)
};

const RentVoucherStyled = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 1em;
	display: none;
	z-index: 70;
	background: white;
	.camp {
		width: 80%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 .6em;
		border-bottom: 1px solid #ccc;
	}
	p {
		padding: 0;
		margin: 0;
		color: #222;
	}
	strong {
		position: absolute;
		z-index: 100;
		top: 1em;
		right: 1em;
		cursor: pointer;
		font-size: 18px;
	}
`;

export default RentVoucher;