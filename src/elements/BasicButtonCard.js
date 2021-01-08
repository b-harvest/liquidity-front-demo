import { Component } from 'react';
import DotLoader from './animations/DotLoader'
import styled from 'styled-components';

class BasicButtonCard extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }

    }


    render() {
        return (
            <>
                <Card>
                    {this.props.children}
                    <Button onClick={this.props.function} style={this.props.isLoading ? { pointerEvents: "none" } : {}}>
                        {this.props.isLoading ? <DotLoader /> : this.props.buttonName ? this.props.buttonName : "Button"}
                    </Button>
                </Card>
            </>
        )
    }
}

const Card = styled.div`
border-radius: 8px;
background-color:#eef5ff;
padding: 20px;
margin-top: 30px;
`


const Button = styled.div`
    margin: 20px auto 0 auto;
    display:inline-block;
    padding: 0 40px;
    border-radius:24px;
    cursor:pointer;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    color: #fff;
    background-color: #4297ff;
    transition: opacity 0.3s;
    &:hover {
        opacity: 0.7;
    }
`


export default BasicButtonCard