export function getTokenIndexer(wtl) {
    let tokenIndexer = {}
    if (wtl !== null) {
        wtl.forEach((item) => {
            tokenIndexer[item.denom] = item.amount
        })
    }
    return tokenIndexer
}