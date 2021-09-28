import './App.css';
import React, { Component } from 'react'
import UserService from './Services/user.service'
import Routes from './routes';
import AuthService from './Services/auth.service'
import Footer from './pages/layout/Footer/Footer'
import NavigationBar from './pages/layout/NavigationBar/NavigationBar'



let userService = new UserService()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = ({

      loggerUser: undefined
    })
    this.authService = new AuthService()
  }

  componentDidMount() {

    console.log("hola")
    userService.getUsers()
      .then((user) => {
        console.log(user)
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div>
        {/* <NavigationBar /> */}
        <Footer />
        <h1>App</h1>
      </div>
    )
  }
}