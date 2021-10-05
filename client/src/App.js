import './App.css';
import React, { Component } from 'react'
import Routes from './routes';
import AuthService from './Services/auth.service'
// import Footer from './pages/layout/Footer/Footer'
import NavigationBar from './pages/layout/NavigationBar/NavigationBar'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedUser: undefined
    }
    this.authService = new AuthService()
  }

  componentDidMount() {
    this.fetchUser()
  }

  storeUser = (user) => this.setState({ loggedUser: user })

  fetchUser = () => {
    this.authService
      .isloggedin()
      .then((res) => this.storeUser(res.data))
      .catch(() => this.storeUser(null))
    console.log(this.loggedUser)
  }

  render() {
    return (
      <div>
        <NavigationBar loggedUser={this.state.loggedUser} storeUser={this.storeUser} />
        <Routes loggedUser={this.state.loggedUser} storeUser={this.storeUser} />
        {/* <Footer /> */}
      </div>
    )
  }
}