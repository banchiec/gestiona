import React, { useState, useEffect } from 'react'
import './cardProfile.css'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { BsShareFill } from 'react-icons/bs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import UserService from '../../Services/user.service'

export default function CardProfile(props) {
    const userService = new UserService()
    const [userPublic, setUserPublic] = useState(undefined)
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {

        !props.loggedUser ? userService.getOneUser(props.idUserNotLogged)
            .then((res) => {
                setUserPublic(res.data.user)
            })
            .catch(error => console.log(error)) : setUserPublic(props.loggedUser)

    }, [props.loggedUser, isCopied])


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '10rem' }} className="d-flex flex-row">
                            <Card.Img variant="top" src={userPublic?.photo_profile} alt="foto perfil" />
                            <Card.Body className="p-5">
                                <Card.Title>{userPublic?.firstName}</Card.Title>
                                <Card.Text>
                                    {userPublic?.lastName}
                                </Card.Text>

                                <div className="link">
                                    <a href="#"><i class="fab fa-facebook"></i></a>
                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                    <CopyToClipboard className="link"
                                        text={`${process.env.REACT_APP_URLCALENDAR}/calendar/${userPublic?._id}`}>
                                        <BsShareFill className="icon-profile" onClick={() => { setIsCopied(true) }} />
                                    </CopyToClipboard>
                                    {
                                        isCopied && <span className="link-copied">Copiado</span>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
