import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/mobilitiesProjects/';
class MobilitiesService{
    addMobility(mobility){
        return axios.post(API_URL + 'addMobilityProject', mobility, { headers: authHeader() });
    }
    getMobilities(tipMobilitate, userId){
        return axios.get(`${API_URL}getMobilityProjectsByUser/${tipMobilitate}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new MobilitiesService();