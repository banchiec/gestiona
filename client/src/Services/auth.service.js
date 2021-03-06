import axios from 'axios';

class AuthService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/auth`,
            withCredentials: true
        })
    }
    signup = (firstName, lastName, email, username, pwd, photo_profile,) => this.instance.post("/signup", { firstName, lastName, email, username, pwd, photo_profile })
    login = (username, pwd) => this.instance.post("/login", { username, pwd })
    logout = () => this.instance.get("/logout")
    isloggedin = () => this.instance.post("/isloggedin")
}

export default AuthService;