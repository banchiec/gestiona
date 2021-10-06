import React from 'react'
import { Card, Col, Button } from 'react-bootstrap'

export default function UserItem({ user }) {
    return (
        <Col className="container-userItem">
            <Card style={{ width: '12rem' }}>
                {/* <img src={user.photo_profile} /> */}
                <Card.Img variant="top" src={user.photo_profile} />
                <Card.Body>
                    <Card.Title>{user.firstName}</Card.Title>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </Col>
    )
}
