import axios from 'axios';

class MailingService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/mailing`,
            withCredentials: true
        })
    }
    sendMail = (name, to) => this.instance.post("/send", { name, to })
}

export default MailingService;