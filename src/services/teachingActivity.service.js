import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/teachingActivities/';

class TeachingActivityService{

    addTeachingActivity(activity){
        return axios.post(API_URL + 'addTeachingActivity', activity, { headers: authHeader() });
    }

    getTeachingActivitiesByIdActivity(idActivity){
        return axios.get(`${API_URL}getTeachingActivity/${idActivity}`, {
            headers: authHeader()
        });
    }

    getAllTeachingActivities(){
        return axios.get(`${API_URL}getAllTeachingActivities`, {
            headers: authHeader()
        });
    }

    getTeachingActivitiesByTipActivitate(tipActivitate){
        return axios.get(`${API_URL}getTeachingActivities/${tipActivitate}`, {
            headers: authHeader()
        });
    }
    getTeachingActivitiesByTipTActivitateAndUserId(tipActivitate, userId){
        return axios.get(`${API_URL}getTeachingActivitiesByUser/${tipActivitate}/${userId}`, {
            headers: authHeader()
        });
    }
}

export default new TeachingActivityService();