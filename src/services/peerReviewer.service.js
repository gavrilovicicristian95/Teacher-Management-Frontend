import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/peerReviewers/';
class ScientificWorkService{
    addScientificWork(work){
        return axios.post(API_URL + 'addPeerReviewer', work, { headers: authHeader() });
    }
    getScientificWorksByTipArticolAndUserId(tipLucrare, userId){
        return axios.get(`${API_URL}getPeerReviewersByUser/${tipLucrare}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new ScientificWorkService();