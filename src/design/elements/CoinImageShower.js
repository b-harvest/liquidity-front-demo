import styled from "styled-components";

export const CoinImgShower = styled.img`
	width: 30px;
	height: 30px;
	margin-bottom: -8px;
	margin-right: 6px;
	border: 1px solid #c7c8ca;
	border-radius: 15px;

	@media (max-width: 959px) {
		width: 20px;
		height: 20px;
		margin-bottom: -5px;
	}
	
	animation-name: ${(props) => props.isSwap ? "zoom-blink" : ""};
	animation-timing-function:  linear;
	animation-iteration-count: 1;
	animation-delay: 0.4s;
	animation-duration: 0.2s;
	@keyframes zoom-blink {
		0% {
		
		}

		50% {
			transform: scale(1.28);
			opacity: 0.5
		}

		100% {
		
		}
	}
`;
