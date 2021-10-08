import React from 'react'
import { Accordion, Button } from 'react-bootstrap'


export default function AccordionList(props) {
    return (
        <Accordion.Item eventKey={props.appointment._id} >
            <Accordion.Header>
                <span>{props.appointment.name}</span>
                <span className="p-2">
                    {props.appointment.phone}
                </span>
            </Accordion.Header>
            <Accordion.Body className="d-flex justify-content-around">
                <>
                    {props.appointment.description}
                </>
            </Accordion.Body>
            {!props.appointment.isAproved ? <Button className="m-2" accessKey={props.appointment._id} key={props.appointment._id} onClick={props.okAppointment}>Aprobar? </Button> :
                <p className="display-5">aprobado</p>}
        </Accordion.Item>
    )
}
