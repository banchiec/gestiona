import React, { useState } from 'react'
import { Navbar, Container, Nav, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavigationBar({ loggedUser, storeUser }) {
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="transparent" variant="ligth">
                <Container>
                    <Navbar.Brand href="/">Gestionate</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        <Nav>
                            <Link className="btn bg-transparent"
                                to="/registro"
                            // onClick={() => setShowSignUp(true)}
                            >Registrate</Link>
                            <Link className="btn bg-transparent"
                                to="/iniciar-sesion"
                            //   onClick={() => setShowSignUp(true)}
                            >Inicia sesión</Link>
                            <Link className="btn bg-transparent"
                                eventKey={2}
                                to="#">
                                Cerrar sesión
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal
                size="lg"
                show={showSignUp}
                onHide={() => setShowSignUp(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal>

        </>

    )
}
