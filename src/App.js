import React, { Component } from 'react';
import './App.css';

import * as firebase from 'firebase';


import './components/User.css';
import './components/RoomList.css';
import './components/MessageList.css';



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
      
  }
  
  setActiveRoom(room) {
      this.setState({ activeRoom: room })  
  }
  
  setUser(user){
      this.setState({user: user})
      console.log(user);
  }
  
  
render() {
  
  const displayMessages = this.state.activeRoom;
  const activeUser = this.state.user === null ? 'Guest' : this.state.user.displayName;
  
  
  return (
    <div className="App">
      <div className="column-left">
          <nav>
              <h2 className="app-title"> <b>chit</b>chat</h2>
              <User className="greeting" firebase={firebase} setUser={this.setUser.bind(this)} activeUser={activeUser} />
          </nav>
      <aside className="list-rooms">
        <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />
      </aside>
      </div>
      <div className="column-right">
        <main className="active-chatroom">
          <h2>{this.state.activeRoom.name}</h2>
          
          {displayMessages ?

          (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={activeUser}/>)
          : (null)
          }
          
        </main>
      </div>
    </div>
  );
}
}

export default App;