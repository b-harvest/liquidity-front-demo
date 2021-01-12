import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 660px;
	padding: 120px 0;
	margin: 0 auto;
`;

export const PoolTable = styled.section`
	width: 100%;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 12px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export const TableHeader = styled.div`
	display: flex;
	margin-bottom: 27px;
	background-color: rgba(255, 170, 13, 0.15);
	font-size: 20px;
	font-weight: 700;
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;

	div {
		flex: 1;
		line-height: 60px;
	}
`;

export const Row = styled.div`
	margin-bottom: 27px;
	display: flex;
	width: 100%;

	div {
		width: 50%;
		line-height: 24px;
	}

	div:first-child {
		font-weight: 500;
		line-height: 48px;
	}

	span {
		color: #626469;
		margin: 0 12px;
	}
`;

export const DepositButton = styled.button`
	width: 120px;
	height: 24px;
	border-radius: 12px;
	border: none;
	background-color: #4297ff;
	color: #fff;
	font-weight: bold;
	cursor: pointer;
	outline: none;
	transition: opacity 0.3s;
	&:hover {
		opacity: 0.7;
	}
`;
