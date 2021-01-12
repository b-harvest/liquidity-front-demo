import styled from "styled-components";

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
`

export const PoolTable = styled.section`
	margin: 0 auto;
	border-radius: 6px;
	text-align: center;
`

export const Row = styled.div`
	margin-bottom: 20px;
	display: flex;
	width: 540px;

	div {
		width: 50%;
		line-height: 24px;
	}

	div:first-child {
		line-height: 48px;
	}
`

export const TableHeader = styled(Row)`
	margin-bottom: 30px;
	background-color: #eef5ff;
	font-weight: bold;

	div {
		line-height: 48px;
	}
`