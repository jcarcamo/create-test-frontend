import axios from 'axios';

//const API_BASE = 'http://localhost:3000';
const API_BASE = "https://cis-658-create-test-api.herokuapp.com";
class SessionApi {

    static login(credentials) {
        return axios
            .post(`${API_BASE}/user_token`,{auth:credentials})
            .then(res => {
                console.log('successful login!');
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
    static getMe(jwt){
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type':'application/json'
        }
        return axios
            .get(`${API_BASE}/me`,{headers:headers})
            .then(res => {
                console.log('user info');
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
}

export default SessionApi;
