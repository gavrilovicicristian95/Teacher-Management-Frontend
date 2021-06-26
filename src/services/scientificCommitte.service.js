import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/committeeMembers/';
class ScientificCommitteeService{
    addScientificCommittee(committee){
        return axios.post(API_URL + 'addCommitteeMember', committee, { headers: authHeader() });
    }
    getScientificCommittees(tipComitet, userId){
        return axios.get(`${API_URL}getCommitteeMembers/${tipComitet}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new ScientificCommitteeService();