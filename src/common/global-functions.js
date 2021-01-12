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
    return [x, y]
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
        const swapFeeRatio = 0.997
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

// export function calculateCounterPairAmount(e, state, sp, type) {

// }

export function calculateSlippage(swapAmount, poolReserve) {
    return 2 * swapAmount / poolReserve
}
