import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/institutionalActivities/';
class InstitutionalActivityService{
    addInstitutionalActivity(instutionalActivity){
        return axios.post(API_URL + 'addInstitutionalActivity', instutionalActivity, { headers: authHeader() });
    }
    getInstitutionalActivities(tipActivitate, userId){
        return axios.get(`${API_URL}addInstitutionalActivity/${tipActivitate}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new InstitutionalActivityService();