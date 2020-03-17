import React, { Component } from 'react';
import _ from 'lodash'
import '../App.css';
import { connect } from 'react-redux'
import SearchComponent from '../Search'
import TableComponent from '../Table'
import CreateUser from '../CreateUser'
import { getUsers, updateUserList } from '../Actions'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            addUser: false,
            newUser: {},
            usersData: []
        }
        this.searchUsers = this.searchUsers.bind(this)
        this.createUser = this.createUser.bind(this)
        this.addUser = this.addUser.bind(this)
        this.submitUser = this.submitUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.cancelCreate = this.cancelCreate.bind(this)
    }
    searchUsers = (event) => {
        event.stopPropagation();
        let value = event.target.value
        this.setState({ searchString: value })
    }

    createUser = () => {
        this.setState({ addUser: true, newUser: {} })
    }

    cancelCreate = () => {
        this.setState({ addUser: false })
    }

    addUser = (event) => {
        event.stopPropagation();
        let data = {}
        let firstName = document.getElementById("myInput1").value;
        let lastName = document.getElementById("myInput2").value;
        let standard = document.getElementById("myInput3").value;
        let marks = document.getElementById("myInput4").value;

        data.student_first_name = firstName
        data.student_last_name = lastName
        data.marks = marks
        data.standard = standard
        this.setState({ newUser: data })
    }

    deleteUser = (index) => {
        let userList = _.cloneDeep(this.state.usersData)
        let newList = {}
        newList.data = _.filter(userList.data, (element => element.student_first_name != index.student_first_name))
        this.props.updateUserList(newList.data)
    }

    submitUser = () => {
        let { newUser } = this.state
        let userList = _.cloneDeep(this.state.usersData)
        if (!_.isEmpty(newUser)) {
            userList.data.push(newUser)
            this.props.updateUserList(userList.data)
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }

    componentDidUpdate() {
        const { usersData } = this.props
        if (!_.isEmpty(usersData) && !_.isEqual(usersData.data, this.state.usersData.data)) {
            this.setState({ usersData: usersData, addUser: false })
            console.log('called..')
        }
    }
    render() {
        // let {usersData} = this.props
        let { searchString, addUser, newUser, usersData } = this.state
        return (
            <div style={{ marginTop: '30px' }}>
                {_.isEqual(addUser, false) &&
                    <SearchComponent
                        searchUsers={this.searchUsers}
                        searchString={searchString}
                        createUser={this.createUser}
                        cancelCreate={this.cancelCreate}
                    />
                }
                {!_.isEmpty(usersData) && _.isEqual(addUser, false) ?
                    <TableComponent
                        usersData={usersData}
                        searchString={searchString}
                        deleteUser={this.deleteUser}
                    />
                    : _.isEqual(addUser, true) ?
                        <CreateUser
                            newUser={newUser}
                            addUser={this.addUser}
                            submitUser={this.submitUser}
                            cancelCreate={this.cancelCreate} />
                        : ('')
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => { return { usersData: state } }

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            dispatch(getUsers())
        },
        updateUserList: (data) => {
            dispatch(updateUserList(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);