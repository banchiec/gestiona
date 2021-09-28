import axios from 'axios';

class UserService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`
        })
    }

    getUsers = () => this.instance.get("/");
    getOneUser = (id) => this.instance.get(`/${id}`);
    createUser = (user) => this.instance.post("/", user);
}

export default UserService;