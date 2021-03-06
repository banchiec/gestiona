import axios from 'axios';

class AppointmentService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/appointment`
        })
    }

    getAppointments = () => this.instance.get("/");
    getUserAppointments = (id) => this.instance.get(`/user/${id}`);
    getOneApointment = (id) => this.instance.get(`/${id}`);
    // updateUser = (id, date) => this.instance.put(`/${id}`, date)
    getUpdateApointment = (id, date) => this.instance.put(`/${id}`, date);
    getOneDeleteApointment = (id) => this.instance.delete(`/${id}`);
    createAppointment = (appointment) => this.instance.post("/", appointment);

}

export default AppointmentService;