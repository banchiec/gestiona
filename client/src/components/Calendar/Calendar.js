import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import { Col, Container, Form, FormCheck, Modal, Row } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'
import UploadsService from '../../Services/uploads.service'
// import Appointment from '../../../../server/models/Appointment.model'

import { Elements } from '@stripe/react-stripe-js'

import AppointmentService from '../../Services/appointment.service'
import UserService from '../../Services/user.service'
import { getIdUrl } from '../../utils/calendar.utils'
import MailingService from '../../Services/mailing.service'
import PayForm from '../PayForm/PayForm'


export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idUser: this.props.loggedUser?._id,
            // showModal: false,
            // appointment: undefined,
            dateLabel: undefined,
            endDateLabel: undefined,
            startDateLabel: undefined,
            appointments: undefined,
            appointmentDate: '',
            name: '',
            email: '',
            phone: '',
            date: new Date(),
            description: '',
            photos: '',
            startHour: '',
            endHour: '',
            isAproved: false,
            currentView: "dayGridMonth"
        }
    }


    uploadServices = new UploadsService()
    appointmentServices = new AppointmentService()
    userService = new UserService()
    mailingService = new MailingService()
    datesUserPublic = undefined
    calendarRef = React.createRef()


    componentDidMount = () => {
        this.currentUser()
        this.props.updateAppointments()
    }

    changeView = (e) => {
        return this.setState({ currentView: "timeGridDay" }, () => {
            const calendarObj = this.calendarRef.current.getApi()
            calendarObj.changeView("timeGridDay")
            calendarObj.gotoDate(e.start)
        })
    }

    currentUser = () => {
        this.props.loggedUser ?
            this.setState({
                ...this.state,
                idUser: this.props.loggedUser._id
            })
            : this.setState({
                ...this.state,
                idUser: getIdUrl()
            })
    }

    onSelect = (e) => {
        this.setState({
            ...this.state,
            endDateLabel: `${e?.end.getHours()}: ${e?.end.getMinutes()}`,
            startDateLabel: `${e?.start.getHours()}:${e?.start.getMinutes()}`,
            dateLabel: `${e?.start.getDate()}/${e?.start.getMonth()}/${e?.start.getFullYear()}`
        })
        const todayDate = new Date()
        todayDate.setHours(0, 0, 0, 0)

        const isSameTime = this.props.events.some((appointment) => {
            const appoinmentStartTime = new Date(appointment.startHour).getTime()
            const appoinmentEndTime = new Date(appointment.endHour).getTime()
            const startTime = new Date(e.start).getTime()
            const endTime = new Date(e.end).getTime()

            return endTime > appoinmentStartTime && endTime < appoinmentEndTime ||
                startTime > appoinmentStartTime && startTime < appoinmentEndTime ||
                startTime < appoinmentStartTime && endTime > appoinmentEndTime

        })

        if (e.start.getTime() < todayDate.getTime()) {
            alert("No se puede realizar citas en fechas pasadas")
        } else {
            if (this.state.currentView === "timeGridDay") {
                if (isSameTime === false)
                    this.showModal(e)
            }
            this.changeView(e)
        }
    }

    showModal = (e) => {
        this.setState({
            ...this.state,
            showModal: !this.state.showModal,
            appointmentDate: e,
            date: e?.start,
            startHour: e?.start,
            endHour: e?.end
        })
    }

    handleFile = (e) => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        const uploadData = new FormData()
        uploadData.append('photos', e.target.files[0])
        this.uploadServices.uploadImg(uploadData)
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    photos: res.data.cloudinary_url
                })
            })
            .catch(error => alert("Error, esto no carga"))
    }

    onChange = (e) => {
        const { value, name } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    isAprovedAppointment = (e) => {
        let name = this.state?.name
        let to = this.state?.email
        console.log("Question")
        this.mailingService.sendMail(name, to)
            .then((res) => {
                console.log(res)
            })
            .catch(error => console.log(error))
    }

    handleSubmit = (e) => {
        e.preventDefault(e);
        this.isAprovedAppointment()
        console.log(this.state)
        this.appointmentServices.createAppointment(this.state)
            .then((res) => {
                this.showModal(e);
                console.log(this.props.idUser)
                this.props.updateAppointments()
                this.setState({
                    title: "",
                    description: "",
                    imageUrl: "",
                    inversions: 0,
                    length: 0
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <FullCalendar
                            ref={this.calendarRef}
                            plugins={[
                                interactionPlugin,
                                dayGridPlugin,
                                bootstrapPlugin,
                                timeGridPlugin
                            ]}

                            headerToolbar={{
                                left: 'prev,next',
                                center: 'title',
                                right: 'dayGridMonth',
                            }}
                            initialView='dayGridMonth'
                            themeSystem={'bootstrap'}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={(info) => this.onSelect(info)}
                            events={this.props.events}
                            eventMouseEnter={(e) => {
                                this.props.putCard(e)
                            }
                            }
                            viewDidMount={(e) => this.setState({ currentView: e.view.type })}
                            eventMouseLeave={() => {
                                this.props.setHidden()
                            }}
                            businessHours={
                                true
                            }
                            dayMaxEventRows={[1, 2, 3, 4, 5, 6, 7, 8]}
                        >
                        </FullCalendar>
                    </Col>

                </Row >
                <Modal className="container-modal" show={this.state.showModal} hidden={false} >
                    <Container className="container-form p-4">
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit} >
                                    <h3>Reserva tu cita</h3>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        {/* <Form.Label>Nombre:</Form.Label> */}
                                        <Form.Control onChange={(e) => this.onChange(e)} value={this.state.name} name="name" type="text" placeholder="Nombre" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        {/* <Form.Label>Email address</Form.Label> */}
                                        <Form.Control onChange={(e) => this.onChange(e)} value={this.state.email} name="email" type="email" placeholder="Email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        {/* <Form.Label>Password</Form.Label> */}
                                        <Form.Control onChange={(e) => this.onChange(e)} value={this.state.phone} name="phone" type="text" placeholder="Telefono" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>{`fecha: ${this.state.dateLabel}`}</Form.Label>
                                        <Form.Control hidden={true} onChange={(e) => this.onChange(e)} value={this.state?.date} name="data" type="text" placeholder="Fecha" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>{`Hora de inicio: ${this.state.startDateLabel} `}</Form.Label>
                                        <Form.Control hidden={true} onChange={(e) => this.onChange(e)} value={this.state?.startHour} name="startHour" type="text" placeholder="Fecha" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>{`Hora de fin: ${this.state.endDateLabel}`}</Form.Label>
                                        <Form.Control hidden={true} onChange={(e) => this.onChange(e)} value={this.state?.endHour} name="endHour" type="text" placeholder="Fecha" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        {/* <Form.Label>Example textarea</Form.Label> */}
                                        <Form.Control onChange={(e) => this.onChange(e)} as="textarea" name="description" value={this.state?.description} placeholder="Descripci??n" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        {/* <Form.Label>Example textarea</Form.Label> */}
                                        <Form.Control onChange={(e) => this.handleFile(e)} type="file" name="photo" rows={3} placeholder="subir foto" />
                                    </Form.Group>


                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                            <Col>
                                <PayForm />
                            </Col>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.showModal}>Close</Button>
                            </Modal.Footer>
                        </Row>
                    </Container>
                </Modal>
            </>
        )
    }
}