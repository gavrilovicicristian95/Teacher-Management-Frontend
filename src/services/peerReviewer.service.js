import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/peerReviewers/';
class PeerReviewerService{
    addPeerReviewer(peerReviewer){
        return axios.post(API_URL + 'addPeerReviewer', peerReviewer, { headers: authHeader() });
    }
    getPeerReviewers(tipReferent, userId){
        return axios.get(`${API_URL}getPeerReviewersByUser/${tipReferent}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new PeerReviewerService();