import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/articlesFormulas/';

class ArticleFormulasService{

    saveArticleFormula(formula){
        return axios.post(API_URL + 'editArticlesFormula', formula, { headers: authHeader() });
    }

   

    getAllArticlesFormulas(){
        return axios.get(`${API_URL}getAllArticlesFormulas`, {
            headers: authHeader()
        });
    }

}

export default new ArticleFormulasService();