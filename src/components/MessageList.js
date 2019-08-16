import React, { Component } from 'react';
import './../App.css';

class MessageList extends Component {
    constructor(props) {
    super(props)
        
        this.state = {
            messages: [],
            username: '',
            sentAt: '',
            content: '',
            roomId: '',
        };
        
        
        this.messagesRef = this.props.firebase.database().ref('messages');
      
    };
    
        componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
                messages: this.state.messages.concat(message),
            })
        });
            this.scrollToBottom();
            
        }
    
        componentDidUpdate() {
            this.scrollToBottom();
        }
    
        scrollToBottom = () => {
            this.messagesEnd.scrollIntoView({behavior: "smooth"});
        }
            
        handleChange(e){
            this.setState({
                username: this.props.user,
                content: e.target.value,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                roomId: this.props.activeRoom});
            
        }

        handleSubmit(e){
            e.preventDefault();
            if (!this.state.content) {return}
        }
    
        
        deleteMessage(messageKey) {
            console.log('trying to delete message', messageKey)
            const message = this.props.firebase.database().ref('messages' + messageKey);
            message.remove()
            const remainMessages= this.state.messages
            .filter(message => message.key !== messageKey);
            this.setState({ messages: remainMessages});
        }
            
        
        createMessage(e){
            e.preventDefault();
            this.messagesRef.push({
                username: this.state.username,
                sentAt: this.state.sentAt,
                roomId: this.props.activeRoom,
                content: this.state.content,
            
            });
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
        const messageList = this.state.messages.filter(message => message.roomId === activeRoom).map(message => {
            return <div className="message-container">
                <div className="chat-bubble">

                        <button type="button" class="close" aria-label="Close" button id="deleteMessage" onClick={() => this.deleteMessage(message.key)}>
                             <span aria-hidden="true">&times;</span>
                        </button>
                            <div className="current-message" key={message.key}>{message.content}
            
                    <p className="username">{message.username}</p>
                    <p className="wasDate">{this.formatTime(message.sentAt)}</p>
                </div>
            </div>
                    
            </div>
        })
       
        return (
                <div className="chatroom-messages">
                    <div>{messageList}
                    </div>
                    <form id="message-input" onSubmit={(e) => this.handleSubmit(e)}>
            
                        <input type="text" name="newmessage" placeholder="Write your message here..." value={this.state.content} 
                        onChange={(e) => this.handleChange(e)} />
                
                        <button id="ios-send" type="submit" onClick={(e) => this.createMessage(e)}>SEND</button>
                        </form>

                    <div style={{ float: "left", clear: "both" }}
                    ref={(el) => {this.messagesEnd = el; }}></div>
                    </div>  
        );

    }
}

export default MessageList;