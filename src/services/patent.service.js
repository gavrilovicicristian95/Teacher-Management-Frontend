import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/patents/';

class PatentService{

    addPatent(patent){
        return axios.post(API_URL + 'addPatent', patent, { headers: authHeader() });
    }

    getPatentsByIdPatent(idPatent){
        return axios.get(`${API_URL}getPatent/${idPatent}`, {
            headers: authHeader()
        });
    }

    getAllPatents(){
        return axios.get(`${API_URL}getAllPatents`, {
            headers: authHeader()
        });
    }

    getPatentsByTipBrevet(tipBrevet){
        return axios.get(`${API_URL}getPatents/${tipBrevet}`, {
            headers: authHeader()
        });
    }
}

export default new PatentService();