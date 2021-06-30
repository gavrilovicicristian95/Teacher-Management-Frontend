import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/responsabilities/';
class ResponsabilitiesService{
    addResponsability(responsability){
        return axios.post(API_URL + 'addResponsability',responsability, { headers: authHeader() });
    }
    getResponsabilities(tipResponsabilitate, userId){
        return axios.get(`${API_URL}getResponsabilitiesByUser/${tipResponsabilitate}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new ResponsabilitiesService();