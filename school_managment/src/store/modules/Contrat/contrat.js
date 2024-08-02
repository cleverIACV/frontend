import axios from 'axios';

const state = {
  allContratState: {
    contrat: [],
    loading: false,
    error: null,
    success : null,
  },
};

const mutations = {
  ALL_CONTRAT_REQUEST(state) {
    state.allContratState.loading = true;
    state.allContratState.error = null;
  },
  ALL_CONTRAT_SUCCESS(state, payload) {
    state.allContratState.loading = false;
    state.allContratState.contrat = payload.contrats;
    state.allContratState.success = true;
  },
  ALL_CONTRAT_FAILURE(state, error) {
    state.allContratState.loading = false;
    state.allContratState.error = error;
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
  async getAllContrat({ commit }) {
    commit('ALL_CONTRAT_REQUEST');
    try {
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("ALL_CONTRAT_FAILURE", {
          message: "You need to be logged in to fetch categories. Please log in or create an account.",
        });
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get('http://77.37.86.249:8124/api/contract-types/', config);
      commit('ALL_CONTRAT_SUCCESS', { contrats: response.data });
    } catch (error) {
      commit('ALL_CONTRAT_FAILURE', error.response && error.response.data ? error.response.data : error.message);
    }
  },
};

const getters = {
  getContrat: (state) => state.allContratState.contrat,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
