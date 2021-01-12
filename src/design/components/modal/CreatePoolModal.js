import styled from "styled-components";

export const Modal = styled.div`
	position: absolute;
	width: 460px;
	height: 340px;
	padding: 20px;
	background-color: #fff;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	border-radius: 8px;
`;

export const Detail = styled.div`
	display: flex;
	font-weight: bold;
	div {
		flex: 1;
		text-align: right;
	}
	div:first-child {
		text-align: left;
	}
`;
