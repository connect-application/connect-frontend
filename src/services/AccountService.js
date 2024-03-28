import axios from 'axios';
import API_URL from '../config'

const ACCOUNT_API_BASE_URL = `${API_URL}/api/accounts`;

class AccountService{

    getUsers(){
        return axios.get(ACCOUNT_API_BASE_URL);
    }
}

export default new AccountService();