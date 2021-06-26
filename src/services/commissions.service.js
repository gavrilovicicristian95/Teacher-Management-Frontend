import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/commissions/';
class CommissionsService{
    addCommission(commission){
        return axios.post(API_URL + 'addCommission',commission, { headers: authHeader() });
    }
    getSCommissionsByTipComisieAndUserId(tipComisie, userId){
        return axios.get(`${API_URL}getCommissionsByUser/${tipComisie}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new CommissionsService();