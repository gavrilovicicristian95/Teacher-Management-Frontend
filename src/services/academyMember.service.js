import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/academyMembers/';
class AcademyMemberService{
    addAcademyMember(academyMember){
        return axios.post(API_URL + 'addAcademyMember', academyMember, { headers: authHeader() });
    }
    getAcademymembersByTipMembruAndUserId(tipMembru, userId){
        return axios.get(`${API_URL}getAcademyMembersByUser/${tipMembru}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new AcademyMemberService();