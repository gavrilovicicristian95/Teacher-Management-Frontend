import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/editorActivities/';
class EditorActivityService{
    addEditorActivity(activity){
        return axios.post(API_URL + 'addEditorActivity', activity, { headers: authHeader() });
    }
    getEditorActivityByTipActivitateAndUserId(tipActivitate, userId){
        return axios.get(`${API_URL}getEditorActivitiesByUser/${tipActivitate}/${userId}`, {
            headers: authHeader()
        });
    }
    
}

export default new EditorActivityService();