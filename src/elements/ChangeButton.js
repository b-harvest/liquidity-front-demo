import { Component } from 'react';
import styled from 'styled-components';

class ChangeButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <ArrowButton onClick={this.props.func}>⬇</ArrowButton>
        )
    }
}

const ArrowButton = styled.button`
outline:none;
background-color:#fff;
border: none;
font-size: 20px;
margin: 10px 0;
cursor:pointer;
`

export default ChangeButton