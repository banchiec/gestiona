import React from 'react'
import { Card } from 'react-bootstrap'
function AppointmentCardHover(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    {
                        props.appointment &&
                        <>
                            <Card.Text>
                                <p>{props.appointment.title}</p>
                                <p>{props.appointment.description}</p>
                            </Card.Text>
                        </>
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default AppointmentCardHover
