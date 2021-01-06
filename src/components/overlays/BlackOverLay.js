import styled from 'styled-components';
import { Component } from 'react';


class BlackOverLay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolData: null,
            updatePool: null,
        };
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }



    render() {
        return (
            <>
                <OverLay onClick={this.props.modalHandler}>
                    {this.props.children}
                </OverLay>
            </>
        )
    }
}




const OverLay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000094;
`


export default BlackOverLay
