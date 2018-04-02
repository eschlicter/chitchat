import React, { Component } from 'react';
import './../App.css';

class MessageList extends Component {
  constructor(props) {
    super (props)

    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: '',
    };

  this.messagesRef = this.props.firebase.database().ref('messages');
};

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message )});
    });
  }
  handleChange(event) {
    this.setState({
      username: this.props.user,
      content: event.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }
  handleSubmit(event){
    event.preventDefault();
    if (!this.state.content) {return}
  }

  createNewMessage(event) {
    event.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId,
      content: this.state.content
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages
    .filter(message => message.roomId === activeRoom)
    .map(message => {
      return <div className="current-chat-message" key={message.key}>{message.sentAt}{message.username}: {message.content}</div>
    })

    return(
  <div className="chatroom-messages">
    <div>{messageList}</div>

    <form onSubmit={(event) => this.handleSubmit(event)}>
      <input type="text" value={this.state.content} name="createNewMessage" placeholder="New Message" onChange={(event) => this.handleChange(event)} />
      <button className="send-button" type="submit" onClick={(event) => this.createNewMessage(event)}>Send</button>
    </form>
  </div>
    );
  }
}

export default MessageList;
