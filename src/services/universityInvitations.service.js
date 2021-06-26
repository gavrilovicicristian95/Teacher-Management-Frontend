import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/universityInvitations/';
class UniversityInvitationService{
    addUniversityInvitation(uniInv){
        return axios.post(API_URL + 'addUniversityInvitation', uniInv, { headers: authHeader() });
    }
    getUniversityInvitations(tipInvitatie, userId){
        return axios.get(`${API_URL}getUniversityInvitationsByUser/${tipInvitatie}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new UniversityInvitationService();