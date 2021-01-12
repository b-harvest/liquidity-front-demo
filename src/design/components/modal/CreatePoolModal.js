import styled from "styled-components";

export const Modal = styled.div`
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
