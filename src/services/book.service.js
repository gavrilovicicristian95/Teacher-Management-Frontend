import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/books/';

class BookService{

    addBook(book){
        return axios.post(API_URL + 'addBook', book, { headers: authHeader() });
    }

    getBookByIdBook(idBook){
        return axios.get(`${API_URL}getBook/${idBook}`, {
            headers: authHeader()
        });
    }

    getAllBooks(){
        return axios.get(`${API_URL}getAllBooks`, {
            headers: authHeader()
        });
    }

    getBooksByTipCarte(tipCarte,idUser){
        return axios.get(`${API_URL}getBooksByUser/${tipCarte}/${idUser}`, {
            headers: authHeader()
        });
    }
}

export default new BookService();