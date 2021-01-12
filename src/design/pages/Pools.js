import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 660px;
	padding: 90px 0;
	margin: 0 auto;
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

export const GoCreatePool = styled.button`
	align-self: flex-end;
	text-decoration: none;
	color: #fff;
	line-height: 1;
	font-size: 16px;
	font-weight: 700;
	padding: 15px 21px;
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
