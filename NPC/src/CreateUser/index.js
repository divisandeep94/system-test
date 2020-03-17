import React, { Component } from 'react';
import '../App.css';

class CreateUser extends Component {

    render() {
        let { newUser, addUser, submitUser, cancelCreate } = this.props
        return (
            <div>
                <header className="App-header">
                    <input type="text" id="myInput1" className="text-input-create"
                        placeholder='Enter FirstName' value={newUser.firstName} onChange={e => { addUser(e) }}
                    />
                    <input type="text" id="myInput2" className="text-input-create"
                        placeholder='Enter LastName' value={newUser.lastName} onChange={e => { addUser(e) }}
                    />
                    <input type="text" id="myInput3" className="text-input-create"
                        placeholder='Enter Standard' value={newUser.standard} onChange={e => { addUser(e) }}
                    />
                    <input type="text" id="myInput4" className="text-input-create"
                        placeholder='Enter Marks' value={newUser.marks} onChange={e => { addUser(e) }}
                    />
                    <button id="submit" className="submit-user-class" onClick={submitUser}>Submit</button>
                    <button id="submit" className="cancel-user-class" onClick={cancelCreate}>Cancel</button>
                </header>
            </div>
        );
    }
}

export default CreateUser;