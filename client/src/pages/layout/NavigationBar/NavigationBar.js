import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../../../Services/auth.service'
import logoGestiona from '../../../images/logoGesti.png'

import { isAdmin } from '../../../utils/auth.utils'

const authService = new AuthService()

export default function NavigationBar(props) {


    const logout = () => {
        authService.logout()
            .then(res => props.storeUser(null))
            .catch(err => console.log(err))
    }

    return (
        <Navbar className="container-navbar" collapseOnSelect expand="lg" bg="transparent" variant="ligth">
            <Container>
                <Navbar.Brand as={Link} to='/' className="navbar-brand">
                    <img src={logoGestiona} alt="image logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {
                            /* <Nav.Link href="#features">Features</Nav.Link> */}
                        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    <Nav>
                        {
                            isAdmin(props.loggedUser) &&
                            <Link className="btn bg-transparent"
                                to="/usuarios">
                                Usuarios
                            </Link>
                        }
                        {
                            props.loggedUser ?
                                <>
                                    <Link className="btn bg-transparent"
                                        to="/perfil">
                                        Perfil
                                    </Link>
                                    <span className="btn bg-transparent"
                                        onClick={logout}>
                                        Cerrar sesión
                                    </span>
                                </>
                                :
                                <>
                                    <Link className="btn bg-transparent"
                                        to="/registro"
                                    // onClick={() => setShowSignUp(true)}
                                    >Registrate</Link>
                                    <Link className="btn bg-transparent"
                                        to="/iniciar-sesion"
                                    //   onClick={() => setShowSignUp(true)}
                                    >Inicia sesión</Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
