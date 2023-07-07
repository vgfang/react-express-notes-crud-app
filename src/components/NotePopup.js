import React from 'react'
import './NotePopup.css'

class NotePopup extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    edit(e) {
        e.preventDefault()
        let txt = document.getElementsByClassName("NoteContentTextArea")[0];
        // console.log(txt.value)
        if (txt.value === "") {
            alert("Edited entry cannot be saved as empty.")
        } else {
            this.props.editNoteFn(this.props.noteid, txt.value)
            this.props.hide()
        }
    }

    delete(e) {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this note?")) {
            this.props.deleteNoteFn(this.props.noteid)
            this.props.hide()
        }
    }

    onTextChange(e) {
        let txt = document.getElementsByClassName("NoteContentTextArea")[0];
        txt.value = e.target.value;
    }

    render() {
        return (
            <div id={this.props.id} className="NoteboxPopup">
                <button className="NoteXBtn" onClick={this.props.hide}>X</button>
                <button className="NoteDelBtn" onClick={this.delete}>DELETE NOTE</button>
                <button type="submit" className="NoteDelBtn" onClick={this.edit}>SAVE CHANGES</button>
                <br/>
                <span className="date_modified">
                    ID: {this.props.noteid}<br/>
                    Last Modified: {this.props.modified}
                </span>
                <h1>{this.props.label}</h1>
                <p>
                    <textarea className="NoteContentTextArea" defaultValue={this.props.content.join("\n")} key={Math.random()}>
                    </textarea>
                </p>

            </div>
        )
    }
}

export default NotePopup;