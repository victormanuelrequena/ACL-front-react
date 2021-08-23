import React from 'react';
import styled from 'styled-components';

function CancelReserve({reference}) {
	return (
		<CancelReserveStyled ref={reference}>
			<Text>Rent Cancel!</Text>
		</CancelReserveStyled>
	)
};

const CancelReserveStyled = styled.div`
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
`;

const Text = styled.h3`
	font-size: 20px;
	font-family: sans-serif;
	display: block;
	text-align: center;
	padding: 0 .8em;
`;

export default CancelReserve;