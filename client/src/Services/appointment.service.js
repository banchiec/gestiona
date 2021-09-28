import axios from 'axios';

class AppointmentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/appointment`
        })
    }

    getAppointments = () => this.instance.get("/");
    getOneApointment = (id) => this.instance.get(`/${id}`);
    getOneDeleteApointment = (id) => this.instance.delete(`/${id}`);
    createAppointment = (appointment) => this.instance.post("/", appointment);
}

export default AppointmentService;