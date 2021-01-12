import { Component } from 'react';
import { ArrowButton } from "../design/elements/ChangeButton"

class ChangeButton extends Component {
    render() {
        return (
            <ArrowButton onClick={this.props.func}>⬇</ArrowButton>
        )
    }
}

export default ChangeButton