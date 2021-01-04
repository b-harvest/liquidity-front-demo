import Axios from 'axios';

export const getPoolList = async () => {
    try {
        const response = await Axios.get('https://dev.bharvest.io/rest/liquidity/pools')
        const poolListData = response.data.pools
        console.log('getPoolList', poolListData)
        return poolListData
    } catch (error) {
        console.error("getPoolList", error)
    }
}

export const getWalletTokenList = async () => {
    try {
        const response = await Axios.get(`https://dev.bharvest.io/rest/bank/balances/${localStorage.getItem('walletAddress')}`)
        const walletTokenList = response.data.result
        console.log('getWalletTokenList', walletTokenList)
        return walletTokenList
    } catch (error) {
        console.error("getWalletTokenList", error)
    }
}