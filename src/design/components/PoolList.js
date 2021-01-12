import styled from "styled-components";

export const Row = styled.div`
	margin-bottom: 20px;
	display: flex;
	width: 660px;

	div:first-child {
		line-height: 48px;
	}

	div {
		width: 33.3333%;
		display: inline-block;
		line-height: 24px;
	}

	div:last-child {
		line-height: 48px;
	}
`;
export const PoolTable = styled.section`
	margin: 0 auto;
	border-radius: 6px;
	text-align: center;
`;

export const TableHeader = styled(Row)`
	margin-bottom: 30px;
	background-color: #eef5ff;
	font-weight: bold;

	div {
		line-height: 48px;
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
`
