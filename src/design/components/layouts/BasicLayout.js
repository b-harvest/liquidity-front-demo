import styled from "styled-components";

export const Layout = styled.div`
	display: flex;
	flex-flow: row nowrap;
	width: 100%;
	@media (max-width: 959px) {
		padding: 0 12px;
	}
`;

export const HeaderPlaceholder = styled.div`
	position: relative;
	width: 240px;
	height: 100%;
	
	@media (max-width: 959px) {
		display:none;
	}
`;

export const Header = styled.header`
@media (min-width: 960px) {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 240px;
	height: 100%;
	background-color: #1e2129;

	a:not(:first-child),
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

	a:not(:first-child):hover {
		background-color: #ffaa0d;
	}

	span:hover {
		background-color: #0abf7e;
	}
}

@media (max-width: 959px) {
	z-index: 9;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	width: 100%;
	height: 60px;
	background-color: #1e2129;
	border: none;

	a:not(:first-child),
	span {
		flex:1;
		display:block;
		padding: 22px 0;
		font-size: 14px;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.3s ease;

		&:visit {
			text-decoration: none;
		}
	}

	a:not(:first-child):hover {
		background-color: #ffaa0d;
	}

	span {
		display: none;
	}
}
`;

export const Brand = styled.div`
@media (min-width: 960px) {
	display:block;
	position: absolute;
	top: 60px;
	width: 100%;
	text-align: right;

	a > img {
		width: 166px;
		margin-top: 0;
	}

	img {
		width: 105px;
		margin-top: 3px;
		margin-right: 37px;
	}
}

display: none;
`;

export const Connect = styled.div`
@media (min-width: 960px) {
display: inline-block;
	position: absolute;
	bottom: 60px;
	width: 100%;
	border: 50%;
	background-color: #247bf2;
	color: #ffffff;
	font-weight: bold;
	line-height: 46px;
	text-align: center;
	cursor: pointer;
	transition: all 0.1s ease-out;

	&:hover {
		bottom: 55px;
		line-height: 56px;
		background-color: #66a3f6;
	}
}
	display: none;
`;
