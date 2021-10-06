import React, { Component } from 'react'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import AuthService from '../../Services/auth.service'
import UploadsService from '../../Services/uploads.service'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            pwd: "",
            photo_profile: "",
            appointment: ""
        }
        this.authService = new AuthService()

    }

    uploadServices = new UploadsService()

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, username, pwd, photo_profile } = this.state
        console.log(this.state)
        this.authService.signup(firstName, lastName, email, username, pwd, photo_profile)
            .then(res => this.props.history.push("/"))
            .catch(err => console.log(err))
    }
    handleFile = (e) => {
        this.setState({
            ...this.state,
            isLoading: true
        })

        const uploadData = new FormData()
        uploadData.append('photos', e.target.files[0])
        console.log(e.target.files[0].name)
        console.log(uploadData)
        this.uploadServices.uploadImg(uploadData)
            .then(res => {
                console.log(res)
                this.setState({
                    ...this.state,
                    isLoading: false,
                    photo_profile: res.data.cloudinary_url
                })
            })
            .catch(error => alert("Error, esto no carga"))
    }

    render() {
        return (
            <Container className=" container-signup ">
                <Row>
                    <Col>

                        <Form onSubmit={this.handleFormSubmit}>
                            <h1 className="mb-4">Registrate</h1>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                {/* <Form.Label>Nombre:</Form.Label> */}
                                <Form.Control name="firstName" value={this.state.firstName} onChange={this.handleInput} type="text" placeholder="Nombre" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                {/* <Form.Label>Apellidos</Form.Label> */}
                                <Form.Control name="lastName" value={this.state.lastName} onChange={this.handleInput} type="text" placeholder="Apellidos" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                {/* <Form.Label>Email</Form.Label> */}
                                <Form.Control name="email" value={this.state.email} onChange={this.handleInput} type="email" placeholder="Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formUsername">
                                {/* <Form.Label>Username</Form.Label> */}
                                <Form.Control name="username" value={this.state.username} onChange={this.handleInput} type="text" placeholder="Username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control name="pwd" value={this.state.pwd} onChange={this.handleInput} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhotoProfile">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control name="photo_profile" onChange={(e) => this.handleFile(e)} type="file" placeholder="Foto de perfil" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup