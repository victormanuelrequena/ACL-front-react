import React from 'react';
import styled from 'styled-components';

function Voucher({ reference, amount, entry, out }) {
	return (
		<VoucherStyled ref={reference}>
			<p>{`Mount: ${amount}$`}</p>
			<p>{`In: ${entry}`}</p>
			<p>{`Out: ${out}`}</p>
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
	display: none;
	z-index: 1;
	background: white;
	p {
		padding: 0;
		margin: 0;
	}
`;

export default Voucher;