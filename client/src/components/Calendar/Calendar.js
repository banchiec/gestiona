import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import iteractionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Card, Row } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'


export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    // state = {
    //     weekendsVisible: true,
    //     appointment: undefined,
    //     currentEvents: [],
    //     hidden: true
    // }
    // showCardModal = (e) => {
    //     this.setState({
    //         ...this.state,
    //         appointment: e.event,
    //         hidden: false,
    //     })
    // }

    render() {
        return (
            <Row>
                <FullCalendar
                    plugins={[dayGridPlugin,
                        iteractionPlugin,
                        timeGridPlugin
                    ]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    // weekends={this.props.state.weekendsVisible}
                    // dayMaxEventRows={true}
                    //dayMaxEvents={true}
                    select={() => <FormAddAppointment />}
                    events={[
                        { title: 'cumpleaños de Luque', date: '2021-10-01' },
                        { title: 'cumpleaños de Maria', date: '2021-10-01' },
                        { title: 'cumpleaños de Fred', date: '2021-10-02' },

                    ]}
                    eventClick={() => console.log("click")}

                    eventMouseEnter={(e) => {
                        this.props.putCard(e)
                        // console.log(e)
                        // if (this.state.hidden) this.props.showCardModal(e)
                    }
                    }
                    eventMouseLeave={() => {
                        this.props.setHidden()
                        // if (!this.state.hidden) this.setState({ ...this.state, hidden: true })
                    }}
                >
                </FullCalendar>
            </Row >
        )
    }
}