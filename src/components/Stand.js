import React from 'react';
import styled from 'styled-components';
import StandOptions from './StandOptions';

function Stand({state, place, fixed, id}) {
	return (
		<StandStyled className={state} state={state}>
			<Place>{place}</Place>
				<StandOptions
				clase="stand_options"
				state={state}
				id={id}
				/>
		</StandStyled>
	)
};

const StandStyled = styled.div`
	width: 100%;
	height: 360px;
	// border: 1px solid red;
	background: ${({state}) => state === 'disponible' ? '#26fe64' : (state === 'reservado' ? '#f9c120' : '#d20713')};
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	&:hover .stand_options {
		transform: translateY(0%);
	}
`;

const Place = styled.h2`
	font-size: 100px;
	display: block;
	text-align: center;
	margin: auto;
	margin-top: 1em;
`;

export default Stand;