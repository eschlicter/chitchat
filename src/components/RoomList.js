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

  selectRoom(key){
    this.props.activeRoom(key);
  }

  deleteRoom(roomKey) {
    const room = this.props.firebase.database().ref('rooms' + roomKey);
    room.remove();
    const remainingRooms = this.state.rooms
    .filter(room => room.key !== roomKey);
    this.setState({ rooms: remainingRooms });
  }

  render() {
    return (
      <section className= "room-list">
        <div className= "side-bar-list-names">
          <ul>
            {this.state.rooms.map( (room) => {
            return(
              <div key= {room.key} onClick={(event) => this.selectRoom(room, event)}>{room.name}
              <button className="deleteRoom" onClick={(event) => {event.preventDefault(); this.deleteRoom(room.key)}}> Delete </button>
              </div>
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
