import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 660px;
	height: 100vh;
	padding: 100px 0 150px;
	margin: 0 auto;
	@media (max-width: 959px) {
		width: 100%;
	}
`;

export const SectionHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 500px;
	padding: 0 12px;
	margin-bottom: 27px;

	div:first-child {
		font-size: 36px;
		font-weight: 700;
		line-height: 46px;
	}

	@media (max-width: 959px) {
		width: 100%;
		
		div:first-child {
		font-size: 28px;
	}
	}
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
	@media (max-width: 959px) {
	padding: 16px;
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
