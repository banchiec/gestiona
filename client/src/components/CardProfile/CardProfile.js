import React, { useState, useEffect } from 'react'
import './cardProfile.css'
import { BsShareFill } from 'react-icons/bs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import UserService from '../../Services/user.service'

export default function CardProfile(props) {
    const userService = new UserService()
    const [userPublic, setUserPublic] = useState(undefined)

    useEffect(() => {

        !props.loggedUser ? userService.getOneUser(props.idUserNotLogged)
            .then((res) => {
                setUserPublic(res.data.user)
            })
            .catch(error => console.log(error)) : setUserPublic(props.loggedUser)

    }, [props.loggedUser])


    return (
        <div className="container-card">
            {
                console.log(userPublic)
            }
            <img src={userPublic?.photo_profile} alt="foto perfil" />
            <div className="cont">
                <h2>{userPublic?.firstName}</h2>
                <p>{userPublic?.lastName}
                </p>
                <div className="link">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <CopyToClipboard className="link"
                        text={`http://localhost:3000/calendar/${userPublic?._id}`}>
                        <BsShareFill className="icon-profile" onClick={() => { this.setState({ ...this.state, isCopied: true }) }} />
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    )
}
