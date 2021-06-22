import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/coursesManuals/';

class CourseService{

    addCourse(course){
        return axios.post(API_URL + 'addCoursesManuals', course, { headers: authHeader() });
    }

    getCoursesByIdCourse(idCourse){
        return axios.get(`${API_URL}getCoursesManuals/${idCourse}`, {
            headers: authHeader()
        });
    }

    getAllCourses(){
        return axios.get(`${API_URL}getAllCoursesManuals`, {
            headers: authHeader()
        });
    }

    getCoursesByTipCurs(tipCurs){
        return axios.get(`${API_URL}getAllCoursesManuals/${tipCurs}`, {
            headers: authHeader()
        });
    }
    getCoursesByTipCursAndUserId(tipCurs, userId){
        return axios.get(`${API_URL}getAllCoursesManualsByUser/${tipCurs}/${userId}`, {
            headers: authHeader()
        });
    }
}

export default new CourseService();