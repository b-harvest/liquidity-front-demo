import { Component } from 'react';
import styled from 'styled-components';

class BasicLayout extends Component {

    render() {
        return (
            <Layout>
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

export default BasicLayout