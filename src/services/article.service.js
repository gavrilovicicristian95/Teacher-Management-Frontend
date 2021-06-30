import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/articles/';

class ArticleService{

    addArticle(article){
        return axios.post(API_URL + 'addArticle', article, { headers: authHeader() });
    }

    getArticleByIdArticol(idArticol){
        return axios.get(`${API_URL}getArticle/${idArticol}`, {
            headers: authHeader()
        });
    }

    getAllArticles(){
        return axios.get(`${API_URL}getAllArticles`, {
            headers: authHeader()
        });
    }

    getArticlesByTipArticol(tipArticol){
        return axios.get(`${API_URL}getArticles/${tipArticol}`, {
            headers: authHeader()
        });
    }
    getArticlesByTipArticolAndUserId(tipArticol, userId){
        return axios.get(`${API_URL}getArticlesByUser/${tipArticol}/${userId}`, {
            headers: authHeader()
        });
    }
    deleteArticle(idArticol){
        return axios.delete(`${API_URL}deleteArticle/${idArticol}`, {
            headers: authHeader()
        });
    }
}

export default new ArticleService();