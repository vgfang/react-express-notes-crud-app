import React from 'react'
import './Notebox.css'

class Notebox extends React.Component {

    constructor(props) {
        super(props);
        this.addNoteFnInput = this.addNoteFnInput.bind(this);
    }

    addNoteFnInput() {
        let ti = document.getElementById("textInput");
        let val = ""
        if (ti) {
            val = ti.value
            this.props.addNoteFn(val)
            ti.value = ""
        }
    }

    render() {
        return (
            <div className="Notebox">
                <h1>{this.props.title}</h1>
                <textarea id="textInput">
                </textarea>
                <button onClick={this.addNoteFnInput}>SAVE NOTE</button>            
            </div>
        )
    }
}

export default Notebox;