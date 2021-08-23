import React from 'react';
import styled from 'styled-components';
import ShowModal from '../utils/ShowModals';

function Voucher({ reference, amount, entry, out }) {

	const voucherHidden = () => {
		ShowModal(reference)
		window.location.reload();
	};

	return (
		<VoucherStyled ref={reference} style={{display: 'none'}}>
			<h4>Voucher</h4>

			<div className="td">
			<p>Mount: </p>
			<p>{amount}</p>
			</div>

			<div className="td">
			<p>In: </p>
			<p>{entry}</p>
			</div>

			<div className="td">
			<p>Out: </p>
			<p>{out}</p>
			</div>
			<strong onClick={voucherHidden}>X</strong>
		</VoucherStyled>
	)
};

const VoucherStyled = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 1em;
	display: none;
	z-index: 2;
	background: white;
	.td {
		display: flex;
		width: 90%;
		margin: 0 auto;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ccc;
	}
	p {
		padding: 0;
		margin: 0;
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

export default Voucher;