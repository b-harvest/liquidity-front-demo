
import { Component } from 'react';
import '../../design/elements/animations/DotLoader.css'

class DotLoader extends Component {
    render() {
        return (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default DotLoader

