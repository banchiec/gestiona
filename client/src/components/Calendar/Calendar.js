import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import iteractionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            appointment: undefined,
            appointmentDate: ''


        }
    }
    showModal = (e) => {
        console.log(typeof (e.start))
        this.setState({
            ...this.state,
            showModal: !this.state.showModal,
            appointmentDate: e.start
        })
        console.log(this.state.appointmentDate)
    }
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <FullCalendar
                            plugins={[dayGridPlugin,
                                iteractionPlugin,
                                timeGridPlugin
                            ]}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            select={(info) => this.showModal(info)}
                            events={[
                                { title: 'cumpleaños de Luque', date: '2021-10-01' },
                                { title: 'cumpleaños de Maria', date: '2021-10-01' },
                                { title: 'cumpleaños de Fred', date: '2021-10-02' },
                            ]}
                            eventMouseEnter={(e) => {
                                this.props.putCard(e)
                            }
                            }
                            eventMouseLeave={() => {
                                this.props.setHidden()
                            }}
                        >
                        </FullCalendar>
                    </Col>

                </Row >
                <Modal show={this.state.showModal} hidden={false} className="" >
                    <Container className="p-4">
                        <Form>
                            <h3>Reserva tu cita</h3>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>Nombre:</Form.Label> */}
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Container>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.showModal}>Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}