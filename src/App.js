import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js'

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
      user: null
    };
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  activeRoom(room) {
    this.setState({ activeRoom: room })
}
  setUser(user) {
    this.setState({ user: user })

  }
  render() {
    const displayMessages = this.state.activeRoom;

    const currentUser = this.state.user === null ? 'Guest' : this.state.user.displayName;

    return (
      <div className="App">


      <User firebase={firebase} setUser={this.setUser} currentUser={currentUser} />

      <aside className="list-chat-rooms">
        <RoomList firebase ={firebase} activeRoom ={this.activeRoom} />
      </aside>
      <div className="main-section">

      <h1 className="active-chat-room">{this.state.activeRoom.name}
      </h1>

      { displayMessages ?
        <MessageList firebase = {firebase} activeRoom={this.state.activeRoom.key} user={currentUser}/> : (null)
      }
      </div>
      </div>
    );
  }
}

export default App;
