import styled from "styled-components";

export const Layout = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

export const Header = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	width: 240px;
	height: 100%;
	background-color: #1e2129;

	a {
		display: inline-block;
		width: 100%;
		padding: 24px;
		font-size: 20px;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		text-decoration: none;
		transition: all 0.3s ease;

		&:hover {
			width: 270px;
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
			background-color: #ffaa0d;
			transition: all 0.2s ease;
		}
	}

	span {
		display: inline-block;
		text-decoration: none;
		text-align: center;
		font-weight: bold;
		color: #ffffff;
		display: inline-block;
		cursor: pointer;
		margin-top: 18px;
		padding: 12px;
		&:not(:last-child) {
			margin-right: 40px;
		}
	}

	a:visit {
		text-decoration: none;
	}
`;

export const Connect = styled.div`
	display: inline-block;
	position: absolute;
	bottom: 60px;
	width: 100%;
	height: 42px;
	border: 50%;
	background-color: #4297ff;
	cursor: pointer;
	line-height: 42px;
	text-align: center;
	color: #fff;
	font-weight: bold;
`;
