import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/committeeMembers/';
class ScientificWorkService{
    addScientificWork(work){
        return axios.post(API_URL + 'addCommitteeMember', work, { headers: authHeader() });
    }
    getScientificWorksByTipArticolAndUserId(tipLucrare, userId){
        return axios.get(`${API_URL}getCommitteeMembers/${tipLucrare}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new ScientificWorkService();