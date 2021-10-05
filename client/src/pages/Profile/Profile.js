import React, { Component } from 'react'
import { Button, Card, Col, Container, Row, Accordion } from 'react-bootstrap'
import Calendar from '../../components/Calendar/Calendar'
import AppointmentService from '../../Services/appointment.service'
import { isToday } from '../../utils/calendar.utils'
import AppointmentCardHover from './AppointmentCardHover'
import CardProfile from '../../components/CardProfile/CardProfile'
import AccordionList from '../../components/Accordion/AccordionList'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekendsVisible: true,
            isShowAprovedAppointment: false,
            appointment: undefined,
            allAppointments: null,
            currentEvents: [],
            hidden: true,
            isCopied: false,
        }
    }

    appointmentService = new AppointmentService()

    componentDidMount() {
        this.updateAppointments()
    }
    updateAppointments = () => {
        this.appointmentService
            .getUserAppointments(this.props.loggedUser?._id || this.props.match.params.id)
            .then((res) => {
                this.setState({
                    ...this.state,
                    allAppointments: res?.data
                })
            })
            .catch(error => console.log(error))
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
        if (!this.state.hidden) this.setState({ ...this.state, hidden: true })
    }

    loadEvents = () => {
        let event = []
        this.state.allAppointments?.map((appointment) => {
            return event.push({ title: `${this.props.loggedUser ? appointment.name : "*****"}`, date: `${appointment.date}`, description: `${appointment.description}`, photos: `${appointment.photos}`, startHour: appointment.startHour, endHour: appointment.endHour })
        })
        return event
    }

    okAppointment = () => {
        this.setState({
            ...this.state,
            isShowAprovedAppointment: true
        })

        if (this.state.isShowAprovedAppointment) {
            console.log("ok")
        }
        console.log(this.state.isShowAprovedAppointment)
    }

    render() {
        return (
            <Container className="mt-4">
                <Row >
                    <Col md={6}>
                        {this.props.loggedUser &&
                            <Row>
                                <Col>
                                    <CardProfile loggedUser={this.props.loggedUser} />

                                </Col>
                            </Row>
                        }
                        <Card className="container-card">
                            {
                                this.props.loggedUser &&
                                <Card.Body>
                                    <>
                                        <p>Eventos del día</p>
                                        {
                                            this.state?.allAppointments &&
                                            <Accordion>
                                                {
                                                    this.state.allAppointments.map((appointment) => {
                                                        return (isToday(appointment.date)) &&
                                                            <div key={appointment._id}>
                                                                <AccordionList appointment={appointment} okAppointment={this.okAppointment} />
                                                            </div>
                                                    }
                                                    )
                                                }
                                            </Accordion>
                                        }
                                    </>
                                </Card.Body>
                            }
                        </Card>
                        {!this.state.hidden &&
                            <AppointmentCardHover appointment={this.state.appointment} />}
                    </Col>
                    <Col md={6}>
                        <Calendar
                            events={this.loadEvents()}
                            putCard={this.putCard}
                            setHidden={this.setHidden}
                            closeModal={this.closeModal}
                            showCardModal={this.showCardModal}
                            updateAppointments={this.updateAppointments}
                            {...this.props}
                        />
                    </Col>
                </Row>
                <Row>
                    {/* <Col>
                        <h1>Cols</h1>
                    </Col> */}
                </Row>
            </Container>
        )
    }
}
