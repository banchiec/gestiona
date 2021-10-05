import React from 'react'
// import { Card } from 'react-bootstrap'
import './cardProfile.css'
import { BsShareFill } from 'react-icons/bs'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function CardProfile(props) {
    return (
        // <div className="card">
        <div className="container-card">
            <img src={props.loggedUser?.photo_profile} alt="foto perfil" />
            <div className="cont">
                <h3>{props.loggedUser?.firstName}</h3>
                <p>
                    {props.loggedUser?.lastName}
                </p>
                <div className="link">
                    <a href="#"><i class="fab fa-codepen"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                    <CopyToClipboard className="link"
                        text={`http://localhost:3000/calendar/${props.loggedUser?._id}`}>
                        <BsShareFill className="icon-profile" onClick={() => { this.setState({ ...this.state, isCopied: true }) }} />
                        {/* <p show={this.state.isCopied}>{this.state.isCopied ? "copiado" : " "}</p> */}
                    </CopyToClipboard>
                </div>
            </div>
        </div>
        // </div>
    )
}
