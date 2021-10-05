import React, { Component } from 'react'
// import CardAnimation from '../../components/CardAnimation/CardAnimation'
import UserService from '../../Services/user.service'

export default class UserList extends Component {
    constructor() {
        super()
        this.state = {
            users: undefined
        }
        this.userService = new UserService()
    }

    componentDidMount() {
        this.callUsers()
    }

    callUsers = () => {
        this.userService
            .getUsers()
            .then((users) => {

                this.setState({
                    ...this.state,
                    users: users.data
                })

            })
            .catch()
        console.log(this.state.users)
    }
    render() {
        return (
            <div>
                <h1>Usuarios</h1>
                {
                    // <CardAnimation></CardAnimation>
                    console.log(this.state.users)
                }
            </div>
        )
    }
}
