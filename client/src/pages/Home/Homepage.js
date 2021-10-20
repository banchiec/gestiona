import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import calendarImage from '../../animations/45666-valentine-day-gift-calendar.json'
import Lottie from 'react-lottie'


export default function HomePage({ loggedUser }) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <Container className="container-home" >
            <Row className="container-banner">
                <Col xs={12} md={6} className="container-banner-text p-4">
                    <h1>¿Quiénes somos?</h1>
                    <article>
                        <p>
                            Solución integral para la gestión de clientes en cualquier tipo de negocio. De esta forma, te permite trabajar directamente desde su aplicación web
                        </p>
                    </article>
                </Col>
                <Col>
                    <Lottie options={{ animationData: calendarImage, ...defaultOptions }} />
                </Col>
            </Row>
        </Container>
    )
}
