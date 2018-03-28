import React, { Component } from 'react';
import './../App.css';

class RoomList extends Component {
  constructor (props) {
    super (props)

    this.state = {
      rooms: [],
      newRoomName: '',
      name: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  };

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleChange(event) {
    this.setState({ newRoomName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.newRoomName) { return }
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

  selectRoom(room){
    this.props.activeRoom(room);
  }

  render() {
    return (
      <section className= "room-list">
        <div className= "side-bar-list-names">
          <ul>
            {this.state.rooms.map( (room, index) => {
            return(
              <div key= {room.key} onClick={(event) => this.selectRoom(room, event)}>{room.name}</div>
            )
            })}

          <form onSubmit={(event) => this.handleSubmit(event)}>
            <input type="text" name="newroom" placeholder="New Room" value={this.state.newRoom} onChange={(event) => this.handleChange(event)} />
            <button type="submit" onClick={() => this.createRoom()}> Add Room </button>
          </form>
        </ul>
        </div>
      </section>
    );
  }
}

export default RoomList;
