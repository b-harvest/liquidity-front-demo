import styled from "styled-components";

export const TokenCard = styled.section`
	width: 100%;
	margin: 0;
	border-radius: 8px;
	border: 2px solid #1e2129;
	padding: 12px 21px;
	display: flex;
	justify-content: space-between;

	&:nth-child(3) {
		margin-top: 24px;
	}
`;
export const Title = styled.div`
	font-weight: 400;
	font-size: 14px;
	color: #838589;
	margin-bottom: 12px;
`;
export const Left = styled.div`
	text-align: left;
	height: 60px;
`;
export const Right = styled(Left)`
	width: 50%;
	text-align: right;
`;
export const ArrowEraser = styled.div`
	width: 16px;
	height: 16px;
	background-color: #ffffff;
	display: inline-block;
	transform: translate(-14px, 0);
`;
export const TokenSelector = styled.select`
	padding: 0;
	cursor: pointer;
	border-radius: 8px;
	height: 32px;
	font-weight: 700;
	font-size: 18px;
	line-height: 32px;
	border: none;
	outline: none;
	background-color: #fff;
`;
export const DepositInput = styled.input`
	padding: 0;
	cursor: pointer;
	border-radius: 8px;
	width: 100%;
	height: 32px;
	font-size: 18px;
	font-weight: 700;
	line-height: 32px;
	border: none;
	text-align: right;
	outline: none;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
	}

	::placeholder {
		color: #c7c8ca;
	}
`;
