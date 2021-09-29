import React, { Component } from 'react'
import { Card, Col, Container, Modal, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import Calendar from '../../components/Calendar/Calendar'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekendsVisible: true,
            appointment: undefined,
            currentEvents: [],
            hidden: true
        }
    }

    showCardModal = (e) => {
        this.setState({
            ...this.state,
            appointment: e.event,
            hidden: false,
        })
    }
    putCard = (e) => {
        if (this.state.hidden) this.showCardModal(e)
    }
    setHidden = () => {
        console.log("level")
        if (!this.state.hidden) this.setState({ ...this.state, hidden: true })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Bienvenido {this.props.loggedUser.firstName}</h3>
                        {
                            !this.state.hidden && (
                                <>
                                    <Card>
                                        <Card.Body>
                                            {
                                                this.state.appointment &&
                                                <p>{this.state.appointment.title}</p>
                                            }
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }
                    </Col>
                    <Col>
                        <Calendar putCard={this.putCard} setHidden={this.setHidden} showCardModal={this.showCardModal} {...this.props} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Cols</h1>
                    </Col>
                </Row>

            </Container>
        )
    }
}
