import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getTokenIndexer(wtl) {
    let tokenIndexer = {}
    if (wtl) {
        wtl.forEach((item) => {
            tokenIndexer[item.denom] = item.amount
        })
    }
    return tokenIndexer
}

export function getMyTokenBalance(token, indexer) {
    if (indexer === null) {
        return `My Balance: 0`
    } else {
        const balance = Number(Number(indexer[token]) / 1000000).toFixed(2)
        if (balance !== "NaN") {
            return `My Balance: ${balance}`
        } else {
            return `My Balance: 0`
        }
    }
}

export function sortReserveCoinDenoms(x, y) {
    return [x, y].sort()
}

export function getDepositCoins(denoms, amounts) {
    return { denoms: [denoms[0], denoms[1]], amounts: [amounts[denoms[0]], amounts[denoms[1]]] }
}

export function calculateCounterPairAmount(e, state, sp, type) {
    let price = null
    let slippage = sp
    let counterPairAmount = 0
    let counterPair = ''

    if (slippage >= 1) {
        slippage = 0.997
    }

    if (type === 'swap') {
        const swapFeeRatio = 0.9985
        const constantNumber = state.tokenAPoolAmount / 1000000 * state.tokenBPoolAmount / 1000000
        if (e.target.id === "tokenAAmount") {
            console.log('A')
            price = state.tokenBPoolAmount / state.tokenAPoolAmount
            counterPair = "tokenBAmount"
            counterPairAmount = (state.tokenBPoolAmount / 1000000 - (constantNumber / (state.tokenAPoolAmount / 1000000 + Number(e.target.value) * swapFeeRatio)))
        } else {
            console.log('B')
            price = state.tokenAPoolAmount / state.tokenBPoolAmount
            counterPair = "tokenAAmount"
            counterPairAmount = (state.tokenAPoolAmount / 1000000 - (constantNumber / (state.tokenBPoolAmount / 1000000 + Number(e.target.value) * 1.00309)))
        }

    } else {
        if (e.target.id === "tokenAAmount") {
            price = state.tokenBPoolAmount / state.tokenAPoolAmount
            counterPair = "tokenBAmount"
            counterPairAmount = e.target.value * price
        } else {
            price = state.tokenAPoolAmount / state.tokenBPoolAmount
            counterPair = "tokenAAmount"
            counterPairAmount = e.target.value * price
        }
        counterPairAmount = counterPairAmount.toFixed(2)
    }

    return {
        price: price,
        counterPair: counterPair,
        counterPairAmount: counterPairAmount,
    }
}

export function calculateSlippage(swapAmount, poolReserve) {
    return 2 * swapAmount / poolReserve
}

export function getPoolToken(pl, wt) {
    let myPoolTokens = {};
    wt.forEach((ele) => {
        if (ele.denom.length > 10) {
            myPoolTokens[ele.denom] = ele.amount;
        }
    });
    return pl.map((ele) => {
        let myTokenAmount = 0;
        if (myPoolTokens[ele.liquidity_pool.pool_coin_denom]) {
            myTokenAmount = myPoolTokens[ele.liquidity_pool.pool_coin_denom];
        }
        return {
            coinDenom: `${ele.liquidity_pool.reserve_coin_denoms[0]
                .substr(1)
                .toUpperCase()}-${ele.liquidity_pool.reserve_coin_denoms[1]
                    .substr(1)
                    .toUpperCase()}`,
            tokenDenom: [
                ele.liquidity_pool.reserve_coin_denoms[0],
                ele.liquidity_pool.reserve_coin_denoms[1]
            ],
            poolTokenAmount:
                ele.liquidity_pool_metadata.pool_coin_total_supply.amount,
            coinMinimalDenom: ele.liquidity_pool.pool_coin_denom,
            reserveCoins: ele.liquidity_pool_metadata.reserve_coins,
            myTokenAmount: myTokenAmount,
            poolId: ele.liquidity_pool.pool_id
        };
    });
}

export const toastGenerator = (type = '', msg = '') => {
    let toastFunc = null
    switch (type) {
        case "error":
            toastFunc = toast('🦄 Wow so easy!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break;
        case "success":
            toastFunc = toast.success(msg, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break;
        case "new":
            toastFunc = toast('🦄 Wow so easy!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break;
        case "connect":
            toastFunc = toast.success('👛 Wallet Connected!', {
                position: "bottom-left",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break;
        default:
            toastFunc = toast('🦄 Wow so easy!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            break;
    }
    return toastFunc
}

