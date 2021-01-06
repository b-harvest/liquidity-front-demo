import styled from 'styled-components';
import { Component } from 'react';
import BlackOverLay from '../overlays/BlackOverLay'


class CreatePoolModal extends Component {
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
                <BlackOverLay modalHandler={this.props.modalHandler} />
                <Modal >
                </Modal>
            </>
        )
    }
}




const Modal = styled.div`
    position:absolute;
    width: 500px;
    height: 600px;
    background-color:#fff;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 8px;
`


export default CreatePoolModal
