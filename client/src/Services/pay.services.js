import axios from 'axios';
class PayService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/pay`
        })
    }
    checkOut = ({ id, amount }) => this.instance.post('/checkout', { id, amount })
}
export default PayService;