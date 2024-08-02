import axios from 'axios';

const state = {
  createApplicationState: {
    application: {},
    loading: false,
    error: null,
    success: null,
  },
  userAuthApplicationState: {
    application: [],
    loading: false,
    error: null,
    success: null,
  },
  jobApplicationState: {
    application: [],
    loading: false,
    error: null,
    success: null,
  },
};

const mutations = {
  APPLICATION_REQUEST(state) {
    state.createApplicationState.loading = true;
    state.createApplicationState.error = null;
  },
  APPLICATION_SUCCESS(state, payload) {
    state.createApplicationState.loading = false;
    state.createApplicationState.application = payload.application;
    state.createApplicationState.success = true;
  },
  APPLICATION_FAILURE(state, error) {
    state.createApplicationState.loading = false;
    state.createApplicationState.error = error;
  },
  USER_APPLICATION_REQUEST(state) {
    state.userAuthApplicationState.loading = true;
    state.userAuthApplicationState.error = null;
  },
  USER_APPLICATION_SUCCESS(state, payload) {
    state.userAuthApplicationState.loading = false;
    state.userAuthApplicationState.application = payload.application;
  },
  USER_APPLICATION_FAILURE(state, error) {
    state.userAuthApplicationState.loading = false;
    state.userAuthApplicationState.error = error;
  },
  JOB_APPLICATION_REQUEST(state) {
    state.jobApplicationState.loading = true;
    state.jobApplicationState.error = null;
  },
  JOB_APPLICATION_SUCCESS(state, payload) {
    state.jobApplicationState.loading = false;
    state.jobApplicationState.application = payload.application;
  },
  JOB_APPLICATION_FAILURE(state, error) {
    state.jobApplicationState.loading = false;
    state.jobApplicationState.error = error;
  },
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const actions = {
  async addApplication({ commit }, { candidate, job, status = 'pending', score = 0, review = '' }) {
    commit('APPLICATION_REQUEST');
    try {
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("APPLICATION_FAILURE", "Vous devez être connecté pour postuler. Veuillez vous connecter ou créer un compte.");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const data = {
        candidate,
        job,
        status,
        score,
        review
      };

      const response = await axios.post('http://77.37.86.249:8124/api/candidatures/', data, config);
      commit('APPLICATION_SUCCESS', { application: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data 
        ? error.response.data.message || "Une erreur est survenue lors de la soumission de la candidature."
        : "Une erreur est survenue lors de la soumission de la candidature.";
      commit('APPLICATION_FAILURE', errorMessage);
    }
  },

  async getUserAuthApplication({ commit }) {
    commit('USER_APPLICATION_REQUEST');
    try {
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("USER_APPLICATION_FAILURE", "Vous devez être connecté pour voir vos candidatures. Veuillez vous connecter ou créer un compte.");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get('http://77.37.86.249:8124/api/candidatures/user/', config);
      commit('USER_APPLICATION_SUCCESS', { application: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data 
        ? error.response.data.message || "Une erreur est survenue lors de la récupération des candidatures."
        : "Une erreur est survenue lors de la récupération des candidatures.";
      commit('USER_APPLICATION_FAILURE', errorMessage);
    }
  },

  async getAllJobApplication({ commit }, jobId) {
    commit('JOB_APPLICATION_REQUEST');
    try {
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("JOB_APPLICATION_FAILURE", "Vous devez être connecté pour voir les candidatures. Veuillez vous connecter ou créer un compte.");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get(`http://77.37.86.249:8124/api/candidatures/job/${jobId}`, config);
      commit('JOB_APPLICATION_SUCCESS', { application: response.data });
    } catch (error) {
      const errorMessage = error.response && error.response.data 
        ? error.response.data.message || "Une erreur est survenue lors de la récupération des candidatures."
        : "Une erreur est survenue lors de la récupération des candidatures.";
      commit('JOB_APPLICATION_FAILURE', errorMessage);
    }
  },
};

const getters = {
  createdApplication: (state) => state.createApplicationState.application,
  userAuthApplication: (state) => state.userAuthApplicationState.application,
  getAllJobApplication: (state) => state.jobApplicationState.application,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
