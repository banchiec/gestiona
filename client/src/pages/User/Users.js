import React, { Component } from 'react'
// import CardAnimation from '../../components/CardAnimation/CardAnimation'
import UserService from '../../Services/user.service'
import UserItem from './UserItem'
import { Container, Row } from 'react-bootstrap'

export default class Users extends Component {
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
                    users: users?.data
                })

            })
            .catch()
        console.log(this.state?.users)
    }
    render() {
        return (
            <Container className="container-users mt-5">
                <h1 className="display-5">Usuarios</h1>
                <Row className="mt-5">
                    {
                        this.state.users?.map((user) => {
                            { console.log(user) }
                            return (<UserItem user={user} />)
                        })
                    }
                </Row>
            </Container>
        )
    }
}
