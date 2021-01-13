import styled from "styled-components";

export const Modal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 500px;
	padding: 36px;
	background-color: #ffffff;
	border-radius: 8px;
`;

export const GoBack = styled.div`
	align-self: flex-start;
	margin-bottom: 20px;

	img {
		display: inline-block;
		width: 42px;
		color: #1e2129;
		cursor: pointer;
		padding: 9px;
		border-radius: 30px;
		transition: all 0.2s ease;

		&:hover {
			background-color: #c7c8ca;
		}
	}
`;

export const Detail = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 700;

	div {
		text-align: right;
	}

	div:first-child {
		text-align: left;
	}
`;
