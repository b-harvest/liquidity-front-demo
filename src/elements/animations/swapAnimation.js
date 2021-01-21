import { useEffect, useState } from "react";
import styled from "styled-components";
import CoinImgShower from "../CoinImageShower";



function SwapAnimation(props) {

    const [isSwap, setIsSwap] = useState(false)
    useEffect(() => {
        console.log(1)
        if (props.isSwap > 0.5) {
            setIsSwap(true)
            setTimeout(() => {
                setIsSwap(false)
            }, 400)
        }
    }, [props.isSwap])

    return (
        isSwap ? (
            <Wrapper>
                <span style={{ animationName: "swap-left", margin: "0" }}><CoinImgShower coin={props.coinOne} /></span>

                <div>{props.coinOne}</div>
                <span style={{ visibility: "hidden" }}>···</span>

                <span style={{ animationName: "swap-right", margin: "0" }}><CoinImgShower coin={props.coinTwo} /></span>
                <div> {props.coinTwo}</div >
            </Wrapper>) : ''
    );
}


const Wrapper = styled.div`
width: 100% !important;
position: absolute;
top:13px;
div {
    display:inline;
     visibility: hidden;
}

img {
    width: 12px;
    height: 12px;
    margin: 0 !important;
    opacity: 0.7;
}

span {
    animation-timing-function:  linear;
    animation-iteration-count: 1;
    animation-duration: 0.4s;

    display: inline-block;
     transform: translate(7px, 0)
}

span:first-child {
    transform: translate(-9px, 0)
}


@keyframes swap-left {
	0% {
      transform: translate(0, 0);
    }

    10% {
         transform: translate(12px, -20px);
    }

    50% {
        transform: translate(60px, -28px);
    }

    90% {
        transform: translate(90px, -20px);
    }

    100% {
      transform: translate(104px, 0);
    }
}
    
    @keyframes swap-right {
	0% {
      transform: translate(0, 0);
    }

    10% {
         transform: translate(-12px, 20px);
    }

    50% {
        transform: translate(-55px, 28px);
    }

    90% {
        transform: translate(-90px, 20px);
    }

    100% {
      transform: translate(-104px, 0);
    }
	}

`
export default SwapAnimation;