import React from 'react'
import { Accordion, Button } from 'react-bootstrap'


export default function AccordionList(props) {
    // const [] = use
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
                    {
                        /* <img src={appointment.photos} alt="fotos de las citas" /> */
                    }
                </>
            </Accordion.Body>
            {!props.appointment.isAproved ? <Button key={props.appointment._id} onClick={props.okAppointment}>Aprobar?</Button> : 'aprobado'}
        </Accordion.Item>
    )
}
