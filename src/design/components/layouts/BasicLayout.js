import styled from "styled-components";

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 740px;
	padding-top: 120px;
	margin: 0 auto;
	text-align: center;
`;

export const Header = styled.header`
	text-align: center;
	height: 120px;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #fff;

	a {
		text-decoration: none;
		text-align: center;
		font-weight: bold;
		color: #222;
		display: inline-block;
		cursor: pointer;
		margin-top: 18px;
		padding: 12px;
		&:not(:last-child) {
			margin-right: 40px;
        }
        transition: opacity 0.3s;
        &:hover {
            opacity: 0.7;
        }
	}

	span {
		display: inline-block;
		text-decoration: none;
		text-align: center;
		font-weight: bold;
		color: #222;
		display: inline-block;
		cursor: pointer;
		margin-top: 18px;
		padding: 12px;
		&:not(:last-child) {
			margin-right: 40px;
        }
        transition: opacity 0.3s;
        &:hover {
            opacity: 0.7;
        }
	}

	a:visit {
		text-decoration: none;
	}
`;

export const Connect = styled.div`
	width: 200px;
	display: inline-block;
	margin-bottom: -18px;
	margin-right: 12px;
	border-radius: 24px;
	height: 42px;
	border: 50%;
	background-color: #4297ff;
	cursor: pointer;
	line-height: 42px;
	text-align: center;
	color: #fff;
    font-weight: bold;
    transition: opacity 0.3s;
    &:hover {
        opacity: 0.7;
    }
`
