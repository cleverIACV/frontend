import axios from 'axios';

const state = {
  allAnnonceCategories: {
    categories: [],
    loading: false,
    error: null,
    success : null,
  },
};

const mutations = {
  ALL_CATEGORY_REQUEST(state) {
    state.allAnnonceCategories.loading = true;
    state.allAnnonceCategories.error = null;
  },
  ALL_CATEGORY_SUCCESS(state, payload) {
    state.allAnnonceCategories.loading = false;
    state.allAnnonceCategories.categories = payload.categories;
    state.allAnnonceCategories.success = true;
  },
  ALL_CATEGORY_FAILURE(state, error) {
    state.allAnnonceCategories.loading = false;
    state.allAnnonceCategories.error = error;
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
  async getAllCategories({ commit }) {
    commit('ALL_CATEGORY_REQUEST');
    try {
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("ALL_CATEGORY_FAILURE", {
          message: "You need to be logged in to fetch categories. Please log in or create an account.",
        });
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get('http://77.37.86.249:8124/api/categories/', config);
      commit('ALL_CATEGORY_SUCCESS', { categories: response.data });
    } catch (error) {
      commit('ALL_CATEGORY_FAILURE', error.response && error.response.data ? error.response.data : error.message);
    }
  },
};

const getters = {
  getCategories: (state) => state.allAnnonceCategories.categories,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
