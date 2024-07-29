import axios from 'axios';
import router from '@/router'; // Assurez-vous que le chemin est correct

const storedUserLoginState = JSON.parse(localStorage.getItem('userLoginState'));

const state = {
  userLoginState: storedUserLoginState || {
    user: {},
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }, 
  teacherRegisterState: {
    teacher: {},
    isRegister: false,
    loading: false,
    error: null,
    success : null,
  }, 
  userRegisterState: {
    user: {},
    isRegister: false,
    loading: false,
    error: null,
    success : null,
  },
};

const mutations = {
  SET_USER_STATE(state, userState) {
    state.userLoginState = userState;
  },
  USER_LOGIN_REQUEST(state) {
    state.userLoginState.loading = true;
    state.userLoginState.error = null;
  },
  USER_LOGIN_SUCCESS(state, payload) {
    state.userLoginState.loading = false;
    state.userLoginState.user = payload.user;
    state.userLoginState.token = payload.token;
    state.userLoginState.isAuthenticated = true;
    localStorage.setItem('userLoginState', JSON.stringify(state.userLoginState));
  },
  USER_LOGIN_FAILURE(state, error) {
    state.userLoginState.loading = false;
    state.userLoginState.error = error;
    state.userLoginState.isAuthenticated = false;
  },
  USER_LOGOUT(state) {
    state.userLoginState.user = null;
    state.userLoginState.token = null;
    state.userLoginState.isAuthenticated = false;
    localStorage.removeItem('userLoginState');
    // Supprimer le cookie authToken
    document.cookie = 'authToken=; path=/;';
  },
  USER_REGISTER_REQUEST(state) {
    state.userRegisterState.loading = true;
    state.userRegisterState.error = null;
  },
  USER_REGISTER_SUCCESS(state, payload) {
    state.userRegisterState.loading = false;
    state.userRegisterState.user = payload.user;
    state.userRegisterState.isRegister = true;
    state.userRegisterState.success = payload.message;
  },
  USER_REGISTER_FAILURE(state, error) {
    state.userRegisterState.loading = false;
    state.userRegisterState.error = error;
    state.userRegisterState.isAuthenticated = false;
  },
  TEACHER_REGISTER_REQUEST(state) {
    state.teacherRegisterState.loading = true;
    state.teacherRegisterState.error = null;
  },
  TEACHER_REGISTER_SUCCESS(state, payload) {
    state.teacherRegisterState.loading = false;
    state.teacherRegisterState.user = payload.user;
    state.teacherRegisterState.isRegister = true;
    state.teacherRegisterState.success = payload.message;
  },
  TEACHER_REGISTER_FAILURE(state, error) {
    state.teacherRegisterState.loading = false;
    state.teacherRegisterState.error = error;
    state.teacherRegisterState.isAuthenticated = false;
  },
};

const actions = {
  setUserState({ commit }, state) {
    commit('SET_USER_STATE', state);
  },

  async userLogin({ commit }, { email, password }) {
    commit('USER_LOGIN_REQUEST');
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const response = await axios.post(`http://localhost:7000/api/v1/auth/user-login`, { email, password }, config);
      const { token } = response.data.data;

    // const expires = new Date(Date.now() + 1 * 60 * 60 * 1000).toUTCString();
      document.cookie = `authToken=${token}; path=/`;
      commit('USER_LOGIN_SUCCESS', { user: response.data.data.user, token });
      // Redirection vers la page d'accueil après une connexion réussie
      // router.push('/');

    } catch (error) {
      commit('USER_LOGIN_FAILURE', error.response && error.response.data ? error.response.data : error.message);
    }
  },

  async userRegister({ commit }, { firstname, lastname, email, password }) {
    commit('USER_REGISTER_REQUEST');
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post('http://localhost:7000/api/v1/auth/user-register', { firstname, lastname, email, password }, config);
      commit('USER_REGISTER_SUCCESS', { user: response.data.data.user, message: response.data.message  });
    } catch (error) {
      console.log(error.response.data, 'Error');
      commit('USER_REGISTER_FAILURE', error.response && error.response.data ? error.response.data : error.message);
      throw error; // Ajoutez cette ligne pour renvoyer l'erreur
    }
  },

  async teacherRegister({ commit }, { firstname, lastname, email, password }) {
    commit('TEACHER_REGISTER_REQUEST');
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post('http://localhost:7000/api/v1/auth/teacher-register', { firstname, lastname, email, password }, config);
      commit('TEACHER_REGISTER_SUCCESS', { user: response.data.data.user, message: response.data.message });
    } catch (error) {
      commit('TEACHER_REGISTER_FAILURE', error.response && error.response.data ? error.response.data : error.message);
    }
  },

  logout({ commit }) {
    commit('USER_LOGOUT');
    // Redirection vers la page d'accueil après une connexion réussie
    router.push('/login');
  },
};

const getters = {
  isAuthenticated: (state) => state.userLoginState.isAuthenticated,
  getUserInfo: (state) => state.userLoginState.user,
  isUserRegistered : (state) => state.userRegisterState.isRegister,
  isTeacherRegistered : (state) => state.teacherRegisterState.isRegister,

};

export default {
  namespaced: true,  // Assurez-vous que le module est namespaced
  state,
  mutations,
  actions,
  getters,
};