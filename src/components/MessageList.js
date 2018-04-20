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
    event.preventDefault()
    if (!this.state.content) {return};
    this.setState({
      content: ''
    });
  }

  createNewMessage(event) {
    this.messagesRef.push({
      username: this.state.username,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId,
      content: this.state.content
    });
  }

  deleteMessage(messageKey) {
    const message = this.props.firebase.database().ref('messages' + messageKey);
    message.remove()
    const remainingMessages= this.state.messages
    .filter(message => message.key !== messageKey);
    this.setState({ messages: remainingMessages });
  }

  formatTime(sentAt){
  // eslint-disable-next-line
  var numberTime = parseInt(sentAt)
  var time = new Date (numberTime)
  var yyyy = time.getFullYear()
  var mm = ('0' + (time.getMonth() +1)).slice(-2);
  var dd = ('0' + time.getDate()).slice(-2);
  var hh = time.getHours();
  var h = hh;
  var min = ('0' + time.getMinutes()).slice(-2);
  var ampm = 'AM'

  if (hh > 12) {
    h = hh - 12;
    ampm = 'PM'
  } else if (hh === 12){
    h = 12;
    ampm = 'PM';
  } else if (hh === 0) {
    h = 12;
  }
  var newTime = mm + '/' + dd + '/' + yyyy + ', ' + h + ':' + min + ampm + "  ";
  return newTime;

}
  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages
    .filter(message => message.roomId === activeRoom)
    .map(message => {
      return <div className="current-chat-message" key={message.key}>{this.formatTime(message.sentAt)}{message.username}: {message.content}
      <button className="deleteMessage" onClick={() => this.deleteMessage(message.key)}>Delete</button>
      </div>
    })

    return(
  <div className="chatroom-messages">
    <span>{messageList}</span>

    <form className="message-submit-form" onSubmit={(event) => this.handleSubmit(event)} >

      <input type="text" value={this.state.content} name="createNewMessage" placeholder="New Message" onChange={(event) => this.handleChange(event)} />

      <button className="send-button" type="submit" onClick={(event) => this.createNewMessage(event)}>Send</button>

    </form>
  </div>
    );
  }
}

export default MessageList;
