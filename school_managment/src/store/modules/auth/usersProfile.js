import axios from 'axios';

const storedUserProfileState = JSON.parse(localStorage.getItem('userProfileState'));

const state = {
  createdUserProfileState: storedUserProfileState || {
    user: {},
    loading: false,
    error: null,
    success: null,
  }, 
  userAuthProfileState: {
    user: {},
    loading: false,
    error: null,
  }, 
  userProfileState: {
    user: {},
    loading: false,
    error: null,
  },
  allUsersState: {
    user: [],
    loading: false,
    error: null,
  },
};

const mutations = {
  SAVE_CREATED_USER_PROFILE_STATE(state, payload) {
    state.createdUserProfileState.user = {
        ...state.createdUserProfileState.user,
        ...payload,
      };
  },
  CREATED_USER_PROFILE_REQUEST(state) {
    state.createdUserProfileState.loading = true;
    state.createdUserProfileState.error = null;
  },
  CREATED_USER_PROFILE_SUCCESS(state, payload) {
    state.createdUserProfileState.loading = false;
    state.createdUserProfileState.user = payload.data;
    state.createdUserProfileState.success = payload.message;
    localStorage.setItem('userProfileState', JSON.stringify(state.createdUserProfileState));
  },
  CREATED_USER_PROFILE_FAILURE(state, error) {
    state.userLoginState.loading = false;
    state.userLoginState.error = error;
  },
  USER_AUTH_PROFILE_REQUEST(state) {
    state.userAuthProfileState.loading = true;
    state.userAuthProfileState.error = null;
  },
  USER_AUTH_PROFILE_SUCCESS(state, payload) {
    state.userAuthProfileState.loading = false;
    state.userAuthProfileState.user = payload.data;
    state.userAuthProfileState.success = payload.message;
  },
  USER_AUTH_PROFILE_FAILURE(state, error) {
    state.userAuthProfileState.loading = false;
    state.userAuthProfileState.error = error;
  },
  USER_PROFILE_REQUEST(state) {
    state.userProfileState.loading = true;
    state.userProfileState.error = null;
  },
  USER_PROFILE_SUCCESS(state, payload) {
    state.userProfileState.loading = false;
    state.userProfileState.user = payload.data;
    state.userProfileState.success = payload.message;
  },
  USER_PROFILE_FAILURE(state, error) {
    state.userProfileState.loading = false;
    state.userProfileState.error = error;
  },
  ALL_USERS_REQUEST(state) {
    state.allUsersState.loading = true;
    state.allUsersState.error = null;
    console.log('ALL_USERS_REQUEST');
  },
  ALL_USERS_SUCCESS(state, payload) {
    state.allUsersState.loading = false;
    state.allUsersState.user = payload;
    state.allUsersState.success = payload.message;
    console.log('ALL_USERS_SUCCESS', payload);
  },
  ALL_USERS_FAILURE(state, error) {
    state.allUsersState.loading = false;
    state.allUsersState.error = error;
    console.log('ALL_USERS_FAILURE', error);
  },
};

// Fonction pour obtenir un cookie spécifique
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };


const actions = {
  saveUserProfileData({ commit }, state) {
    commit('SAVE_CREATED_USER_PROFILE_STATE', state);
  },

  async createUserProfile({ commit }, formData) {
    commit("CREATED_USER_PROFILE_REQUEST");
    try {
      // Récupérer le authToken depuis les cookies
      const authToken = getCookie("authToken");

      if (!authToken) {
        throw new Error("You need to be logged in to create an announcement. Please log in or create an account.");
      }

      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      };

      const response = await axios.post(
        "http://localhost:7000/api/v1/auth/create-user-profile",
        formData,
        config
      );
      commit("CREATED_USER_PROFILE_SUCCESS", response.data);
      return response;
    } catch (error) {
      commit(
        "CREATED_USER_PROFILE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  async getUserAuthProfile({ commit }) {
    commit("USER_AUTH_PROFILE_REQUEST");
    try {
      // Récupérer le authToken depuis les cookies
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("USER_AUTH_PROFILE_FAILURE", {
          message:
            "You need to be logged in to create an announcement. Please log in or create an account.",
        });
      }

      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      };

      const response = await axios.get(
        "http://localhost:7000/api/v1/auth/users-auth-profile",
        config
      );
      commit("USER_AUTH_PROFILE_SUCCESS", response.data);
    } catch (error) {
      commit(
        "CREATED_USER_PROFILE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  async getUserProfile({ commit }, { id }) {
    commit("USER_PROFILE_REQUEST");
    try {
  
      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
  
      const response = await axios.get(
        `http://localhost:7000/api/v1/auth/users-profile/${id}`,
        config
      );
      commit("USER_PROFILE_SUCCESS", response.data);
    } catch (error) {
      commit(
        "USER_PROFILE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  
  async getAllUsers({ commit }, params) {
    commit('ALL_USERS_REQUEST');
    try {
      const response = await axios.get('http://localhost:7000/api/v1/auth/all-users', { params });
      commit('ALL_USERS_SUCCESS', response.data);
    } catch (error) {
      commit('ALL_USERS_FAILURE', error.response ? error.response.data : error.message);
    }
  },
  
  

};

const getters = {
  createdUserProfile: (state) => state.createdUserProfileState.user,
  userAuthProfile: (state) => state.userAuthProfileState.user,
  userProfile: (state) => state.userProfileState.user,
  allUsers: (state) => state.allUsersState.user,

};

export default {
  namespaced: true,  // Assurez-vous que le module est namespaced
  state,
  mutations,
  actions,
  getters,
};