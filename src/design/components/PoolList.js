import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 660px;
	padding: 100px 0;
	margin: 0 auto;

	@media (max-width: 959px) {
		font-size: 14px !important;
	}
`;

export const SectionHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0 12px;
	margin-bottom: 27px;

	div:first-child {
		font-size: 36px;
		font-weight: 700;
		line-height: 46px;
	}
`;

export const PoolTable = styled.section`
	width: 100%;
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
		width: 25%;
		line-height: 60px;
	}

	div:first-child {
		width: 50%;
	}

	div:last-child {
		width: 25%;
	}
`;

export const Row = styled.div`
	margin-bottom: 27px;
	display: flex;
	width: 100%;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25%;
		height: 48px;
	}

	div:first-child {
		width: 50%;
		font-weight: 500;
	}

	div:last-child {
		width: 25%;
	}

	span {
		color: #626469;
		margin: 0 12px;
	}
`;

export const DepositButton = styled.button`
	align-self: flex-end;
	text-decoration: none;
	color: #ffffff;
	line-height: 1;
	font-size: 16px;
	font-weight: 700;
	padding: 9px 24px;
	background-color: #ffaa0d;
	border-radius: 26px;
	border: none;
	outline: none;
	cursor: pointer;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	@media (max-width: 959px) {
		font-size: 14px !important;
		padding: 7px 18px;
		margin-bottom: 10px;
	}
`;
