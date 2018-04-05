import React, { Component } from 'react';
import './../App.css';

class User extends Component {
  constructor(props){
    super(props)

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);

  }

  logIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  logOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    });
  }

  componentDidMount () {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {
    return(
      <section className="welcome-bar">
      <h3> Welcome, {this.props.currentUser}! </h3>


        <button className="login-button" onClick={this.logIn}>Log In</button>
        <button className="logout-button" onClick={this.logOut}>Log Out</button>
      </section>
    );
  }
}

export default User;
