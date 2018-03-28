import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyDeCY1DzCAgHekf22zwNleeNzC_xBGXmLs",
   authDomain: "eschlicter-bloc-chat.firebaseapp.com",
   databaseURL: "https://eschlicter-bloc-chat.firebaseio.com",
   projectId: "eschlicter-bloc-chat",
   storageBucket: "eschlicter-bloc-chat.appspot.com",
   messagingSenderId: "214952863034"
 };
 firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      activeRoom: '',
    };
  }
  activeRoom(room) {
    this.setState({ activeRoom: room })
}
  render() {
    const displayMessages = this.state.activeRoom.content;

    return (
      <div className="App">
      <aside className="list-chat-rooms">
        <RoomList firebase ={firebase} activeRoom ={this.activeRoom.bind(this)} />
      </aside>
      <h3 className="active-chat-room">{this.state.activeRoom.name}
      </h3>

      { displayMessages ?

        <MessageList firebase = {firebase} activeRoom={this.state.activeRoom.key} /> : (null)
      }
      </div>
    );
  }
}

export default App;
