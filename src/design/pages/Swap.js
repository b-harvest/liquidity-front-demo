import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 660px;
	height: 100vh;
	padding: 100px 0;
	margin: 0 auto;
`;

export const DepositCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 500px;
	padding: 36px;
	background-color: #fff;
	border-radius: 12px;
	border: 1px solid #bdbdbd;
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

	&:nth-child(2) {
		margin-top: 9px;
	}

	div {
		text-align: left;
	}
	div:last-child {
		text-align: right;
	}
`;
