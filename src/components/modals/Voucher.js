import React from 'react';
import styled from 'styled-components';

function Voucher({ reference, amount, entry, out }) {
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
`;

export default Voucher;