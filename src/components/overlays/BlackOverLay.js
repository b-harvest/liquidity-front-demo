import { Component } from 'react';
import { OverLay } from "../../design/components/overlays/BlackOverLay"

class BlackOverLay extends Component {
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

export default BlackOverLay
