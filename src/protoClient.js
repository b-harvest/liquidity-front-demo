


const { LiquidityPool } = require('./proto-js/liquidity_pb')




export function test() {
    const test = new LiquidityPool()
    console.log('proto response:./src/protoClient.js', test.getReserveCoinDenomsList())

    // test()
}