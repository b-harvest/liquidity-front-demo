import styled from "styled-components";

export const Layout = styled.div`
	display: flex;
	flex-flow: row nowrap;
	width: 100%;
`;

export const HeaderPlaceholder = styled.div`
	position: relative;
	width: 240px;
	height: 100%;
`;

export const Header = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 240px;
	height: 100%;
	background-color: #1e2129;

	a,
	span {
		display: inline-block;
		width: 100%;
		padding: 21px;
		margin: 6px 0;
		font-size: 20px;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			width: 270px;
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
			transition: all 0.2s ease;
		}

		&:visit {
			text-decoration: none;
		}
	}

	a:hover {
		background-color: #ffaa0d;
	}

	span:hover {
		background-color: #0abf7e;
	}
`;

export const Brand = styled.div`
	position: absolute;
	top: 60px;
	width: 100%;
	text-align: right;

	img {
		width: 166px;
		margin-right: 37px;

		&:last-child {
			width: 105px;
			opacity: 0.7;
			margin-top: 3px;
		}
	}
`;

export const Connect = styled.div`
	display: inline-block;
	position: absolute;
	bottom: 135px;
	width: 100%;
	border: 50%;
	background-color: #247bf2;
	color: #fff;
	font-weight: bold;
	line-height: 46px;
	text-align: center;
	cursor: pointer;
	transition: all 0.15s ease-in;

	&:hover {
		bottom: 131px;
		line-height: 56px;
		background-color: #66a3f6;
	}
`;
