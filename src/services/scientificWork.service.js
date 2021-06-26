import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/scientificWorks/';
class ScientificWorkService{
    addScientificWork(work){
        return axios.post(API_URL + 'addScientificWork', work, { headers: authHeader() });
    }
    getScientificWorksByTipArticolAndUserId(tipLucrare, userId){
        return axios.get(`${API_URL}getScientificWorksByUser/${tipLucrare}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new ScientificWorkService();