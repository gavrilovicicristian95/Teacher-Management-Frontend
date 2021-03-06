import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/responsabilitiesTypes/';

class ResponsabilityTypeService{

    addResponsabilityType(responsabilityType){
        return axios.post(API_URL + 'addResponsabilityType', responsabilityType, { headers: authHeader() });
    }

   

    getAllResponsabilityTypes(tipResponsabilitate){
        return axios.get(`${API_URL}getAllResponsabilitesTypesByTipResponsabilitate/${tipResponsabilitate}`, {
            headers: authHeader()
        });
    }

}

export default new ResponsabilityTypeService();