import axios from 'axios';
import store from 'store';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {

    var user = {
        token: "asdasdasdfasdfasdfasdfasdfasd",
        user: {
            email: 'email@gmail.cpm',
            name: 'Admin'
        }
    };
    store.set('user', user);
    return Promise.resolve(user);

    return axios.post('/users/authenticate', {
        username: username,
        password: password
    })
        .then(handleResponse)
        .then((user) => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                store.set('user', user);
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    store.remove('user');
}

function register(user) {
    return axios.post('/users/register', user).then(handleResponse);
}

function getAll() {
    return axios.get('/users').then(handleResponse);
}


function getById(id) {

    return axios.get(`/users/${id}`).then(handleResponse);
}

function update(user) {
    return axios.put(`/users/${user.id}`, user).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.put(`/users/${id}`).then(handleResponse);
}

function handleResponse(response) {
    var data = response.data || null;

    if (response.status !== 200) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}