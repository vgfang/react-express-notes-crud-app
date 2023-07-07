import { Component } from 'react';
import axios from "axios";
import './App.css';
import NoteBox from './components/Notebox.js'
import NoteList from './components/Notelist.js'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.serverPort = 3000;
    let initialNotesState = []
    
    // load from local storage if available
    // const localStorageNotes = JSON.parse(localStorage.getItem('notes'));
    // if (localStorageNotes != null) {
    //   // console.log("loaded")
    //   console.log(localStorageNotes)
    //   initialNotesState = localStorageNotes
    // }
    
    this.state = {
      notes: initialNotesState
    };
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote(input) {
    if (input.length === 0) {
      return
    }  
    var test = (e) => {
      axios.post(`http://localhost:${this.serverPort}/add`,{
        content: input,
      }).then(
        res => {
          this.callAPI(this.serverPort);
        }
      )
    }
    test();
  }

  editNote(noteid, content) {
    console.log("editing")
    var editFn = (e) => {
      axios.post(`http://localhost:${this.serverPort}/edit`,{
        noteid: noteid,
        content: content
      }).then(
        res => {
          this.callAPI(this.serverPort);
        }
      )
    }
    editFn();
  }

  deleteNote(noteid) {
    var deleteFn = (e) => {
      axios.post(`http://localhost:${this.serverPort}/delete`,{
        noteid: noteid,
      }).then(
        res => {
          this.callAPI(this.serverPort);
        }
      )
    }
    deleteFn();
  }
  
  convert_to_label_content(strList) {
    // console.log(strList)
    let newArray = []
    strList.forEach(element => {
      let tempList = element['content'].split("\n");
      newArray.push({
        id: element['id'],
        label: tempList[0],
        content: tempList.slice(1),
        modified: element.modified
      })
    });
    // console.log(newArray)
    return newArray;
  }

  callAPI(port) {
    fetch(`http://localhost:${port}/notes`)
      .then((res) => res.json())
      .then((data) => {this.setState({"notes": this.convert_to_label_content(data.notes)});})
  }

  componentDidMount() {
    this.callAPI(this.serverPort);
  }

  render() { 
    return (
      <div className="App">
        <NoteBox title="ADD NOTES:" addNoteFn={this.addNote}/>
        <NoteList notes={this.state.notes} deleteNoteFn={this.deleteNote} editNoteFn={this.editNote} title="SAVED NOTES:" />
      </div>
    )
  }
}

export default App;
