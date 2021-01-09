import { Component } from 'react';
import styled from 'styled-components';

class CoinImageShower extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    setTokenName = (name) => {
        if (name.length > 10) {
            return 'pool'
        } else {
            return name.toLowerCase()
        }

    }

    render() {
        return (
            <CoinImgShower src={`/assets/${this.setTokenName(String(this.props.coin))}.png`} />
        )
    }
}

const CoinImgShower = styled.img`
width: 30px;
height: 30px;
margin-bottom: -8px;
margin-right: 6px;
`

export default CoinImageShower