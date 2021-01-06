
import { Component } from 'react';
import './DotLoader.css'
class DotLoader extends Component {
    render() {
        return (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default DotLoader

