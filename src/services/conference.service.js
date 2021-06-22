import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/conferences/';

class ConferenceService{

    addConference(conference){
        return axios.post(API_URL + 'addConference', conference, { headers: authHeader() });
    }

    getConferencesByIdConference(idConference){
        return axios.get(`${API_URL}getConference/${idConference}`, {
            headers: authHeader()
        });
    }

    getAllConferences(){
        return axios.get(`${API_URL}getAllConferenceParticipations`, {
            headers: authHeader()
        });
    }

    getConferencesByTipConference(tipConferinta){
        return axios.get(`${API_URL}getConferenceParticipations/${tipConferinta}`, {
            headers: authHeader()
        });
    }
}

export default new ConferenceService();