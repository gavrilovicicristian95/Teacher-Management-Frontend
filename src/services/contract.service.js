import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/contracts/';

class ContractService{

    addContract(contract){
        return axios.post(API_URL + 'addContract', contract, { headers: authHeader() });
    }

    getContractIdContract(idContract){
        return axios.get(`${API_URL}getContract/${idContract}`, {
            headers: authHeader()
        });
    }

    getAllContracts(){
        return axios.get(`${API_URL}getAllContract`, {
            headers: authHeader()
        });
    }

    getContractByTipContract(tipContract,idUser){
        return axios.get(`${API_URL}getContractsByUser/${tipContract}/${idUser}`, {
            headers: authHeader()
        });
    }
}

export default new ContractService();