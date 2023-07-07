import React from 'react'
import './NotelistLink.css'

class NotelistLink extends React.Component {
    constructor(props) {
        super(props);
        this.clicked = this.clicked.bind(this);
    }

    clicked(e) {
        e.preventDefault()
        // this.props.openPopup(0);
    }

    render() {
        return (
            <li onClick={this.props.openPopup}>
                {this.props.label}
            </li>
        )
    }
}

export default NotelistLink;