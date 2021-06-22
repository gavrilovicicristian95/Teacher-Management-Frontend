import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/citations/';

class CitationService{

    addCitation(citation){
        return axios.post(API_URL + 'addCitation', citation, { headers: authHeader() });
    }

    getCitationsByIdCitation(idCitation){
        return axios.get(`${API_URL}getCitation/${idCitation}`, {
            headers: authHeader()
        });
    }

    getAllCitations(){
        return axios.get(`${API_URL}getAllCitations`, {
            headers: authHeader()
        });
    }

    getCitationsByTipCitatie(tipCitatie){
        return axios.get(`${API_URL}getCitations/${tipCitatie}`, {
            headers: authHeader()
        });
    }
}

export default new CitationService();