import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

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

  render() {
    return (
      <div className="App">
        <RoomList firebase = {firebase} />
      </div>
    );
  }
}

export default App;
