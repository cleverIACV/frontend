import axios from 'axios';

const state = {
  coverletterUploadState: {
    loading: false,
    error: null,
    success: null,
    analyses: JSON.parse(localStorage.getItem('coverletterAnalyses')) || null,
  },
};

const mutations = {
  SET_COVER_ANALYSE_STATE(state, analysesState) {
    state.coverletterUploadState = analysesState;
  },
  COVERLETTER_UPLOAD_REQUEST(state) {
    state.coverletterUploadState.loading = true;
    state.coverletterUploadState.error = null;
  },
  COVERLETTER_UPLOAD_SUCCESS(state, payload) {
    state.coverletterUploadState.loading = false;
    state.coverletterUploadState.success = payload.message;
    state.coverletterUploadState.analyses = payload.openai_analysis;
    localStorage.setItem('coverletterAnalyses', JSON.stringify(payload.openai_analysis));
  },
  COVERLETTER_UPLOAD_FAILURE(state, error) {
    state.coverletterUploadState.loading = false;
    state.coverletterUploadState.error = error;
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
  setCoverAnalyseState({ commit }, state) {
    commit('SET_COVER_ANALYSE_STATE', state);
  },
  async uploadCoverLetter({ commit }, formData) {
    commit('COVERLETTER_UPLOAD_REQUEST');
    try {
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("COVERLETTER_UPLOAD_FAILURE", {
          message: "You need to be logged in to upload a resume. Please log in or create an account.",
        });
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.post('http://77.37.86.249:8124/api/profil/upload_cover_letter/', formData, config);
      commit('COVERLETTER_UPLOAD_SUCCESS', response.data);
    } catch (error) {
      commit('COVERLETTER_UPLOAD_FAILURE', error.response && error.response.data ? error.response.data : error.message);
    }
  },
};

const getters = {
  uploadCoverLetterResult: (state) => state.coverletterUploadState.success,
  getCoverAnalyses: (state) => state.coverletterUploadState.analyses,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
