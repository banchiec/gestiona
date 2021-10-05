import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'
import UploadsService from '../../Services/uploads.service'
// import Appointment from '../../../../server/models/Appointment.model'

import AppointmentService from '../../Services/appointment.service'
import UserService from '../../Services/user.service'
import { getIdUrl } from '../../utils/calendar.utils'
import MailingService from '../../Services/mailing.service'

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
        console.log(e)
        this.setState({
            ...this.state,
            endDateLabel: `${e?.end.getHours()}: ${e?.end.getMinutes()}`,
            startDateLabel: `${e?.start.getHours()}:${e?.start.getMinutes()}`,
            dateLabel: `${e?.start.getDate()}/${e?.start.getMonth()}/${e?.start.getFullYear()}`
        })
        const todayDate = new Date()
        todayDate.setHours(0, 0, 0, 0)

        this.appointmentServices.getAppointments()
            .then((res) => {
                this.setState({
                    ...this.state,
                    appointments: res.data
                })
                // console.log(this.state.appointments)
            })
            .catch(error => console.log(error))
        //FALTA IMPLEMENTAR LA FUNCIONALIDAD DE EVENTOS REPETIDOS
        // console.log(this.state?.appointments)
        // this.state.appointments.some((appointment) => { appointment.date > e.start })
        if (e.start.getTime() < todayDate.getTime()) {
            alert("No se puede realizar citas en fechas pasadas")
        } else {
            if (this.state.currentView === "timeGridDay") {
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
                // this.props.updateAppointment();
                // this.userService.updateUser(this.props.loggedUser._id,)
                console.log(this.props.idUser)
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
                        {
                            // console.log(this.state.idUser)
                        }
                        <FullCalendar
                            ref={this.calendarRef}
                            plugins={[
                                interactionPlugin,
                                dayGridPlugin,
                                bootstrapPlugin,
                                timeGridPlugin
                            ]}

                            headerToolbar={{
                                left: 'prev,next today',
                                // center: '',
                                right: 'dayGridMonth',
                            }}
                            // eventStartEditable={true}
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
                <Modal show={this.state.showModal} hidden={false} >
                    <Container className="p-4">
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
                                <Form.Control onChange={(e) => this.onChange(e)} as="textarea" name="description" value={this.state?.description} placeholder="Descripción" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                {/* <Form.Label>Example textarea</Form.Label> */}
                                <Form.Control onChange={(e) => this.handleFile(e)} type="file" name="photo" rows={3} placeholder="subir fotos" />
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