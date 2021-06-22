import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/workActivities/';

class WorkActivityService{

    addWorkActivity(activity){
        return axios.post(API_URL + 'addWorkActivity', activity, { headers: authHeader() });
    }

    getWorkActivitiesByIdActivity(idActivity){
        return axios.get(`${API_URL}getWorkActivity/${idActivity}`, {
            headers: authHeader()
        });
    }

    getAllWorkActivities(){
        return axios.get(`${API_URL}getAllWorkActivities`, {
            headers: authHeader()
        });
    }

   
    getWorkActivitiesByUserId( userId){
        return axios.get(`${API_URL}getWorkActivitiesByUserId/${userId}`, {
            headers: authHeader()
        });
    }
}

export default new WorkActivityService();