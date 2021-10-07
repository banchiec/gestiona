import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationNotFound from '../../animations/43391-404-error-page-not-found-confused-robot.json'


export default class NotFound extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isStopped: false,
            isPaused: false
        }
    }
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
        return (
            <>
                <h1 className="display-1 text-center mt-4">NOT FOUND</h1>
                <Lottie
                    options={{ animationData: animationNotFound, ...defaultOptions }}
                    height={400}
                    width={400}
                />
            </>
        )
    }
}
