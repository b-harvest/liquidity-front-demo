import { Component } from 'react';
import styled from 'styled-components';

class PoolList extends Component {

    createRows(data) {
        return (
            data.map((item, index) => {
                console.log(item.id)
                return (
                    <Row key={index}>
                        <div>{item.reserveOne}</div>
                        <div>{item.reserveTwo}</div>
                        <div>{item.myToken ? `${item.myToken.balance} (${item.myToken.percentage}%)` : '-'}</div>
                        <div>SOON </div>
                    </Row>)
            })
        )
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
                {this.createRows(this.props.myTokenData)}
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