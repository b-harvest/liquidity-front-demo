import Axios from 'axios';
import { Component } from 'react';
import styled from 'styled-components';

class PoolList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolData: null,
        };
    }

    componentDidMount() {
        Axios.get('https://dev.bharvest.io/rest/liquidity/pools').then(response => {
            let poolListData = response.data.pools

            Axios.get(`https://dev.bharvest.io/rest/bank/balances/${localStorage.getItem('walletAddress')}`).then(response => {
                console.table('wallet own tokens', response.data.result)
                this.setState({ poolData: poolListData })
                console.log('poolList', this.state.poolData)
            }).catch(error => {
                console.log('getPoolListError', error)
            })



        }).catch(error => {
            console.log('getPoolListError', error)
        })



    }

    createRows(data) {
        if (data === null) {
            return (<div></div>)
        } else {
            return (
                data.map((item, index) => {

                    return (
                        <Row key={index}>
                            <div>{item.liquidity_pool.reserve_coin_denoms[0]}</div>
                            <div>{item.liquidity_pool.reserve_coin_denoms[1]}</div>
                            <div>{item.myToken ? `${item.myToken.balance} (${item.myToken.percentage}%)` : '-'}</div>
                            <div>SOON </div>
                        </Row>)
                })
            )
        }
    }

    render() {
        return (
            <PoolTable>
                <TableHeader>
                    <div>Reserve 1</div>
                    <div>Reserve 2</div>
                    <div>My Token</div>
                    <div>Action</div>
                </TableHeader>
                {this.createRows(this.state.poolData)}
            </PoolTable>
        )
    }
}

const PoolTable = styled.section`
width: 100%;
border: 1px solid gray;
border-radius: 8px;
text-align:center;
`
const Row = styled.div`
// width: 820px;
&:nth-child(2n) {
    background-color: #efefef;
}
div {
    display:inline-block;
    width:180px;
    height: 36px;
    line-height: 36px;
    &:not(:last-child) {
        border-right: 1px solid #c3c3c3;;
    }
}
&:not(:last-child) {
    border-bottom: 1px solid #c3c3c3;
}
&:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

`
const TableHeader = styled(Row)`
    font-weight: 700;
    border-bottom: none;
`


export default PoolList