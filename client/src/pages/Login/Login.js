import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import AuthService from '../../Services/auth.service'
import userLogin from '../../images/loginUser.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      pwd: ""
    }
    this.authService = new AuthService()
  }

  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, pwd } = this.state

    this.authService.login(username, pwd)
      .then(res => {
        this.props.storeUser(res.data)
        this.props.history.push("/")
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Container className="container-login d-flex justify-content-center">
          <Row>
            <Col>
              <Form onSubmit={this.handleFormSubmit}>
                <img src={userLogin} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username" value={this.state.username} onChange={this.handleInput} type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="pwd" value={this.state.pwd} onChange={this.handleInput} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Iniciar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Login