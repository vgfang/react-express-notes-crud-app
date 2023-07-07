import React from 'react'
import './Notelist.css'
import NotelistLink from '../components/NotelistLink.js'
import NotePopup from '../components/NotePopup.js'

class Notelist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: {
                nodeid: -1,
                popupContent: ["default"],
                popupModified: new Date().toString()
            }
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        console.log("here")
    }

    hide() {
        let element = document.getElementById("popup")
        element.style.display = "none"
    }

    show(idx) {
        console.log("show")
        console.log([this.props.notes[idx].label, ...this.props.notes[idx].content])
        let element = document.getElementById("popup")
        element.style.display = "block"
        
        const newPopup = {
            noteid: this.props.notes[idx].id,
            popupContent: [this.props.notes[idx].label, ...this.props.notes[idx].content],
            popupModified: new Date(this.props.notes[idx].modified.replace(' ', 'T')).toString()
        }
        
        this.setState({
            popup: newPopup
        }, ()=>{
            console.log(this.state)
        })
        
    }

    render() {
        return (
            <div className='NoteList'>
                <h1>{this.props.title}</h1>
                <ul>
                    {this.props.notes.map((d, idx) => {
                        return (
                            <NotelistLink
                                key={idx}
                                label={d.label}
                                openPopup={() => {this.show(idx)}}    
                            />)
                    })}
                </ul>
                <NotePopup 
                    id="popup"
                    noteid={this.state.popup.noteid}
                    content={this.state.popup.popupContent}
                    modified={this.state.popup.popupModified}
                    hide={this.hide}
                    deleteNoteFn={this.props.deleteNoteFn}
                    editNoteFn={this.props.editNoteFn}
                />
            </div>
        )
    }
}

export default Notelist;