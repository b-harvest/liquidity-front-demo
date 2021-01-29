import { SharedDataContext } from "../context/app/SharedData"
import { useEffect, useState, useContext } from "react";
import { Wrapper, Detail, GoBack, DepositCard } from "../design/pages/Swap";

import { currencies } from "../common/config";
import { txGenerator, getLiquidityModuleParams } from "../common/cosmos-amm";
import { getMyTokenBalance, calculateCounterPairAmount, calculateSlippage } from "../common/global-functions";

import PoolList from "../components/PoolList";
import TokenSetter from "../elements/TokenSetter";
import ChangeButton from "../elements/ChangeButton";
import BasicButtonCard from "../elements/BasicButtonCard";

function Swap(props) {
    const SharedData = useContext(SharedDataContext)
    const [tokenA, setTokenA] = useState("")
    const [tokenB, setTokenB] = useState("")
    const [tokenAAmount, setTokenAAmount] = useState("")
    const [tokenBAmount, setTokenBAmount] = useState("")
    const [tokenAPoolAmount, setTokenAPoolAmount] = useState("")
    const [tokenBPoolAmount, setTokenBPoolAmount] = useState("")
    const [tokenPrice, setTokenPrice] = useState(null)
    const [poolId, setPoolId] = useState("")
    const [poolTypeIndex, setPoolTypeIndex] = useState("")
    const [tokenIndexer, setTokenIndexer] = useState(SharedData.tokenIndexer)
    const [slippage, setSlippage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isExceeded, setIsExceeded] = useState(false)
    const [isPoolSelected, setIsPoolSelected] = useState(false)

    useEffect(() => {
        if (SharedData.tokenIndexer !== null) {
            try {
                setTokenIndexer(SharedData.tokenIndexer)
            } catch (error) {
                console.error(error);
            }
        }
    }, [SharedData.tokenIndexer])


    // 로직 함수 시작
    async function swap() {
        const amountA = Math.floor(Number(tokenAAmount) * 1000000);
        const params = await getLiquidityModuleParams() // for swap_fee_rate
        let orderPrice = null

        //is reverse?
        if ([tokenA, tokenB].sort()[0] !== tokenA) {
            orderPrice = Number(tokenBPoolAmount) / Number(tokenAPoolAmount) * 0.9
        } else {
            orderPrice = Number(tokenAPoolAmount) / Number(tokenBPoolAmount) * 1.1
        }

        const msgData = {
            poolId: poolId,
            poolTypeIndex: poolTypeIndex,
            swapType: 1,
            offerCoin: {
                denom: tokenA,
                amount: String(amountA)
            },
            offerCoinFee: {
                denom: tokenA,
                amount: Number(Number(amountA) * params.swap_fee_rate * 0.5).toFixed(0)
            },
            demandCoinDenom: tokenB,
            orderPrice: Number(orderPrice).toFixed(18)
        };

        const feeData = {
            denom: "uatom",
            amount: 2000,
            gas: "180000"
        };

        console.log(`From : ${tokenA} ${tokenAAmount}`)
        console.log(`To : ${tokenB} ${tokenBAmount}`)
        console.log('OrderPrice', msgData.orderPrice);
        console.log(`Swap fee rate : ${params.swap_fee_rate}`)

        try {
            setIsLoading(true)
            const response = await txGenerator("MsgSwap", msgData, feeData);
            setIsLoading(false)
            if (String(response).includes("Error")) {
                throw response;
            }
            reset();
            // alert("Your tokens have been swapped successfully");
        } catch (error) {
            alert(error);
            setIsLoading(false)
        }
    };
    // 로직 함수 끝

    function tokenSelectorChangeHandler(e) {
        // setDynamicValues({ ...dynamicValues, [e.target.id]: e.target.value })
    };

    function amountChangeHandler(e) {
        const inputAmount = e.target.value
        const myATokenBalance = getMyTokenBalanceNumber(tokenA, tokenIndexer)
        const isReverse = e.target.id === "tokenAAmount" ? false : true
        const slippage = calculateSlippage(inputAmount * 1000000, isReverse ? tokenBPoolAmount : tokenAPoolAmount)
        const state = { tokenAPoolAmount, tokenBPoolAmount }

        let isExceeded = false
        let { counterPairAmount, price } = calculateCounterPairAmount(e, state, "swap")
        counterPairAmount = Math.abs(Number(counterPairAmount).toFixed(4))

        // is exceeded?(좌변에 fee 더해야함)
        if (isReverse) {
            //input from "to"(reverse)
            setTokenBAmount(inputAmount)
            setTokenAAmount(counterPairAmount)

            if (counterPairAmount > myATokenBalance) {
                isExceeded = true
            }
        } else {
            //input from "from"(normal)
            setTokenAAmount(inputAmount)
            setTokenBAmount(counterPairAmount)

            if (inputAmount > myATokenBalance) {
                isExceeded = true
            }
        }

        setSlippage(slippage)
        setIsExceeded(isExceeded)
        setTokenPrice(price)
        //helper 
        function getMyTokenBalanceNumber(denom, indexer) {
            return Number(getMyTokenBalance(denom, indexer).split(":")[1].trim())
        }
    };

    function setPriceImpactRangeColor(slippage) {
        let color = "";
        if (slippage <= 1) {
            color = "rgb(39, 174, 96)";
        } else if (slippage <= 3) {
            color = "";
        } else if (slippage <= 5) {
            color = "rgb(243, 132, 30)";
        } else {
            color = "rgb(255, 104, 113)";
        }
        return { color: color };
    };

    function getTokenPrice(a, b, tokenPrice) {
        if (tokenPrice === null) {
            const price = b / a;
            if (price && price !== Infinity) {

                return (
                    <span>
                        {parseFloat(price.toFixed(6))} {tokenA.substr(1).toUpperCase()} per {tokenB.substr(1).toUpperCase()}

                    </span>
                );
            }
        } else {
            return (<span>
                {parseFloat(tokenPrice.toFixed(6))} {tokenA.substr(1).toUpperCase()} per {tokenB.substr(1).toUpperCase()}
            </span>)

        }
    }



    function getSwapFees(a, b) {
        const price = b / a;
        if (price && price !== Infinity) {
            return (
                <span>
                    {(a * 0.0015).toFixed(8)} {tokenA.substr(1).toUpperCase()} <br /> {(b * 0.0015).toFixed(8)} {tokenB.substr(1).toUpperCase()}
                </span>
            );
        } else {
            return (
                <span>
                    0 {tokenA.substr(1).toUpperCase()} <br /> 0 {tokenB.substr(1).toUpperCase()}
                </span>
            );
        }
    };

    function reset() {
        setTokenAAmount("")
        setTokenBAmount("")
        setSlippage(0)
    };

    function selectPool(item) {
        console.log(item);
        if (item.liquidity_pool_metadata?.reserve_coins) {
            setIsPoolSelected(!isPoolSelected)
            setPoolId(item.liquidity_pool.pool_id)
            setPoolTypeIndex(item.liquidity_pool.pool_type_index)
            setTokenA(item.liquidity_pool_metadata.reserve_coins[0].denom)
            setTokenB(item.liquidity_pool_metadata.reserve_coins[1].denom)
            setTokenAPoolAmount(item.liquidity_pool_metadata.reserve_coins[0].amount)
            setTokenBPoolAmount(item.liquidity_pool_metadata.reserve_coins[1].amount)
            setSlippage(0)
            setIsExceeded(false)
        } else {
            reset();
            setIsPoolSelected(!isPoolSelected)
            setPoolId("")
            setPoolTypeIndex("")
            setTokenA("")
            setTokenB("")
            setTokenAPoolAmount("")
            setTokenBPoolAmount("")
            setIsExceeded(false)
        }
    };

    function tokenChange() {
        const A = tokenB
        const B = tokenA
        const AP = tokenBPoolAmount
        const BP = tokenAPoolAmount

        setTokenA(A)
        setTokenB(B)
        setTokenAAmount("")
        setTokenBAmount("")
        setTokenAPoolAmount(AP)
        setTokenBPoolAmount(BP)
        setSlippage(0)
    };

    if (isPoolSelected) {
        return (
            <Wrapper>
                <DepositCard>
                    <GoBack onClick={selectPool}>
                        <img src="/assets/arrow-left.svg" alt="left arrow" />
                    </GoBack>
                    <TokenSetter currencies={currencies} leftTitle="From" rightTitle={getMyTokenBalance(tokenA, tokenIndexer)} cssId="A" token={tokenA} tokenAmount={tokenAAmount} selectorHandler={tokenSelectorChangeHandler} amountHandler={amountChangeHandler} readOnly={true} />
                    <ChangeButton func={tokenChange} />
                    <TokenSetter currencies={currencies} leftTitle="To (estimated)" rightTitle={getMyTokenBalance(tokenB, tokenIndexer)} cssId="B" token={tokenB} tokenAmount={tokenBAmount} selectorHandler={tokenSelectorChangeHandler} amountHandler={amountChangeHandler} readOnly={true} />

                    <BasicButtonCard function={swap} buttonName="SWAP" isLoading={isLoading} isDisabled={isExceeded}>
                        <Detail>
                            <div>Price</div>
                            <div>{getTokenPrice(tokenAPoolAmount, tokenBPoolAmount, tokenPrice)}</div>
                        </Detail>
                        <Detail>
                            <div>Price Impact</div>
                            <div style={setPriceImpactRangeColor((slippage * 100).toFixed(2))}>{(slippage * 100).toFixed(2)}%</div>
                        </Detail>
                        <Detail >
                            <div>Swap Fees</div>
                            <div>{getSwapFees(tokenAAmount, tokenBAmount)}</div>
                        </Detail>
                    </BasicButtonCard>
                </DepositCard>
            </Wrapper>
        );
    } else {
        return <PoolList poolsData={SharedData.poolsData} selectPool={selectPool} actionType="Swap" />;
    }

}

export default Swap;
