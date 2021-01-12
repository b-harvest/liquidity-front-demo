import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const GoCreatePool = styled.button`
	display: inline-block;
	text-decoration: none;
	color: #fff;
	background-color: #4297ff;
	height: 36px;
	width: 110px;
	line-height: 36px;
	border-radius: 40px;
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 20px;
	margin-right: 70px;
	align-self: flex-end;
	border: none;
	outline: none;
	cursor: pointer;
	transition: opacity 0.3s;
	&:hover {
		opacity: 0.7;
	}
`;

export const PoolTable = styled.section`
	background-color: #ffffff;
	border-radius: 12px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
`;

export const Row = styled.div`
	margin-bottom: 20px;
	display: flex;
	width: 540px;

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

export const TableHeader = styled.div`
	display: flex;
	margin-bottom: 30px;
	background-color: rgba(255, 170, 13, 0.2);
	font-size: 20px;
	font-weight: 700;
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;

	div {
		flex: 1;
		line-height: 60px;
	}
`;
