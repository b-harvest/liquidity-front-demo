import styled from "styled-components";

export const Card = styled.div`
	width: 100%;
	border-radius: 8px;
	background-color: rgba(255, 170, 13, 0.15);
	padding: 24px 21px;
	margin-top: 36px;
`;

export const Button = styled.div`
	align-self: flex-end;
	text-decoration: none;
	color: #ffffff;
	line-height: 44px;
	font-size: 16px;
	font-weight: 700;
	height: 46px;
	padding: 0 21px;
	margin-top: 24px;
	background-color: #ffaa0d;
	border-radius: 26px;
	border: none;
	outline: none;
	cursor: pointer;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}
`;
