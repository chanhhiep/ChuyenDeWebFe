import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default class AuthService {

  constructor() { }

  login(username, password) {
    const request = {
      method: 'POST',
      url: '/api/login',
      data: {
        username,
        password
      }
    };

    return axios(request).then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

    isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.expiresAt > Date.now();
    }

    return false;
  }

  getCurrentUser() {
    if (!this.isAuthenticated()) {
      return null;
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken.user;
  }
}