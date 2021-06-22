import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/thesisCoordinations/';

class ThesisCoordinationService{

    addThesisCoordination(teza){
        return axios.post(API_URL + 'addThesisCoordination', teza, { headers: authHeader() });
    }

    getThesisCoordinationsByIdTeza(idTeza){
        return axios.get(`${API_URL}getThesisCoordination/${idTeza}`, {
            headers: authHeader()
        });
    }

    getAllThesisCoordinations(){
        return axios.get(`${API_URL}getAllThesisCoordinations`, {
            headers: authHeader()
        });
    }

    getThesisCoordinationsByTipTeza(tipTeza){
        return axios.get(`${API_URL}/getThesisCoordinations/${tipTeza}`, {
            headers: authHeader()
        });
    }
    getThesisCoordinationsByTipTezaAndUserId(tipTeza, userId){
        return axios.get(`${API_URL}getThesisCoordinationsByUser/${tipTeza}/${userId}`, {
            headers: authHeader()
        });
    }
}

export default new ThesisCoordinationService();