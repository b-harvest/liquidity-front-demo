import { Component } from 'react';
import styled from 'styled-components';

class BasicLayout extends Component {

    render() {
        return (
            <Layout>
                <Header>
                    <a href="/">Pool List</a>
                    <a href="/create-new-pool">Create Pool</a>
                    <a href="/deposit">Deposit</a>
                    <a href="/withdraw">Withdraw</a>
                </Header>
                {this.props.children}
            </Layout>)
    }
}

const Layout = styled.div`
width: 740px;
padding-top: 120px;
margin: 0 auto;
text-align: center;
`

const Header = styled.div`
height: 80px;
width: 100%;
position:fixed;
top: 0;
left:0;
background-color:#06031b;

a {
    text-decoration: none;
    color: #fff;
    width: 160px;
    display:inline-block;
    margin-top: 18px;
    border: 1px solid #fff;
    padding: 12px;
    &:not(:last-child) {
        margin-right: 8px;
    }
}

a:visit {
    text-decoration: none;
}
`

export default BasicLayout