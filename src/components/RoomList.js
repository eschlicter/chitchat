import React, { Component } from 'react';
import './../App.css';



class RoomList extends Component {
    constructor (props) {
        super(props)
        
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

    handleChange(e) {
        this.setState({ newRoomName: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
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
            console.log('trying to delete room', roomKey)
            const room = this.props.firebase.database().ref('rooms' + roomKey);
            room.remove()
            const remainRooms= this.state.rooms
            .filter(room => room.key !== roomKey);
            this.setState({ rooms: remainRooms});
        }
        
        render() {
            return (
                <section className= "room-list">
                <p id="chatroom-title"> YOUR CHATS </p>
                    <div className= "list-names">
                            {this.state.rooms.map( (room) => {
                            return (
                                <div key={room.key} onClick={(e) => this.selectRoom(room, e)}>{room.name}
                                <button id="deleteRoom" onClick={() => this.deleteRoom(room.key)}>[x]</button>
                                </div> 
                            )
                            })}
                            </div>
                    <div className="create-room-text">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input type="text" name="newroom" placeholder="Create New Room..." value={this.state.newRoom} onChange={(e) => this.handleChange(e)} />
                            <button type="submit" onClick={() => this.createRoom()}>CREATE</button>
                        </form>
                    </div>
                </section>
        );
        }

    }


export default RoomList;