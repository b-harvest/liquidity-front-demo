export function getTokenIndexer(wtl) {
    let tokenIndexer = {}
    console.log(wtl)
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